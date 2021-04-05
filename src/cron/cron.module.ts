import { Module } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GetCurrenciesExchanges } from './cron.service';
import {
  CryptoCurrencies,
  CurrenciesExchanges,
  FiatCurrencies,
} from '../mysql';

@Module({
  imports: [
    SchedulerRegistry,
    TypeOrmModule.forFeature([CryptoCurrencies]),
    TypeOrmModule.forFeature([CurrenciesExchanges]),
    TypeOrmModule.forFeature([FiatCurrencies]),
  ],
  providers: [GetCurrenciesExchanges],
})
export class CronModule {}
