import { 
    IsEmail, 
    IsNotEmpty, 
    IsNumber, 
    IsString 
} from "class-validator";

export class AuthDto {

    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsString()
    username: string;

    @IsNumber()
    intra_id: number;
    
    @IsString()
    avatar_url: string;

}