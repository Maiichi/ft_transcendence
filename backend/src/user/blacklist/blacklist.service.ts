import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "../user.service";
import { Injectable } from "@nestjs/common";
import { BlockUserDto, UnBlockUserDto } from "src/user/blacklist/dto/handle.block.dto";
import { WsException } from "@nestjs/websockets";
import { Response } from "express";
import { FriendService } from "../friend/friend.service";

@Injectable()
export class BlacklistService
{
    constructor(
        private prisma:         PrismaService,
        private userService:    UserService,
    ){}

    async blockUser(body: BlockUserDto, userId: number)
    {
        const blocker = await this.userService.getUserInfos(userId);
        if (!blocker)
            throw new WsException(`userId (blocker) = ${userId} does not exist !`);
        const blocked = await this.userService.getUserInfos(body.blockedId);
        if (!blocked)
            throw new WsException(`userId (blocked) = ${body.blockedId} does not exist !`);
        if (blocker.intraId === blocked.intraId)
            throw new WsException(`you cant block yourself`);
            
        const isBlockedByYou = await this.isBlockedByYou(blocker.intraId, blocked.intraId);
        const isBlockingYou  = await this.isBlockingYou(blocker.intraId, blocked.intraId);
        // this case need to be tested
        // check block system
        if (isBlockingYou)
            throw new WsException(`${blocked.userName} is Blocking you`);
        if (isBlockedByYou)
            throw new WsException(`${blocked.userName} is already blocked by you`);
        await this.prisma.blacklist.create({
            data : {
                blocked: {
                    connect : { intraId: blocked.intraId}
                },
                blocker : {
                    connect : { intraId: blocker.intraId}
                }
            }
        });

        // check friendShip to delete it if it exists;
        const friendshipExists = await this.userService.isFriend(userId, body.blockedId);
        if (friendshipExists)
        {
            await this.prisma.user.update({
                where: {
                    intraId: userId,
                },
                data : {
                    friends : {
                        disconnect : {
                            intraId : body.blockedId
                        }
                    },
                    friendsOf : {
                        disconnect : {
                            intraId : body.blockedId
                        }
                    }
                }
            });
        }
        // check if there is any conversation between them remove it 
        // const conversation = await this.prisma.conversation.findFirst({
        //     where : {
        //         type: 'direct',
        //         participants: {
        //             every : {
        //                 intraId : {
        //                     in: [blocked.intraId, blocker.intraId]
        //                 }
        //             }
        //         }
        //     },
        //     select : {
        //         id: true,
        //     }
        // });
        // console.log("conv == ", JSON.stringify(conversation));
        // await this.prisma.conversation.delete({
        //     where: {
        //         id: conversation.id
        //     }
        // });
        console.log(`${blocker.userName} has blocked ${blocked.userName}`);
        return {
            blocker: blocker,
            blocked: blocked
        };
    }

    async unBlockUser(body: UnBlockUserDto, userId: number)
    {
        const unBlocker = await this.userService.getUser(userId);
        if (!unBlocker)
            throw new WsException(`userId (unBlocker) = ${userId} does not exist !`);
        const unBlocked = await this.userService.getUser(body.blockedId);
        if (!unBlocked)
            throw new WsException(`userId (unBlocked) = ${body.blockedId} does not exist !`);
        if (unBlocker.intraId === unBlocked.intraId)
            throw new WsException(`you cant unblock yourself`);

        const isBlockedByYou = await this.isBlockedByYou(unBlocker.intraId, unBlocked.intraId);
        const isBlockingYou  = await this.isBlockingYou(unBlocker.intraId, unBlocked.intraId);

        // check block system
        if (isBlockingYou)
            throw new WsException(`${unBlocked.userName} is Blocking you`);
        if (isBlockedByYou)
        {
            const blockId = await this.getBlockId(unBlocker.intraId, unBlocked.intraId);
            await this.prisma.blacklist.delete({
                where : { 
                    id:  blockId,
                }
            });
            console.log(`${unBlocker.userName} has unblocked ${unBlocked.userName}`);
            // return removedBlockEntry;
            return {
                unBlocker: unBlocker,
                unBlocked: unBlocked
            };
        }
        if (!isBlockedByYou || !isBlockingYou)
            throw new WsException(`This user ${unBlocked.userName} is not blocked by you, you can't unblock him`);
    }

    async getBlockId(blockerId: number, blockedId: number)
    {
        const blockId = await this.prisma.blacklist.findFirst({
            where : {
                blockedById: blockedId,
                blockerById: blockerId
            },
        })
        return blockId.id;
    }

    async isBlockingYou(userId: number, blockId: number)
    {
        const isBlocked = await this.prisma.user.findUnique({
            where : 
            {
                intraId : userId,
                blockedMe : {
                    some : {
                        blockerById : blockId
                    }
                }
            }
        });
        const res = isBlocked ? true : false;
        return res;
    }

    async isBlockedByYou(userId: number, blockId: number)
    {
        const isBlocked = await this.prisma.user.findUnique({
            where : 
            {
                intraId : userId,
                blockedByMe : {
                    some : {
                        blockedById : blockId
                    }
                }
            }
        });
        const res = isBlocked ? true : false;
        return res;
    }

    async getBlacklistUsers(userId: number)
    {
        const blacklist = await this.prisma.user.findMany({
            where: {
                intraId: userId
            },
            select: {
                blockedByMe: {
                    select: {
                        blocked: {
                            select: {
                                intraId: true,
                            }
                        }
                    }
                },
                blockedMe: {
                    select: {
                        blocker: {
                            select: {
                                intraId: true
                            }
                        }
                    }
                }
            }
        });
        const intraIds = blacklist.flatMap((user) => [
            ...user.blockedByMe.map((item) => item.blocked.intraId),
            ...user.blockedMe.map((item) => item.blocker.intraId),
          ]);
        return intraIds;
    }
}