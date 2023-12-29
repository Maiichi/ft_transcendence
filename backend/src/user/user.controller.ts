import { BadRequestException, Body, Controller, Get, Param, Patch, Res, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { Response, Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterExceptionFilter } from './multer/multer.filter';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse, ApiUnsupportedMediaTypeResponse } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@ApiTags('User')
@UseGuards(JwtGuard)
@Controller('users')
@ApiBearerAuth()
export class UserController
{
    constructor(
        private userService:    UserService,
    ) {}
    // GET /api/users/:username
    // @Get(':username')
    // @ApiOperation({ summary : 'Get user by username'})
    // @ApiOkResponse({description : "get a user by username"})
    // @ApiBadRequestResponse({description : 'User does not exist'})
    // @ApiUnauthorizedResponse({description : 'Unauthorized'})
    // profile(@Param('username') username: string, @Res() res: Response)
    // {
    //     try {
    //         return this.userService.getUserByUsername(username, res);
    //     } catch (error) {
    //         return res.send({error : error});
    //     }   
    // }
 
    // GET /api/users/byid/:id
    @Get('byid/:id')
    @ApiOperation({ summary : 'Get user by id'})
    @ApiOkResponse({description : "get a user by id"})
    @ApiBadRequestResponse({description : 'User does not exist'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    userById(@Param('id') id: string, @Res() res: Response)
    {
        try {
            return this.userService.getUserByIntraId(parseInt(id),res);
        } catch (error) {
            return res.send({error : error});
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
    editUsername(@Param('id') id: number, @Body() dto: EditUserDto, @Res() res: Response)
    {
        try {
            return this.userService.editUsername(Number(id), dto, res);    
        } catch (error) {
            return res.send({error : error})
        }
    }

    // PATCH /api/users/:username/upload-avatar
    @Patch(':id/upload-avatar')
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
    @ApiOperation({ summary : 'Update user avatar by ID'})
    @ApiBadRequestResponse({description : 'Id does not exist'})
    @ApiNotFoundResponse({description : 'Error'})
    @ApiUnsupportedMediaTypeResponse({description : 'Unsupported Media Type | File extention is not allowed | File size is big'})
    @ApiUnauthorizedResponse({description : 'Unauthorized'})
    @UseInterceptors(FileInterceptor('file'))
    @UseFilters(MulterExceptionFilter) // Apply the custom exception filter
    async uploadAvatar(@Param('id') id: number, @UploadedFile() file:  Express.Multer.File, @Res() res: Response)
    {
        try {
            if (!file)
                throw new BadRequestException();
            // Handle the uploaded file here
            // You can access the file properties using file.originalname, file.buffer, file.mimetype, etc.
            // return await this.cloudinaryService.uploadFile(Number(id), file);
            return await this.userService.editAvatar(Number(id), file, res);
        } catch (error) {
            return res.send({error : error});
        }
    }

    // GET /api/users/:id/avatar
    // @Get(':id/avatar/')
    // @ApiOperation({ summary: 'Get User Avatar' })
    // @ApiParam({ name: 'id', description: 'User ID' })
    // @ApiResponse({
    //     status: 200,
    //     description: 'OK',
    //     content: {
    //         '*/*': {
    //             schema: {
    //             type: 'string',
    //             format: 'binary',
    //             },
    //         },
    //     },
    // })
    // @ApiResponse({ status: 404, description: 'Not Found' })
    // @ApiUnauthorizedResponse({description : 'Unauthorized'})
    // @ApiBadRequestResponse({description : 'Id does not exist'})
    // async getAvatar(@Param('id') id: number ,@Res() res: Response)
    // {
    //     try {
    //         return await this.userService.getUserAvatar(Number(id), res);
    //     } catch (error) {
    //         return res.send({error : error})
    //     }
    // }

    @Get('friends/')
    async getFriend(@GetUser() user: User ,  @Res() res: Response)
    {
        console.log('here ')
        try {
            return await this.userService.getFriends(user.intraId, res);
        } catch (error) {
            return res.send({error: error})
        }
    }

    @Get('blacklist/')
    async getBlackList(@GetUser() user: User ,  @Res() res: Response)
    {
        console.log('here ')
        try {
            return await this.userService.getBlackList(user.intraId, res);
        } catch (error) {
            return res.send({error: error})
        }
    }


    // THIS API fetchs all the users from the database execpt the blacklisted for the current user
    // GetUser() is a decorator that get the current connected User
    @Get('all/')
    async getAllUser(@GetUser() user: User, @Res() res: Response)
    {
        try {
            return await this.userService.getAllUser(user.intraId, res);
        } catch (error) {
            return res.send({error: error})
        }
    }



    // API endpoint to get friendRequests sent to the current User
    // GetUser() is a decorator that get the current connected User
    @Get('/friends/requests-received')
    async getFriendRequests(@GetUser() user:User, @Res() res: Response)
    {
        try {
            return await this.userService.getFriendRequests(user.intraId, res);
        } catch (error) {
            return res.send({error: error})
        }
    }


    

}