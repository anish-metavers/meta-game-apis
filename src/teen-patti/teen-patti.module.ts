import { Module } from '@nestjs/common';
import { TeenPattiService } from './teen-patti.service';
import { TeenPattiController } from './teen-patti.controller';

@Module({
  controllers: [TeenPattiController],
  providers: [TeenPattiService]
})
export class TeenPattiModule {}
