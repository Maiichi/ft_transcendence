import { UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

export class TwoFactorAuthenticationStrategy extends PassportStrategy(Strategy, 'jwt-2fa')
{
    constructor(
        private prisma: PrismaService,
        config: ConfigService
    )
    {
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : config.get('JWT_SECRET'),
        })
    }

    async validate(payload: number)
    {
        const user = await this.prisma.user.findUnique({
            where:{intraId : payload}
        })
        if (!user)
            throw UnauthorizedException;
        if (!user.twoFactorActivate)
            return user;
        return user;
    }
}