import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "../user.service";
import { Injectable } from "@nestjs/common";
import { BlockUserDto, UnBlockUserDto } from "src/user/blacklist/dto/handle.block.dto";
import { WsException } from "@nestjs/websockets";

@Injectable()
export class BlacklistService
{
    constructor(
        private prisma:         PrismaService,
        private userService:    UserService
    ){}

    async blockUser(body: BlockUserDto, userId: number)
    {
        const blocker = await this.userService.getUser(userId);
        if (!blocker)
            throw new WsException(`userId (blocker) = ${userId} does not exist !`);
        const blocked = await this.userService.getUser(body.blockedId);
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
        const newBlockEntry = await this.prisma.blacklist.create({
            data : {
                blocked: {
                    connect : { intraId: blocked.intraId}
                },
                blocker : {
                    connect : { intraId: blocker.intraId}
                }
            }
        });

        console.log(`${blocker.userName} has blocked ${blocked.userName}`);
        return newBlockEntry;
    }

    async unBlockUser(body: UnBlockUserDto, userId: number)
    {
        const blocker = await this.userService.getUser(userId);
        if (!blocker)
            throw new WsException(`userId (blocker) = ${userId} does not exist !`);
        const blocked = await this.userService.getUser(body.blockedId);
        if (!blocked)
            throw new WsException(`userId (blocked) = ${body.blockedId} does not exist !`);
        if (blocker.intraId === blocked.intraId)
            throw new WsException(`you cant unblock yourself`);

        const isBlockedByYou = await this.isBlockedByYou(blocker.intraId, blocked.intraId);
        const isBlockingYou  = await this.isBlockingYou(blocker.intraId, blocked.intraId);

        // check block system
        if (isBlockingYou)
            throw new WsException(`${blocked.userName} is Blocking you`);
        if (isBlockedByYou)
        {
            const blockId = await this.getBlockId(blocker.intraId, blocked.intraId);
            const removedBlockEntry = await this.prisma.blacklist.delete({
                where : { 
                    id:  blockId,
                }
            });
            console.log(`${blocker.userName} has unblocked ${blocked.userName}`);
            return removedBlockEntry;
        }
        if (!isBlockedByYou || !isBlockingYou)
            throw new WsException(`This user ${blocked.userName} is not blocked by you, you can't unblock him`);
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
}