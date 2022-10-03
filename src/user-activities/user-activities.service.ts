import { Injectable } from '@nestjs/common';
import { UserActivitiesDTO } from './dto/userActivities.dto';
import * as moment from 'moment';
import { Op } from 'sequelize';
import { Request } from 'express';

@Injectable()
export class UserActivitiesService {
    async getUserActivities(body: UserActivitiesDTO, req: Request) {
        let { activity, dateFrom, dateTo, limit, page } = body;
        limit = limit || 10;
        page = page || 1;

        dateFrom = moment(dateFrom).format('YYYY-MM-DD');
        dateTo = moment(dateTo).add(1, 'days').format('YYYY-MM-DD');

        let filter: any = {
            user_id: req['user'].id,
            createdAt: {
                [Op.and]: [{ [Op.gte]: dateFrom }, { [Op.lt]: dateTo }],
            },
            status: '1',
        };

        if (activity) filter.activity = activity;

        const totalItems = await global.DB.UserLog.count({ where: filter });
        const offset = limit * (page - 1);
        const totalPages = Math.ceil(totalItems / limit);

        const userActivities = await global.DB.UserLog.findAll({
            where: filter,
            attributes: [
                'id',
                'activity',
                'user_id',
                'ip_address',
                'created_at',
            ],
            include: {
                model: global.DB.User,
                as: 'user_data',
                attributes: ['id', 'name', 'status'],
            },
            limit,
            offset,
            order: [['created_at', 'DESC']],
        });

        return {
            message: 'User Activities Data fetched successfully',
            data: userActivities,
            limit,
            page,
            totalItems,
            totalPages,
        };
    }
}
