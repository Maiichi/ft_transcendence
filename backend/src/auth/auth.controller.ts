import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { AuthGuard } from "@nestjs/passport";

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

    @UseGuards(AuthGuard('42'))
    @Get("login")
    login42(@Req() req: any)
    {
        console.log("req ==" + req);
        console.log("Hello from login42 ----");
        // return 'Logged in with 42-intra';
    }

    @UseGuards(AuthGuard('42'))
    @Get("login/callback")
    login42Redirect(@Req() req: any)
    {
        console.log("Hello from login42 callback ----");
        return this.authService.googleLogin(req);
    }


}