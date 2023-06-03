import { IsOptional, IsString } from "class-validator"

export class EditUserDto 
{
    @IsString()
    @IsOptional()
    userName: string;

    @IsString()
    @IsOptional()
    avatarUrl: string;
}