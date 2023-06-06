import { Body, Controller, Get, Param, Patch, Post, Req, Res, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { Response, response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterExceptionFilter } from './multer/multer.filter';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiSecurity, ApiTags, ApiUnauthorizedResponse, ApiUnsupportedMediaTypeResponse } from '@nestjs/swagger';


@ApiTags('User')
@UseGuards(JwtGuard)
@Controller('users')
@ApiBearerAuth()
export class UserController
{
    constructor(private userService: UserService) {}

    // GET /api/users/:username
    @Get(':username')
    @ApiOperation({ summary : 'Get user by username'})
    @ApiOkResponse({description : "get a user by username"})
    @ApiBadRequestResponse({description : 'User does not exist'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    profile(@Param('username') username: string , @GetUser() user: User)
    {
        try {
            return this.userService.getUserByUsername(username);
        } catch (error) {
            return error;
        }   
    }
    
    // PATCH /api/users/:id/update
    @Patch(':id/update')
    @ApiOperation({ summary : 'Update user by ID'})
    @ApiBody({
        schema: { properties: { userName: { type: 'string' } } },
    })
    @ApiOkResponse({description : "Username updated successfully"})
    @ApiBadRequestResponse({description : 'User does not exist || username already exist'})
    @ApiNotFoundResponse({description : 'ID in not a number'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @ApiParam({name : 'id'})
    editUsername(@Param('id') id: any, @Body() dto: EditUserDto, @Res() res: Response)
    {
        try {
            const userId: number = parseInt(id);
            return this.userService.editUsername(userId, dto, res);    
        } catch (error) {
            return res.send({error : error})
        }
    }

    // PATCH /api/users/:username/upload
    @Patch(':username/upload')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiOperation({ summary : 'Update user avatar by username'})
    @ApiBadRequestResponse({description : 'Username does not exist'})
    @ApiNotFoundResponse({description : 'Error'})
    @ApiUnsupportedMediaTypeResponse({description : 'Unsupported Media Type | File extention is not allowed | File size is big'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @UseInterceptors(FileInterceptor('file'))
    // @UseFilters(MulterExceptionFilter) // Apply the custom exception filter ---> it didnt work so i handled file error on the service layer
    async uploadAvatar(@Param('username') username: string, @UploadedFile() file: any, @Body() dto: EditUserDto, @Res() res: Response)
    {
        try {
            // Handle the uploaded file here
            // You can access the file properties using file.originalname, file.buffer, file.mimetype, etc.
            return await this.userService.editAvatar(username, file, dto, res);
        } catch (error) {
            return res.send({error : error})
        }
    }

}