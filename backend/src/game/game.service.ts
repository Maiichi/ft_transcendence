import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDTO } from './dto/game.dto';
import { Response } from 'express';
import { TreeLevelColumn } from 'typeorm';
import { WsException } from '@nestjs/websockets';
import { UserService } from 'src/user/user.service';
import { count } from 'console';

@Injectable()
export class GameService {
    constructor(private prisma: PrismaService,
                private userService: UserService
        ) {}


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
        
        const players = await this.prisma.user.findMany({
            where: {
                intraId: {
                    in: body.players,
                },
            },
        });

        // Assuming players array is an array of User instances

        await this.prisma.game.create({
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

    async saveAchievement(userId: number, type: string)
    {
        console.log("saave achiev-------------------------------------")
        const gamesDual = await this.prisma.game.findMany({
            where: {
                type : 'dual',
                Players:{
                    some : {
                        intraId: userId
                    }
                }
            },
            select : {
                type: true
            }
        });

        const gamesTriple = await this.prisma.game.findMany({
            where: {
                type : 'triple',
                Players:{
                    some : {
                        intraId: userId
                    }
                }
            },
            select : {
                type: true
            }
        });

        const gamesDualPlayed = gamesDual.length;
        const gamesTriplePlayed = gamesTriple.length;

         if (gamesDualPlayed === 1 && type === 'dual') {
             await this.prisma.achievement.create({
                 data: {
                     name: 'first_dual_game',
                     userId: userId,
                 },
             });
         }

         if (gamesTriplePlayed === 1 && type === 'triple') {
            await this.prisma.achievement.create({
                data: {
                    name: 'first_messy-jungle_game',
                    userId: userId,
                },
            });
        }

        const games = await this.prisma.game.findMany({
            where: {
                Players:{
                    some : {
                        intraId: userId
                    }
                }
            },
            select : {
                type: true
            }
        });
 
        const gamesPlayed = games.length;
        if (gamesPlayed === 10) {
            await this.prisma.achievement.create({
                data: {
                    name: 'ten_games',
                    userId: userId,
                },
            });
        }

        if (gamesPlayed === 20) {
        await this.prisma.achievement.create({
            data: {
                name: 'hundred_games',
                userId: userId,
            },
        });
        }

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

        const isSenderInGame = await this.prisma.user.findUnique({
            where : {
                intraId :senderId
            },
            select : {
                inGame: true
            }
        });

        if (isSenderInGame.inGame)
        throw new WsException(`You cant invite ${receiver.firstName} ${receiver.lastName}, you're playing a game currently`);

        if (isReceiverOnline.status !== "ONLINE")
            throw new WsException(`${receiver.firstName} ${receiver.lastName} is Offline, you can't send a game invitation`);
        if (isReceiverOnline.status === "ONLINE" && isReceiverInGame.inGame)
            throw new WsException(`${receiver.firstName} ${receiver.lastName} is playing a game currently, wait until he finishs`);
    }

    async getUserAchievement(response: Response, userId: number)
    {
        await this.getMaxWin(userId);
        await this.getFiveGameWins(userId);
        const achievement = await this.prisma.achievement.findMany({
            where : {
                userId: userId
            },
            select : {
                name: true
            }
        });
        response.send(achievement);
    }

    async storeAchievement(userId: number, achievementName: string) {
        const existingAchievement = await this.prisma.achievement.findFirst({
            where: {
                userId: userId,
                name: achievementName,
            },
        });

        if (!existingAchievement) {
            await this.prisma.achievement.create({
                data: {
                    userId: userId,
                    name: achievementName,
                }
            });
        }
    }

    // function to get five wins of games
    async getFiveGameWins(userId: number)
    {
        const wins = await this.prisma.game.findMany({
            where: {
                winnerId: userId
            },
            take: 5
        });
        if (wins.length >= 5) {
            await this.storeAchievement(userId, 'five_wins');
        }
    }

    // function to get a win with 3 - 0
    async getMaxWin(userId: number) {
        const maxWin = await this.prisma.game.findFirst({
            where: {
                winnerId: userId,
                OR: [
                    { score1: 3, score2: 0 },
                    { score1: 0, score2: 3 },
                ],
            },
        });
        console.log("-------------------- max wins == ", JSON.stringify(maxWin));
        if (maxWin)
            await this.storeAchievement(userId, 'max_win');
    } 
    
}
