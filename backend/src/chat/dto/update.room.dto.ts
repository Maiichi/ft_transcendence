import { IsArray, IsNumber, IsObject, IsOptional, IsString } from "class-validator";


export class UpdateRoomDto
{
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    type: string;

    @IsString()
    @IsOptional()
    password: string;

}