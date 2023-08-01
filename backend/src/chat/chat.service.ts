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
                roomId: roomId
            },
        })
        return memberShip;
    }

}   
