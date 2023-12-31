import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import DB from '../model/index';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    await DB();
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({}));
    await app.listen(3500);
}

bootstrap();
