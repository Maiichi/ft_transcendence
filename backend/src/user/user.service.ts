import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    async getUserByUsername(username: string)
    {
        try {
            const user = await this.findUserByUsername(username);
            if (!user)
                return "User does not exist";
            else
            {
                const getUser = await this.prisma.user.findUnique({
                    where : {userName : username}
                })
                return getUser;
            }
        } catch (error) {
            throw error;
        }
    }

    async editUsername(userId: number, dto: EditUserDto)
    {
        try {
            const usernameExist = await this.findUserByUsername(dto.userName);
            if (!usernameExist)
            {
                const user = await this.prisma.user.update({
                    where: {intraId: userId} ,
                    data : {
                        userName : dto.userName
                    }
                }).catch(() =>{
                    return `User not found with the ID = ${userId}`;
                });
                return user;
            }
            else
                return "Username already exist";
        } catch (error) {
            throw error;
        }
    }

    async editAvatar(username:string, avatar: any, dto: EditUserDto)
    {
        const allowedFileTypes = ['jpg', 'jpeg', 'png']; // Define the allowed file extensions
        const maxFileSize = 5 * 1024 * 1024; // Define the maximum file size in bytes (e.g., 5MB)
        /*
        {
            fieldname: 'file',
            originalname: 'detailed-hand-drawn-design-table-tennis-logo_23-2148660288-_1_.png',
            encoding: '7bit',
            mimetype: 'image/png',
            destination: './../uploads',
            filename: 'file-1685521256052-457153060.png',
            path: '../uploads/file-1685521256052-457153060.png',
            size: 749227
        }
        */
        try {
            console.log("file size ==" + avatar.size);
            console.log("max size ==" + maxFileSize);
            const isNotAllowed = !allowedFileTypes.includes(avatar.originalname.split(".").pop());
            if (isNotAllowed)
                return "File extention is not allowed";
            if (maxFileSize < avatar.size)
                return "File size is big";
            const usernameExist = await this.findUserByUsername(username);
            if (usernameExist)
            {
                const user = await this.prisma.user.update({
                    where: {userName: username} ,
                    data : {
                        avatar_url : avatar.path
                    }
                })
                console.log("file uploaded successfully");
                return user;
            }
            else
                return `User not found with the username = ${username}`;
        } catch (error) {
            return {error : error.message}
        }
    }

    async findUserById(userId: number)
    {
        try {
            const user = await this.prisma.user.findUnique({
                where : {intraId: userId}
            });
            return user ? true : false;
        } catch (error) {
            throw error
        }
    }

    async findUserByUsername(username: string)
    {
        try {
            const user = await this.prisma.user.findUnique({
                where : {userName: username}
            });
            return user ? true : false;
        } catch (error) {
            throw error
        }
    }
}