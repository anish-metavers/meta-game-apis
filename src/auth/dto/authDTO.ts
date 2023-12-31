import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

const passwordValidator = require('password-validator');

export class SignUpDTO {
    @IsNotEmpty()
    name: String;

    @IsEmail()
    @IsNotEmpty()
    email: String;

    @IsString()
    @IsNotEmpty()
    password: String;

    roles: Number[];
}

export class LoginDTO {
    @IsEmail()
    @IsNotEmpty()
    email: String;

    @IsNotEmpty()
    password: String;
}

// Create a schema
export const passwordSchema = new passwordValidator()
    .is()
    .min(8, 'Password length must be at least 8 characters') // Minimum length 8
    .is()
    .max(100, 'Password can be of Max 8 characters') // Maximum length 100
    .has()
    .uppercase(1, 'Password must contain an uppercase Character') // Must have uppercase letters
    .has()
    .lowercase(1, 'Password must contain a lowercase Character') // Must have lowercase letters
    .has()
    .digits(1, 'Password must contain a Number') // Must have at least 2 digits
    .has()
    .symbols(1, 'Password must contain a Symbol')
    .has()
    .not()
    .spaces(1, 'Password can not contain a Space');
