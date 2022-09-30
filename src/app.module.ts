import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message/message.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { CronModule } from './cron/cron.module';
import { GameModule } from './game/game.module';
import { BetModule } from './bet/bet.module';
import { GameConfigModule } from './game-config/game-config.module';
import { UserActivitiesModule } from './user-activities/user-activities.module';
@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        AuthModule,
        MessageModule,
        RoleModule,
        PermissionModule,
        CronModule,
        GameModule,
        BetModule,
        GameConfigModule,
        UserActivitiesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
