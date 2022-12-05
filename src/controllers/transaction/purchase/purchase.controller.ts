import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PurchaseService } from '@services/transaction/purchase/purchase.service';
import { UtilsService } from '@utils/utils.service';


@Controller('transaction/purchase')
@UseGuards(AuthGuard())
export class PurchaseController {
    constructor(
        private purchaseService: PurchaseService,
        private utils: UtilsService
    ) { }

    // @Post('/post')
    // async postTransaction(
    //     @Body() body: m_accountsCreateDto,
    // ){

    // }

}
