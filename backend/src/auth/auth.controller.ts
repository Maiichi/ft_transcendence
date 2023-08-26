import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtGuard } from "./guard";
import { TwoFactorDto } from "./dto";
import { UserService } from "src/user/user.service";
import { GetUser } from "./decorator";
import { User } from "@prisma/client";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController
{
    constructor(
        private authService: AuthService,
        private userService: UserService
    )
    {}


    /********************** 42 Authentication Endpoint **********************/
    @ApiBearerAuth()
    @ApiOperation({summary: 'type "localhost:PORT/api/auth/callback" on the browser and get Token and put it on the green lock {authorize} to perfrom USER requests'})
    @UseGuards(AuthGuard('42'))
    @Get("callback")
    async login42Redirect(@Req() req: Request, @Res() res:Response)
    {
        return await this.authService.authenticate(req, res);
    }
    
    /********************** Two Factor Authentication Endpoints **********************/

    @ApiBearerAuth()
    @ApiOperation({ summary : 'Enable 2FA'})
    @ApiOkResponse({description : "Two Factor Auth is enabled successfully"})
    @ApiBadRequestResponse({description : 'Two Factor authentication already enabled'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @Post('/2fa/enable')
    @UseGuards(JwtGuard)
    async enableTwoFactorAuth(@GetUser() user: User, @Res() res: Response)
    {
        try {
            return await this.authService.enableTwoFactor(user, res);
        } catch (error) {
            res.send({error : error});
        }   
    }

    @ApiBearerAuth()
    @ApiOperation({ summary : 'Disable 2FA'})
    @ApiOkResponse({description : "Two Factor Auth is disabled successfully"})
    @ApiBadRequestResponse({description : 'Two Factor authentication already enabled'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @Post('/2fa/disable')
    @UseGuards(JwtGuard)
    async disableTwoFactorAuth(@GetUser() user: User, @Res() res: Response)
    {
        try {
            return await this.authService.disableTwoFactor(user,res);
        } catch (error) {
            res.send({error : error})
        }
    }


    
    @ApiBearerAuth()
    @ApiOperation({ summary : 'Generate 2FA code'})
    @ApiCreatedResponse({description : "a generated URL returned"})
    @ApiBadRequestResponse({description : 'Two Factor is not enabled'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @Post('/2fa/generate')
    @UseGuards(JwtGuard)
    async generateTwoFactorCode(@GetUser() user: User, @Res() res: Response)
    {
        try {
            return await this.authService.generateTwoFactor(res, user.intraId);
        } catch (error) {
            console.log("error in Controller level")
            throw error
        }
    }
    
    @ApiBearerAuth()
    @ApiOperation({ summary : 'Verify 2FA code'})
    @ApiBadRequestResponse({description : 'Two Factor is not enabled | secret not generated | ERR_INVALID_ARG_TYPE'})
    @ApiOkResponse({description : "return true if code verification is valid otherwise return false"})
    @ApiBody({
        schema: { properties: { code: { type : "string" } } },
    })
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @Post('/2fa/verify')
    @UseGuards(JwtGuard)
    async verifyTwoFactorCode(@Body() dto: TwoFactorDto,  @GetUser() user: User, @Res() res: Response)
    {
        try {
            const isEnabled = await this.userService.isTwoFactorEnabled(user.intraId);
            if (!isEnabled)
                return res.status(404).json({message : 'two factor auth not enabled !'});
            const isSecretExist = await this.userService.isSecretExist(user.intraId);
            if (!isSecretExist)
                return res.status(404).json({message : 'secret is not generated'});
            const result = await this.authService.verifyTwoFactor(dto.code, user.twoFactorSecret);
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }

}