import { IsNotEmpty } from 'class-validator';

export class UserActivitiesDTO {
    activity: String;

    @IsNotEmpty()
    dateFrom: any;

    @IsNotEmpty()
    dateTo: any;

    limit: number;
    page: number;
}
