import { IsNumber, IsOptional, IsString } from "class-validator"

    export class CreateRoomDto 
    {
        @IsString()
        name: string;

        @IsString()
        type: string;

        @IsString()
        @IsOptional()
        password: string;

        @IsString()
        @IsOptional()
        description: string;

    }

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

        @IsString()
        @IsOptional()
        description: string;

    }