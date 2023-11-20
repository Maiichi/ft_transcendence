import { IsNumber, IsOptional, IsString } from "class-validator";


export class SetRoomAdminDto
{
    @IsNumber()
    roomId: number;

    @IsNumber()
    userId: number
}

export class KickMemberDto
{
    @IsNumber()
    roomId: number;

    @IsNumber()
    userId: number
}

export class MuteMemberDto
{
    @IsNumber()
    timeMute: number;

    @IsNumber()
    userId: number;

    @IsNumber()
    roomId: number;
}

export class JoinRoomDto
{
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    password: string;

}

export class LeaveRoomDto
{
    @IsNumber()
    roomId: number;
}

export class AddUserToRoomDto
{
    @IsNumber()
    roomId: number;

    @IsNumber()
    userId: number;
}

export class BanUserFromRoom
{
    @IsNumber()
    roomId: number;

    @IsNumber()
    userId: number;
}