import { Controller, Get, Post, Body } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { ConvertDto } from './dto/convert.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('currencies')
  async getCurrencies() {
    return this.currencyService.getCurrencies();
  }

  @Post('convert')
  async convert(@Body() dto: ConvertDto) {
    return this.currencyService.convert(dto);
  }
}