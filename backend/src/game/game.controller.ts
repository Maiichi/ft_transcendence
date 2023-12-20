import { Controller, Get, Res, UseGuards } from '@nestjs/common';
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
}