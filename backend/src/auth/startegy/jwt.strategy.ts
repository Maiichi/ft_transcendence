import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt'
    )
{
    constructor(
        config:ConfigService,
        private prisma: PrismaService    
    )
    {
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : config.get('JWT_SECRET'),
        });
    }

    async validate(payload: { id: number; email: string}) {
        const user = await this.prisma.user.findUnique({
          where: {
            // intraId: payload.sub,
            id: payload.id,
            email: payload.email,
          },
        });
        if (!user)
            throw new UnauthorizedException(`Unauthorized`);
        return user;
    }
}