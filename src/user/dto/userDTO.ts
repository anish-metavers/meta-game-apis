import {
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsString,
    IS_STRING,
    Max,
    Min,
} from 'class-validator';

const passwordValidator = require('password-validator');

export class CreateUser {
    @IsNotEmpty({ message: '$property is Required!!' })
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsArray()
    roles: number[];
}

export class UpdateUser {
    @IsNotEmpty({ message: '$property is Required!!' })
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsArray()
    roles: number[];
}

export class ChangePassword {
    @IsNotEmpty()
    oldPassword: string;

    @IsNotEmpty()
    newPassword: string;

    @IsNotEmpty()
    confirmPassword: string;
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
    .digits(2, 'Password must contain a Number') // Must have at least 2 digits
    .has()
    .symbols(1, 'Password must contain a Symbol')
    .has()
    .not()
    .spaces(1, 'Password can not contain a Space');
