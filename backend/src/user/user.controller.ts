import { Body, Controller, Get, Param, Patch, Post, Req, Res, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { Response, response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterExceptionFilter } from './multer/multer.filter';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController
{
    constructor(private userService: UserService) {}

    // GET /api/users/:username
    @Get(':username')
    profile(@Param('username') username: string , @GetUser() user: User)
    {
        return this.userService.getUserByUsername(username);
    }


    // PATCH /api/users/:id/update
    @Patch(':id/update')
    editUsername(@Param('id') id: any, @Body() dto: EditUserDto)
    {
        const userId: number = parseInt(id);
        return this.userService.editUsername(userId, dto);
    }

    // PATCH /api/users/:username/upload
    @Patch(':username/upload')
    @UseInterceptors(FileInterceptor('file'))
    // @UseFilters(MulterExceptionFilter) // Apply the custom exception filter ---> it didnt work so i handled file error on the service layer
    async uploadAvatar(@Param('username') username: string ,@UploadedFile() file, @Body() dto: EditUserDto)
    {
        try {
            // Handle the uploaded file here
            // You can access the file properties using file.originalname, file.buffer, file.mimetype, etc.
            return await this.userService.editAvatar(username, file, dto);
        } catch (error) {
            return {error : error.message};
        }
    }

}