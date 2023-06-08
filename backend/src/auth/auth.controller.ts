import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController
{
    constructor(private authService: AuthService){}

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

    
    @ApiBearerAuth()
    @ApiOperation({summary: 'type "localhost:PORT/api/auth/callback" on the browser and get Token and put it on the green lock {authorize} to perfrom USER requests'})
    @UseGuards(AuthGuard('42'))
    @Get("callback")
    async login42Redirect(@Req() req: Request, @Res() res:Response)
    {
        return await this.authService.authenticate(req, res);
    }

}