import { IsNumber, IsOptional, IsString } from "class-validator"

    export class CreateRoomDto 
    {
        @IsString()
        name: string;

        @IsNumber()
        ownerId: number;

        @IsString()
        type: string;

        @IsString()
        @IsOptional()
        password: string;

    }