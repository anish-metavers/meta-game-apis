import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'guards/auth.guard';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
