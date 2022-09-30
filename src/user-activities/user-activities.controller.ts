import {
    Body,
    Controller,
    Get,
    Req,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { GlobalExceptionsFilter } from 'exception/GlobalException.filter';
import { HttpExceptionFilter } from 'exception/HttpException.filter';
import { Request } from 'express';
import { AuthGuard } from 'guards/auth.guard';
import { UserActivitiesDTO } from './dto/userActivities.dto';
import { UserActivitiesService } from './user-activities.service';

@UseGuards(AuthGuard)
@UseFilters(GlobalExceptionsFilter, HttpExceptionFilter)
@Controller('user-activities')
export class UserActivitiesController {
    constructor(
        private readonly userActivitiesService: UserActivitiesService,
    ) {}

    @Get()
    async getUserActivities(
        @Body() body: UserActivitiesDTO,
        @Req() req: Request,
    ) {
        return await this.userActivitiesService.getUserActivities(body, req);
    }
}
