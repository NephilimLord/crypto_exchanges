import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiceControllerController } from './service-controller.controller';
import { ServiceControllerService } from './service-controller.service';

import {
  CryptoCurrencies,
  CurrenciesExchanges,
} from '../mysql';

@Module({
  imports: [
    TypeOrmModule.forFeature([CryptoCurrencies]),
    TypeOrmModule.forFeature([CurrenciesExchanges]),
  ],
  controllers: [ServiceControllerController],
  providers: [ServiceControllerService],
  exports: [ServiceControllerService],
})
export class ServiceControllerModule {}
