// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {

    constructor(
        private prisma: PrismaService,
        private userService: UserService
    ) {}

    uploadFile(userId: number, avatar: Express.Multer.File): Promise<CloudinaryResponse> {
        return new Promise<CloudinaryResponse>(async (resolve, reject) => {
        // find user by username if it exists
        const userExist = await this.userService.findUserById(userId);
        // const usernameExist = await this.findUserByUsername(username);
        if (userExist)
        {
            this.prisma.user.update({
                where: {intraId: userId} ,
                data : {
                    avatar_url : avatar.filename
                }
            
            }).then((resp) =>{
                if (resp)
                {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        (error, result) => {
                        if (error) return reject(error);
                        console.log('result ==', result);
                        resolve(result);
                        },
                    );
                    streamifier.createReadStream(avatar.buffer).pipe(uploadStream);
                    return 'Avatar updated successfully';
                }
            })
        }
        else
            return `User not found with the id = ${userId}`;
        
        });
    }
}
