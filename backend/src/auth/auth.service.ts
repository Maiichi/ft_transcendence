import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { Prisma, User } from '@prisma/client';
import { UserService } from "src/user/user.service";
import { authenticator } from "otplib";
import { toDataURL } from "qrcode";

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

    // function called when user authenticate and persist his data on the database
    async authenticate(req: any, res: Response)
    {
        if (!req.user)
            return 'no user from 42oauth';
        const intra_id = Number(req.user.id);
        const email = req.user.email;
        const firstName = req.user.first_name; 
        const lastName = req.user.last_name; 
        const userName = req.user.username;
        try {
            // save the new user in the db
            const user = await this.prisma.user.create({
                data :{
                    email : email,
                    intraId: intra_id,
                    lastName: lastName,
                    firstName: firstName,
                    userName: userName,
                },
            });
            const tokenPromise = this.signToken(user.intraId , user.email);
            const token = await tokenPromise;
            res.setHeader('Authorization', `Bearer ${token}`);
            // return res.redirect(`http://localhost:3000`);
            /* need to be redirected to Home page after login */
            // return res.redirect('/api/auth/logged');
            res.send({token});
        } catch (error) {
            if (error instanceof  Prisma.PrismaClientKnownRequestError){
                if (error.code === 'P2002'){
                    throw new ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
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
        try {
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
        } catch (error) {
            res.status(500).json({
                error : error
            })
        }
    }

    async disableTwoFactor(user: User, res: Response)
    {
        try {
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
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status : 500,
                message : error
            })
        }
    }
    
    async generateTwoFactor(res: Response, userId: number) {
        try {
          const user = await this.userService.getUserById(userId);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          const isEnabled = await this.userService.isTwoFactorEnabled(userId);
          if (!isEnabled)
            return res.status(404).json({message : 'two factor auth not enabled !'});
          const secret = authenticator.generateSecret();
          const otpauthUrl = authenticator.keyuri(
            user.username,
            process.env.APP_NAME,
            secret,
          );
          const url = await toDataURL(otpauthUrl);
          await this.userService.setTwoFactorSecret(userId, secret);
          return res.send({
            url : url
          });
        } catch (error) {
          return res.status(500).json({
            status: 500,
            message: error.toString(), // Convert the error object to a string
          });
        }
    }

    async verifyTwoFactor(code: string, secret: string)
    {   
        return await authenticator.verify({
            token : code,
            secret: secret
        });
    }
}