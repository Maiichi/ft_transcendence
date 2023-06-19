import { 
    IsEmail, 
    IsNotEmpty, 
    IsNumber, 
    IsString, 
    isNotEmpty
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
    @IsNotEmpty()
    username: string;

    @IsNumber()
    @IsNotEmpty()
    intra_id: number;
    
    @IsString()
    avatar_url: string;

}