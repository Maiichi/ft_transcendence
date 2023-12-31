import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { GameService } from './game.service';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { Response } from 'express';

@Controller('game')
@UseGuards(JwtGuard)
export class GameController {
    constructor (
        private gameService: GameService
    )
    {}

    @Get('/history')
    async getUserGamesHistory(@GetUser() user: User, @Res() response: Response)
    {   
        try {
            return await this.gameService.getUserGameHistory(user.intraId, response);
        } catch (error) {
            response.send({error: error.message});
        }
    }
    

    // API te get USER game history based on the ID in the URL
    // localhost:5001/api/game/id_user/history
    @Get('/:id_user/history')
    async getGamesHistory(@Param('id_user') targetUser: number, @Res() response: Response)
    {   
        try {
            return await this.gameService.getUserGameHistory(Number(targetUser), response);
        } catch (error) {
            response.send({error: error.message});
        }
    }

    @Get('/leaderBoard')
    async getLeaderBoard(@Res() response: Response)
    {
        try {
            return await this.gameService.getLeaderBoard(response);
        } catch (error) {
            response.send({error: error.message});
        }
    }

    @Get('/:id_user/achievements')
    async getUserAchievements(@Res() response,@Param('id_user') targetUser: number)
    {
        try {
            return await this.gameService.getUserAchievement(response, Number(targetUser));
        } catch (error) {
            response.send({error: error.message});
        }
    }
}