import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}