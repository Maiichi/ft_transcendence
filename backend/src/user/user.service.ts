import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import * as path from 'path';
import { Response } from 'express';


@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    // function to get the user using it's IntraID
    async getUser(intraId: number)
    {
        try {
            const user = await this.prisma.user.findUnique({
                where: {intraId : intraId}
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    // function to get the user by it's username
    async getUserByUsername(username: string, res: Response)
    {
        try {
            const user = await this.findUserByUsername(username);
            if (!user)
                return res.status(400).json({
                    status: 400,
                    message: "username not found"
                });
            else
            {
                const getUser = await this.prisma.user.findUnique({
                    where : {userName : username}
                })
                return res.status(200).json({
                    status: 200,
                    message: getUser
                })
                // return getUser;
            }
        } catch (error) {
            return res.status(404).json({
                status: 404,
                message: error
            }); 
            // throw error;
        }
    }

    // function to update the username of the user
    async editUsername(userId: number, dto: EditUserDto, res: Response)
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
                message : `ID is NaN`
            });
        }
    }

    // function to upload avatar for the user
    async editAvatar(userId: number, avatar: Express.Multer.File, res: Response)
    {   
        try {
            // find user by username if it exists
            const userExist = await this.findUserById(userId);
            // const usernameExist = await this.findUserByUsername(username);
            if (userExist)
            {
                await this.prisma.user.update({
                    where: {intraId: userId} ,
                    data : {
                        avatar_url : avatar.filename
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
                    message: `User not found with the id = ${userId}`
                })
        } catch (error) {
            res.status(404).json({
                status: 404,
                message: error.message
            })
        }
    }

    //function to get the user Avatar
    async getUserAvatar(userId: number, res: Response)
    {
        try {
            // find user by username if it exists
            const userExist = await this.findUserById(userId);
            // const usernameExist = await this.findUserByUsername(username);
            if (userExist)
            {
                const user = await this.getUser(userId);
                const filePath = path.join(__dirname, '../../images_uploads' ,  user.avatar_url);
                res.sendFile(filePath);
            }
            else
                return res.status(400).json({
                    status: 400,
                    message: `User not found with the id = ${userId}`
                })

        } catch (error) {
            res.status(404).json({
                status: 404,
                message: error.message
            })
        }
    }

    // function to check if the user exist using it's ID
    async findUserById(userId: number)
    {
        try {
            const user = await this.prisma.user.findUnique({
                where : {intraId: userId}
            })
            return user ? true : false;
        } catch (error) {
            throw error
        }
    }

    // function to check if the user exist using it's username
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
    
    // function to get the user by ID
    async getUserById(userId: number)
    {
        try {
            const user = await this.prisma.user.findUnique({
                where: {intraId : userId}
            });
            if (!user)
                return "user not found !";
            return user;
        } catch (error) {
            console.log("error ==" + error);
            return error;
        }
    }


    async isTwoFactorEnabled(userId: number) 
    {
        try {
            const user = await this.getUser(userId);
            return user.twoFactorActivate;
        } catch (error) {
            return error;
        }
    }

    async isSecretExist(userId: number)
    {
        try {
            const user = await this.getUser(userId);
            return user.twoFactorSecret ? true : false;
        } catch (error) {
            return error;
        }
    }

    async setTwoFactorSecret(userId: number, secret: string)
    {
        try {
            const user = await this.prisma.user.update({
                where: {intraId : userId},
                data : {
                    twoFactorSecret : secret
                }
            })
            return user ? true : false;
        } catch (error) {
            console.log("set secret error ==" + error);
            return error
        }
    }

}