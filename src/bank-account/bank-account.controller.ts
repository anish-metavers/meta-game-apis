import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
    UseFilters,
} from '@nestjs/common';
import { GlobalExceptionsFilter } from 'exception/GlobalException.filter';
import { HttpExceptionFilter } from 'exception/HttpException.filter';
import { Request } from 'express';
import { AuthGuard } from 'guards/auth.guard';
import { BankAccountService } from './bank-account.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Controller('bank-account')
@UseGuards(AuthGuard)
@UseFilters(GlobalExceptionsFilter, HttpExceptionFilter)
export class BankAccountController {
    constructor(private readonly bankAccountService: BankAccountService) {}

    @Post()
    create(
        @Req() req: Request,
        @Body() createBankAccountDto: CreateBankAccountDto,
    ) {
        return this.bankAccountService.create(req, createBankAccountDto);
    }

    @Get()
    findAll(@Req() req: Request) {
        return this.bankAccountService.findAll(req);
    }

    @Get(':id')
    findOne(@Req() req: Request, @Param('id') id: string) {
        return this.bankAccountService.findOne(req, +id);
    }

    @Patch(':id')
    update(
        @Req() req: Request,
        @Param('id') id: string,
        @Body() updateBankAccountDto: UpdateBankAccountDto,
    ) {
        return this.bankAccountService.update(req, +id, updateBankAccountDto);
    }

    @Delete(':id')
    remove(@Req() req: Request, @Param('id') id: string) {
        return this.bankAccountService.remove(req, +id);
    }
}
