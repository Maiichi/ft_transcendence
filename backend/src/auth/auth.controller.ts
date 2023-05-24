import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController
{
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() dto: AuthDto)
    {
        // console.log({dto});
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: AuthDto)
    {
        return this.authService.signin(dto);
    }

}