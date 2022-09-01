import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message/message.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { TeenPattiModule } from './teen-patti/teen-patti.module';
@Module({
    imports: [UserModule, AuthModule, ConfigModule.forRoot(), MessageModule, RoleModule, PermissionModule, TeenPattiModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
