import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService
{
    constructor(
        private prisma:PrismaService,
        private jwt:JwtService,
        private config:ConfigService       
    ){}
    async signup(dto: AuthDto)
    {
        // generate the password hash
        const hash = await argon.hash(dto.password);
        try {
            // save the new user in the db
            const user = await this.prisma.user.create({
                data :{
                    email : dto.email,
                    hash,
                },
            });
            // return the saved user
            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error.code === 'P2002'){
                throw new ForbiddenException('Credentials taken');
            }
            // if (error instanceof  PrismaClientKnownRequestError){
            //     console.log("o kaydkhol tahna ********************");
            // }
            throw error;
        }
    }
    async signin(dto: AuthDto)
    {
        // find the user by email
        const user = await this.prisma.user.findUnique({
            where : {
                email : dto.email
            }
        });
        // if user does not exist throw an exception
        if (!user)
            throw new ForbiddenException('email not found');

        // compare passwords
        const psMatches = await argon.verify(user.hash, dto.password);

        //if passwords does not matches throw an exception
        if (!psMatches)
            throw new ForbiddenException('password is incorrect !');

        // send back the user
        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string) : Promise <{access_token : string}>
    {
        const payload = {
            sub: userId,
            email
        };

        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload,{
            expiresIn : '15m',
            secret : secret
        });
        return {
            access_token : token
        };
    }

    googleLogin(req: any)
    {
        console.log(req.user)
        if (!req.user){
            return 'no user from 42oauth';
        } 
        return {
            message: 'User info from 42oauth',
            user: req.user
        };
    }
}