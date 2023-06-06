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

    async editUsername(userId: number, dto: EditUserDto, res: any)
    {
        try {
            // check if the {id} provided in the URL belongs to an existing user
            const userExist = await this.findUserById(userId);
            if (userExist)
            {
                // check the username provided is already exist or not
                const usernameExist = await this.findUserByUsername(dto.userName);
                if (!usernameExist)
                {
                    // perform the update
                    await this.prisma.user.update({
                        where: {intraId: userId} ,
                        data : {
                            userName : dto.userName
                        }
                    }).catch((err) =>{
                        return res.status(400).json({ status : 400, message : err })
                    });
                    return  res.status(200).json({
                                status: 200,
                                message : 'Username updated successfully'
                            });
                }
                else
                    return res.status(400).json({
                        status : 400,
                        message : `Username already exist !`
                    });
            }
            else
            {
                return res.status(400).json({
                    status : 400,
                    message : `User not found with the ID = ${userId}`
                });
            }

        } catch (error) {
            return res.status(404).json({
                status: 404,
                message : `ID provided in the URL is not a number`
            });
        }
    }

    // function to upload avatar for the user
    async editAvatar(username:string, avatar: any, dto: EditUserDto, res: any)
    {   
        const allowedFileTypes = ['jpg', 'jpeg', 'png']; // Define the allowed file extensions
        const maxFileSize = 5 * 1024 * 1024; // Define the maximum file size in bytes (e.g., 5MB)
        try {
            // get File extention
            const isNotAllowed = !allowedFileTypes.includes(avatar.originalname.split(".").pop());
            // find user by username if it exists
            const usernameExist = await this.findUserByUsername(username);
            if (usernameExist)
            {
                if (isNotAllowed)
                    return res.status(415).json({
                        status: 415,
                        message: "File extention is not allowed"
                    })
                if (maxFileSize < avatar.size)
                    return res.status(415).json({
                        status: 415,
                        message: "File size is big"
                    })
                await this.prisma.user.update({
                    where: {userName: username} ,
                    data : {
                        avatar_url : avatar.path
                    }
                }).then((resp) =>{
                    if (resp)
                        return res.status(200).json({
                            status: 200,
                            message: 'Avatar updated successfully'
                        })
                })
            }
            else
                return res.status(400).json({
                    status: 400,
                    message: `User not found with the username = ${username}`
                })
        } catch (error) {
            res.status(404).json({
                status: 404,
                message: error.message
            })
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