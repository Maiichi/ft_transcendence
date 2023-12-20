import { IsNumber, IsOptional, IsString } from "class-validator";


export class CreateGameDTO 
{
    @IsNumber()
    player1Id: number;

    @IsNumber()
    player2Id: number;

    @IsNumber()
    score1: number;

    @IsNumber()
    score2: number;

    @IsString()
    gameMode: string;

    @IsNumber()
    winnerId: number;
}