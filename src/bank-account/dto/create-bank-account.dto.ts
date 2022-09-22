import { IsNotEmpty, IsNumber, IsNumberString, Matches } from 'class-validator';

export class CreateBankAccountDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    bankName: string;

    @IsNumberString({}, { message: 'Account Number is not Valid' })
    @IsNotEmpty()
    accountNumber: string;

    @Matches(/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/, {
        message: 'IFSC Code is not Valid',
    })
    @IsNotEmpty()
    ifscCode: string;

    accountType: string;

    isPrimary: boolean;
}
