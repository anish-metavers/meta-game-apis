import { HttpException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { Op } from 'sequelize';
import { ErrorConfig } from 'utils/config';

@Injectable()
export class BankAccountService {
    async create(req: Request, createBankAccountDto: CreateBankAccountDto) {
        const { name, bankName, accountNumber, accountType, isPrimary } =
            createBankAccountDto;

        const ifscCode = createBankAccountDto.ifscCode.toUpperCase();

        const isBankAccountExist = await global.DB.BankAccount.findOne({
            where: {
                user_id: req['user'].id,
                account_no: accountNumber,
                // ifsc_code: ifscCode,
                status: '1',
            },
            attributes: ['id'],
        });

        if (isBankAccountExist) {
            // Throw HttpError Msg: Bank Account already exists
            throw new HttpException(
                { ...ErrorConfig.BANK_ALREADY_EXIST, statusCode: 400 },
                400,
            );
        }

        const bankAccount = await global.DB.BankAccount.create({
            user_id: req['user'].id,
            name: name,
            bank_name: bankName,
            account_no: accountNumber,
            ifsc_code: ifscCode,
            account_type: accountType ? accountType : null,
            // priority: isPrimary ? '1' : '0',
        });

        return {
            message: 'Bank Account Added Successfully',
            data: bankAccount,
        };
    }

    async findAll(req: Request) {
        const bankAccounts = await global.DB.BankAccount.findAll({
            where: {
                user_id: req['user'].id,
                status: '1',
            },
            attributes: [
                'id',
                'user_id',
                'bank_name',
                'name',
                'account_no',
                'ifsc_code',
                'account_type',
                'priority',
                'status',
            ],
        });

        return {
            message: 'Bank Accounts Fetched successfully',
            data: bankAccounts,
        };
    }

    async findOne(req: Request, id: number) {
        const bankAccount = await global.DB.BankAccount.findOne({
            where: {
                user_id: req['user'].id,
                status: '1',
                id,
            },
            attributes: [
                'id',
                'user_id',
                'bank_name',
                'name',
                'account_no',
                'ifsc_code',
                'account_type',
                'priority',
                'status',
            ],
        });

        return {
            message: 'Bank Account Fetched successfully',
            data: bankAccount,
        };
    }

    async update(req: Request, id: number, updateDto: UpdateBankAccountDto) {
        const { name, bankName, accountNumber, accountType, isPrimary } =
            updateDto;
        const ifscCode = updateDto.ifscCode
            ? updateDto.ifscCode.toUpperCase()
            : undefined;

        const bankAccount = await global.DB.BankAccount.findOne({
            where: {
                id,
                status: '1',
                user_id: req['user'].id,
            },
            attributes: { exclude: ['createdAt', 'updatedAt', 'status'] },
        });

        if (!bankAccount)
            throw new HttpException(
                { ...ErrorConfig.BANK_NOT_FOUND, statusCode: 400 },
                400,
            );

        let otherBankFilter = {
            id: { [Op.ne]: bankAccount.id },
            user_id: req['user'].id,
            status: '1',
        };
        if (accountNumber) otherBankFilter['account_no'] = accountNumber;
        // if (ifscCode) otherBankFilter['ifsc_code'] = ifscCode;

        const isOtherBankAccount = await global.DB.BankAccount.findOne({
            where: otherBankFilter,
            attributes: ['id'],
        });

        if (isOtherBankAccount)
            throw new HttpException(
                { ...ErrorConfig.BANK_ALREADY_EXIST, statusCode: 400 },
                400,
            );

        await bankAccount.update({
            name: name ? name : bankAccount.name,
            bank_name: bankName ? bankName : bankAccount.bank_name,
            account_no: accountNumber ? accountNumber : bankAccount.account_no,
            ifsc_code: ifscCode ? ifscCode : bankAccount.ifsc_code,
            account_type: accountType ? accountType : bankAccount.account_type,
        });

        return {
            message: 'Bank Account Updated successfully',
            data: bankAccount,
        };
    }

    async remove(req: Request, id: number) {
        const bankAccount = await global.DB.BankAccount.findOne({
            where: {
                user_id: req['user'].id,
                status: '1',
                id,
            },
            attributes: [
                'id',
                'user_id',
                'bank_name',
                'name',
                'account_no',
                'ifsc_code',
                'account_type',
                'priority',
                'status',
            ],
        });

        if (!bankAccount)
            throw new HttpException(
                { ...ErrorConfig.BANK_NOT_FOUND, statusCode: 400 },
                400,
            );

        await bankAccount.update({
            status: '0',
        });

        return {
            message: 'Bank Account Deleted successfully',
            data: bankAccount,
        };
    }
}
