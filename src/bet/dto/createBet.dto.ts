import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
export class CreateBet {
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsNumber()
    game_id: number;

    @IsNotEmpty()
    @IsString()
    option: string;
}
