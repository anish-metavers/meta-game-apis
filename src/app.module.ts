import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message/message.module';
@Module({
    imports: [UserModule, AuthModule, ConfigModule.forRoot(), MessageModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
