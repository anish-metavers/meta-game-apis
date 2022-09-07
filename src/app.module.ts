import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message/message.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { TeenPattiModule } from './teen-patti/teen-patti.module';
import { CronModule } from './cron/cron.module';
import { GameModule } from './game/game.module';
import { BetModule } from './bet/bet.module';
@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        AuthModule,
        MessageModule,
        RoleModule,
        PermissionModule,
        TeenPattiModule,
        CronModule,
        GameModule,
        BetModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
