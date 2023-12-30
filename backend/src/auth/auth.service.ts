import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { Prisma, User } from '@prisma/client';
import { UserService } from "src/user/user.service";
import { authenticator } from "otplib";
import { toDataURL } from "qrcode";
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class AuthService
{
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
        private userService: UserService
    ){}

    async signToken(userId: number, email: string) : Promise <string>
    {
        const payload = {
            sub: userId,
            email,
        };

        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload,{
            expiresIn : '1d',
            secret : secret
        });
        return token;
    }

    async encryptJwtToken(token: string): Promise<string> {
        // Generate a random IV for each encryption to make it more secure
        // Initialization Vector (IV) length for AES-256 is 16 bytes
        const iv = randomBytes(16);

        // Generate the encryption key from the password using scrypt (promisify for async/await)
        // AES-256 uses a 32-byte key
        const key = (await promisify(scrypt)(process.env.ENCRYPTION_SECRET, process.env.ENCRYPTION_SALT, 32)) as Buffer;

        // Create the AES-256 cipher using the generated key and IV
        const cipher = createCipheriv('aes-256-ctr', key, iv);

        // Encrypt the token using the cipher
        const encryptedToken = Buffer.concat([cipher.update(token), cipher.final()]);

        // Combine IV and encrypted token to a single buffer
        const encryptedData = Buffer.concat([iv, encryptedToken]);

        // Convert the encrypted data to a Base64 string for easy transmission
        const base64EncryptedData = encryptedData.toString('base64');

        return base64EncryptedData;
    }

    // TODO: need to be refactored
    // function called when user authenticate and persist his data on the database
    async authenticate(req: any, res: Response)
    {
        if (!req.user)
            throw new NotFoundException(`No user from 42 OAuth`);
        const intra_id = Number(req.user.id);
        const email = req.user.email;
        const firstName = req.user.first_name; 
        const lastName = req.user.last_name; 
        const userName = req.user.username;
        let user = await this.prisma.user.findFirst({
            where: {intraId: intra_id}
        })
        // save the new user in the db
        if (!user)
        {
            user = await this.prisma.user.create({
                data :{
                    email : email,
                    intraId: intra_id,
                    lastName: lastName,
                    firstName: firstName,
                    userName: userName,
                    
                },
            });
        }
        const tokenPromise = this.signToken(user.intraId , user.email);
        const token = await tokenPromise;
        // redirect to frontend with encrypted jwt in query param
        // this.encryptJwtToken(token).then((encryptedToken) => {
        //     res.redirect(`${process.env.FRONTEND_URL}/login?secT7=${encryptedToken}`);
        // })
        //

        res.redirect(`${process.env.FRONTEND_URL}/login?secT7=${token}&first_login=${user.isFirstLogin}`);

        /* need to be redirected to Home page after login */
        // return res.redirect('/api/auth/logged');
        //res.send({token});
    }

    async redirectAfterLogin(req: any, res: Response)
    {
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader) {
          // Token not provided in the header
          return res.status(401).json({ message: 'Unauthorized' });
        }
        const token = authorizationHeader.split(' ')[1]; // Remove the 'Bearer' prefix
        try {
            const secret = this.config.get('JWT_SECRET');
            const decodedToken = await this.jwt.verify(token, secret);
            const userId = decodedToken.userId;
            // The user is authenticated.
            return res.json({
                token : token
            })
        } catch (error) {
            // The user is not authenticated.
            console.log(error)
        }
    }

    /* ************************** 2FA ************************ */

    async enableTwoFactor(user: User, res: Response)
    {
        const isEnabled = await this.userService.isTwoFactorEnabled(user.intraId);
        if (!isEnabled)
        {
            await this.prisma.user.update({
                where : { intraId: user.intraId },
                data : { 
                    twoFactorActivate : true
                }
            })
            .then(() =>{
                res.status(200).json({
                    status: 200,
                    message: 'Two Factor is enabled successfully'
                })
            })
        }     
        else
            res.send({error : 'Two Factor authentication already enabled'});      
    }

    async disableTwoFactor(user: User, res: Response)
    {
        const isEnabled = await this.userService.isTwoFactorEnabled(user.intraId);
        if (isEnabled)
        {
            await this.prisma.user.update({
                where : { intraId : user.intraId },
                data: {
                    twoFactorActivate : false,
                    twoFactorSecret : null
                }
            })
            .then(() =>{
                res.status(200).json({
                    status : 200,
                    message : 'Two Factor Auth is disabled successfully'
                })
            })
        }
        else
            return res.send({message: 'Two Factor Auth is already disabled'})
    }
    
    async generateTwoFactor(res: Response, userId: number)
    {
        const user = await this.userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isEnabled = await this.userService.isTwoFactorEnabled(userId);
        //If 2FA is already enabled don't generate new secret
        const secret = isEnabled ? user.twoFactorSecret : authenticator.generateSecret();
        const otpauthUrl = authenticator.keyuri(
            user.userName,
            process.env.APP_NAME,
            secret,
        );
        const url = await toDataURL(otpauthUrl);
        await this.userService.setTwoFactorSecret(userId, secret);
        return res.send({
            url : url
        });
    }

    async verifyTwoFactor(code: string, secret: string)
    {   
        return await authenticator.verify({
            token : code,
            secret: secret
        });
    }
}