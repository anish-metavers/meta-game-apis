import { IsNotEmpty } from 'class-validator';

export class UserActivitiesDTO {
    @IsNotEmpty()
    activity: String;

    @IsNotEmpty()
    dateFrom: any;

    @IsNotEmpty()
    dateTo: any;

    limit: number;
    page: number;
}
