import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthMiddleware } from 'middleware/auth.middleware';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'guards/auth.guard';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes('user');
    }
}
