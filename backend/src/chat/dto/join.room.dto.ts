import { IsNumber, IsOptional, IsString } from "class-validator";

export class JoinRoomDto
{
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    password: string;

}