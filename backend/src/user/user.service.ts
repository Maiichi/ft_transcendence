import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import * as path from 'path';
import { Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
const streamifier = require('streamifier');


@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}


    //  TODO: refactor !

    // function to get the user by it's IntraID
    async getUser(intraId: number)
    {
        const user = await this.prisma.user.findUnique({
            where: {intraId : intraId}
        });
        if (!user)
            return null;
        return user;
    }

    async getUserInfos(userId: number)
    {
        const user = await this.prisma.user.findUnique({
            where: {
                intraId: userId
            },
            select: {
                intraId: true,
                userName: true,
                firstName: true,
                lastName: true,
                avatar_url: true,
                status: true
            }
        });
        if (!user)
            return null;
        return user;
    }

    async getUserByIntraId(intraId: number, res: Response)
    {
        const user = await this.getUser(intraId);
        if (!user)
            return res.status(400).json({
                status: 400,
                message: "user not found"
            });
        else
        {
            const getUser = await this.prisma.user.findUnique({
                where : {intraId : intraId}
            })
            return res.status(200).json({
                status: 200,
                message: getUser
            })
            // return getUser;
        }
    }

    // function to get the user by it's username
    async getUserByUsername(username: string, res: Response)
    {
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
    }

    // function to update the username of the user
    async editUsername(userId: number, dto: EditUserDto, res: Response)
    {
        // check if the {id} provided in the URL belongs to an existing user
        const userExist = await this.findUserById(userId);
        if (userExist)
        {
            // check if the username provided is the defalut one for the current user
            // && check the username provided is already exist or not
            const usernameExist = await this.findUserByUsername(dto.userName);
            if (usernameExist && usernameExist.userName !== dto.userName)
            {
                return res.status(400).json({
                    status : 400,
                    message : `Username already exist !`
                });
            }
            else
            {
                // perform the update
                const user = await this.prisma.user.update({
                    where: {intraId: userId} ,
                    data : {
                        userName : dto.userName
                    }
                }).catch((err) =>{
                    return res.status(400).json({ status : 400, message : err })
                });
                return  res.status(200).json({
                            status: 200,
                            message : 'Username updated successfully',
                            data: user
                        });
            }
        }
        else
        {
            return res.status(400).json({
                status : 400,
                message : `User not found with the ID = ${userId}`
            });
        }
    }

    // function to upload avatar for the user
    // async editAvatar(userId: number, avatar: Express.Multer.File, res: Response)
    // {   
    //     // find user by username if it exists
    //     const userExist = await this.findUserById(userId);
    //     // const usernameExist = await this.findUserByUsername(username);
    //     if (userExist)
    //     {
    //         this.prisma.user.update({
    //             where: {intraId: userId} ,
    //             data : {
    //                 avatar_url : avatar.filename
    //             }
            
    //         }).then((resp) =>{
    //             if (resp)
    //                 return res.status(200).json({
    //                     status: 200,
    //                     message: 'Avatar updated successfully',
    //                     data: resp
    //                 })
    //         })
    //     }
    //     else
    //         return res.status(400).json({
    //             status: 400,
    //             message: `User not found with the id = ${userId}`
    //         })
    // }

    async editAvatar(userId: number, avatar: Express.Multer.File, res: Response) {
        try {
            const userExist = await this.findUserById(userId);

            if (!userExist) {
                return res.status(400).json({
                    status: 400,
                    message: `User not found with the id = ${userId}`
                });
            }

            const uploadStream = cloudinary.uploader.upload_stream(async (error, result) => {
                if (error) {
                    return res.status(500).json({
                        status: 500,
                        message: 'Error uploading avatar to Cloudinary',
                        error: error.message
                    });
                }

                // Update the user in the database with the Cloudinary URL
                const updatedUser = await this.prisma.user.update({
                    where: { intraId: userId },
                    data: {
                        avatar_url: result.secure_url
                    }
                });

                return res.status(200).json({
                    status: 200,
                    message: 'Avatar updated successfully',
                    data: updatedUser
                });
            });

            streamifier.createReadStream(avatar.buffer).pipe(uploadStream);
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }

    // function to check if the user exist using it's ID
    async findUserById(userId: number)
    {
        const user = await this.prisma.user.findUnique({
            where : {intraId: userId}
        })
        return user ? true : false;
    }

    // function to check if the user exist using it's username
    async findUserByUsername(username: string)
    {
        const user = await this.prisma.user.findUnique({
            where : {userName: username}
        });
        // if (!user)
        //     return null;
        return (user);
    }
    
    // function to get the user by ID
    async getUserById(userId: number)
    {
        const user = await this.prisma.user.findUnique({
            where: {intraId : userId}
        });
        if (!user)
            return null;
        return user;
    }

    // function to update STATUS of the user
    // async updateUserStatus(userId: number, status: string)
    // {
    //     const user = await this.getUser(userId);
    //     if (user)
    //     {
    //         await this.prisma.user.update({
    //             where: {intraId : userId},
    //             data : {
    //                 status : status
    //             }
    //         });
    //     }
    //     else
    //         throw new NotFoundException(`userId ${userId} not found`)
    // }

    async isTwoFactorEnabled(userId: number) 
    {
        const user = await this.getUser(userId);
        if (!user)
            throw new NotFoundException(`userId ${userId} not found`)
        return user.twoFactorActivate;
    }

    async isSecretExist(userId: number)
    {
        const user = await this.getUser(userId);
        if (!user)
            throw new NotFoundException(`userId ${userId} not found`)
        return user.twoFactorSecret ? true : false;
    }

    async setTwoFactorSecret(userId: number, secret: string)
    {
        const user = await this.prisma.user.update({
            where: {intraId : userId},
            data : {
                twoFactorSecret : secret
            }
        })
        return user ? true : false;
    }


    /* update User Status */
    async updateUserStatus(userId: number, status: string)
    {
        const user = await this.getUser(userId);
        if (user)
        {
            await this.prisma.user.update({
                where: {intraId : userId},
                data : {
                    status : status
                }
            });
        }
        else
            throw new NotFoundException(`userId ${userId} not found`)
    }

    /* get User firends */
    async getFriends(userId: number, res: Response)
    {
        const user = await this.getUser(userId);
        if(!user)
            throw new NotFoundException(`userId = ${userId} does not exist !`);
        const userFriends = await this.prisma.user.findMany({
            where: {
                intraId: userId
            },
            select: {
                friends: {
                    select: {
                        intraId: true,
                        avatar_url: true,
                        lastName: true,
                        firstName: true,
                        userName: true,
                        status: true,
                    }
                }
            }
        });
        return  res.send({
            data : userFriends[0].friends
        });
    }

    // get blacklist of the user (either he's the blocked or the blocked)
    async getBlackList(userId: number, res: Response) {
        const blackList = await this.prisma.blacklist.findMany({
            where: {
                OR: [
                    {
                        blockedById: userId,
                    },
                    {
                        blockerById: userId,
                    },
                ],
            },
            select: {
                blocked: {
                    select: {
                        intraId: true,
                        userName: true,
                        lastName: true,
                        firstName: true,
                        avatar_url: true,
                        status: true,
                    },
                },
                blocker: {
                    select: {
                        intraId: true,
                        userName: true,
                        lastName: true,
                        firstName: true,
                        avatar_url: true,
                        status: true,
                    },
                },
            },
        });
    
        if (!blackList) {
            return res.send({
                userBlockedByYou: [],
                userBlockedYou: [],
            });
        }
    
        const BlockedByYou = [];
        const BlockedYou = [];
    
        for (const entry of blackList) {
            if (entry.blocker.intraId === userId) {
                // User has blocked you
                BlockedByYou.push({
                    intraId: entry.blocked.intraId,
                    userName: entry.blocked.userName,
                    lastName: entry.blocked.lastName,
                    firstName: entry.blocked.firstName,
                    avatar_url: entry.blocked.avatar_url,
                    status: entry.blocked.status,
                });
            } else if (entry.blocked.intraId === userId) {
                // User has been blocked by you
                BlockedYou.push({
                    intraId: entry.blocker.intraId,
                    userName: entry.blocker.userName,
                    lastName: entry.blocker.lastName,
                    firstName: entry.blocker.firstName,
                    avatar_url: entry.blocker.avatar_url,
                    status: entry.blocker.status,
                });
            }
        }
    
        return res.send({
            BlockedByYou,
            BlockedYou,
        });
    }


    // a function to get all users execpt the blacklisted 
    async getAllUser(userId: number, res: Response): Promise<any>
    {
        const users = await this.prisma.user.findMany({
            select : {
                userName : true,
                avatar_url: true,
                lastName: true,
                firstName: true,
                status: true,
                intraId: true,
            }
        })
        
        return res.send({data : users});
    }
    
}