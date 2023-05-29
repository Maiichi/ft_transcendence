import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";

@Controller('auth')
export class AuthController
{
    constructor(private authService: AuthService){}

    // @Post('signup')
    // signup(@Body() dto: AuthDto)
    // {
    //     // console.log({dto});
    //     return this.authService.signup(dto);
    // }

    // @Post('signin')
    // signin(@Body() dto: AuthDto)
    // {
    //     return this.authService.signin(dto);
    // }

    // @UseGuards(AuthGuard('42'))

    @Get("login")
    login42(@Req() req: any)
    {
        console.log("Hello from login42 ----");
        return "LOGIN"
    }

    @Get('/logged')
    welcome()
    {
        return "Logged successfully"
    //    return this.authService.redirectAfterLogin(req, res);
    }

    
    @UseGuards(AuthGuard('42'))
    @Get("callback")
    async login42Redirect(@Req() req: Request, @Res() res:Response)
    {
        return await this.authService.authenticate(req, res);
    }

}