import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameService {
    constructor(private prisma: PrismaService) {}

    private createGameRoom(player1: string, player2: string): string {
        // Here you can implement logic to create a new game room and return its ID
        const roomId = `room_${Math.random().toString(36).substring(7)}`;
        // You might want to keep track of the players in the room or other details
        // based on your game requirements.
        return roomId;
    }

    async updateUserStatusInGame(intraId: number, inGame: boolean,)
    { 
        const isPlaying = this.prisma.user.update({
            where: {
                intraId: intraId
            },
            data: {
                inGame: inGame
            }
        });
        return isPlaying;
    }
}
