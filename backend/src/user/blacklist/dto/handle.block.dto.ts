import { IsNumber, IsString } from "class-validator"

export class BlockUserDto 
{
    @IsNumber()
    blockedId: number;

}

export class UnBlockUserDto 
{
    @IsNumber()
    blockedId: number;

}