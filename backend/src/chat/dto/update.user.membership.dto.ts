import { IsArray, IsNumber, IsObject, IsOptional, IsString } from "class-validator";


export class SetRoomAdmin
{
    @IsNumber()
    roomId: number;

    @IsNumber()
    userId: number
}

export class kickMember
{
    @IsNumber()
    roomId: number;

    @IsNumber()
    userId: number
}