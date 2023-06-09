import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { FortyTwoStrategy, JwtStrategy } from "./startegy";
import { PassportModule } from "@nestjs/passport";
import { UserService } from "src/user/user.service";


@Module({
    imports : [
        JwtModule.register({
            secret: process.env.JWT_SECRET
        }),
        PassportModule
    ],
    controllers : [AuthController],
    providers : [AuthService, JwtStrategy, FortyTwoStrategy, UserService]
})
export class AuthModule {}