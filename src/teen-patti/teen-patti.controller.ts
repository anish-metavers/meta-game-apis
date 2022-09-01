import { Controller, Get } from '@nestjs/common';
import { TeenPattiService } from './teen-patti.service';

@Controller('teen-patti')
export class TeenPattiController {
    constructor(private readonly teenPattiService: TeenPattiService) {}

    @Get('shuffle')
    getSuffledCards() {
        return this.teenPattiService.getSuffledCards();
    }
}
