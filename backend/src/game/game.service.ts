import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDTO } from './dto/game.dto';

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

    async updateUserStatusInGame(intraId: number, inGame: boolean)
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

    async saveGame(body: any) 
    {
        console.log("body === ", body);
        
        const players = await this.prisma.user.findMany({
            where: {
                intraId: {
                    in: body.players,
                },
            },
        });
        console.log('players in service ==', players);
        // Assuming players array is an array of User instances

        const newGame = await this.prisma.game.create({
            data: {
            type: body.gameMode,
            score1: body.score1,
            score2: body.score2,
            winnerId: body.winnerId,
            Players: {
                connect: players.map((player) => ({ id: player.id })),
            },
            },
        });
        return 'game created Successfully';
    }
}
