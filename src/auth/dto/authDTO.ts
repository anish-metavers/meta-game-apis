import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IS_STRING,
    Max,
    Min,
} from 'class-validator';

export class SignUpDTO {
    @IsNotEmpty({ message: '$property is Required!!' })
    name: String;

    @IsNotEmpty()
    @IsEmail()
    email: String;

    @IsNotEmpty()
    @IsString()
    @Min(8)
    @Max(20)
    password: String;
}

export class LoginDTO {
    @IsNotEmpty()
    @IsEmail()
    email: String;

    @IsNotEmpty()
    password: String;
}
