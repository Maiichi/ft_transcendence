import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ChatService 
{
    constructor(
        private prisma: PrismaService,
    ) {}

    
    // getMembership
    async getMembership(userId: number, roomId: number)
    {
        const memberShip = await this.prisma.membership.findFirst({
            where: {
                userId: userId,
                roomId: roomId,
                isBanned: false
            }
        })
        // console.log("mem ==", JSON.stringify(memberShip));
        return memberShip;
    }

    async getRoom(roomId: number)
    {
        const room = await this.prisma.room.findUnique({
            where : {
                id: roomId
            },
            select : {
                members : {
                    select : {
                        isAdmin: true,
                        isBanned: true,
                        isMute: true,
                        isOwner: true,
                        user : {
                            select: {
                                firstName: true,
                                lastName: true,
                                userName: true,
                                intraId: true,
                                avatar_url: true,
                            }
                        }
                    },
                },
                conversation : {
                    select : {
                        id: true,
                        createdAt: true,
                        participants : true,
                        type: true,
                        updatedAt: true,
                    }
                },
                id: true,
                name: true,
                description: true,
                createdAt: true,
                updatedAt: true, 
                password: true,
                type: true
            }
        });
        return room;
    }
    // async getSingleMembership(userId: number, roomId: number)
    // {
    //     const memberShip = await this.prisma.membership.findFirst({
    //         where: {
    //             userId: userId,
    //             roomId: roomId,
    //             isBanned: false
    //         },
    //         select : {
    //             room : {
    //                 select : {
    //                     id: true,
    //                     conversation : true,
    //                     members: {
    //                         select: {
    //                             isAdmin: true,
    //                             isBanned: true,
    //                             isMute: true,
    //                             isOwner: true,
    //                             user: {
    //                                 select : {
    //                                     firstName: true,
    //                                     lastName: true,
    //                                     userName: true,
    //                                 }
    //                             }
    //                         }
    //                     },
    //                     name: true,
    //                     createdAt: true,
    //                     updatedAt: true,
    //                     password: true,
    //                     type: true,
    //                 }
    //             },
    //             id: true
    //         }
    //     })
    //     console.log("mem ==", JSON.stringify(memberShip));
    //     return memberShip;
    // }

}   
