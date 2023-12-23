import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDTO } from './dto/game.dto';
import { Response } from 'express';
import { TreeLevelColumn } from 'typeorm';
import { WsException } from '@nestjs/websockets';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GameService {
    constructor(private prisma: PrismaService,
                private userService: UserService
        ) {}

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

    // stroe the game in the database
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

    // get User game history
    async getUserGameHistory(userId: number, response: Response)
    {
        const gameHistory = await this.prisma.game.findMany({
            where: {
                Players : {
                   some: {
                        intraId : userId
                   }
                }
            },
            orderBy : {
                createdAt : 'desc'
            },
            select : {
                score1: true,
                score2: true,
                winnerId: true,
                type: true,
                createdAt: true,
                Players: {
                    select: {
                        intraId : true,
                        avatar_url: true,
                        userName: true
                    }
                },
            }
        });
        if (gameHistory.length)
            return response.send({data: gameHistory});
        else
            return response.send({message : "This user has no game history yet"});
    }

    // get LeaderBoard of the game (all the users are included)
    async getLeaderBoard(response: Response)
    {
        const games = await this.prisma.game.findMany();
        console.log("games == ", games);
        if (!games.length)
            return response.send({message : "no game has been played at the moment."});
        const leaderboard = await this.prisma.user.findMany({
            select: {
                intraId: true,
                userName: true,
                games: {
                select: {
                    winnerId: true,
                    score1: true,
                    score2: true,
                },
                },
                avatar_url: true,
            },
            });
        
        const leaderboardWithStats = leaderboard
        .filter((user) => user.games.length > 0) // Exclude users without any games
        .map((user) => {
            const totalGames = user.games.length;
            const winCount = user.games.filter((game) => game.winnerId === user.intraId).length;
            const lossCount = totalGames - winCount;
            const winRate = (winCount / totalGames) * 100;
    
            return {
            name: user.userName,
            winRate: `${winRate.toFixed(2)}%`,
            wins: winCount,
            losses: lossCount,
            userId: user.intraId,
            avatar_url: user.avatar_url,
            };
        });
      
        leaderboardWithStats.sort((a, b) => parseFloat(b.winRate) - parseFloat(a.winRate));

        return response.send({data : leaderboardWithStats});
    }


    /* this function it's used in  the chatGateway (global Gateway) 
        it main goal is to check if the user is online and not in a game to receive a gameInvite otherwise it will not sent to him */
    async handleInviteUserToGame(senderId: number, receiverId: number)
    {
        const sender = await this.userService.getUser(senderId);
        if(!sender)
            throw new WsException(`(sender) userId = ${senderId} does not exist !`);
        const receiver = await this.userService.getUser(receiverId);
        if (!receiver)
            throw new WsException(`(receiver) userId = ${receiverId} does not exist !`);
        const isReceiverOnline = await this.prisma.user.findUnique({
            where: {
                intraId : receiverId,
            },
            select : {
                status: true
            }
        });

        const isReceiverInGame = await this.prisma.user.findUnique({
            where : {
                intraId : receiverId,
            },
            select: {
                inGame: true
            }
        });

        if (isReceiverOnline.status !== "ONLINE")
            throw new WsException(`${receiver.firstName} ${receiver.lastName} is Offline, you can't send a game invitation`);
        if (isReceiverOnline.status === "ONLINE" && isReceiverInGame.inGame)
            throw new WsException(`${receiver.firstName} ${receiver.lastName} is playing a game currently, wait until he finishs`);
    }
    
    
}
