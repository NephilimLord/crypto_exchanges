import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import * as config from 'config';

import { ServiceControllerModule } from './service-controller/service-controller.module';
import { CronModule } from './cron/cron.module';

import {
  CryptoCurrencies,
  CurrenciesExchanges,
  FiatCurrencies,
  CryptoCurrenciesMigration,
  FiatCurrenciesMigration,
} from './mysql';

const mysqlCreds = config.get('mysql');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: mysqlCreds.host,
      port: mysqlCreds.port,
      username: mysqlCreds.username,
      password: mysqlCreds.password,
      database: mysqlCreds.database,
      entities: [
        CryptoCurrencies,
        CurrenciesExchanges,
        FiatCurrencies,
      ],
      migrations: [
        CryptoCurrenciesMigration,
        FiatCurrenciesMigration,
      ],
      migrationsRun: true,
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    MorganModule,
    ServiceControllerModule,
    CronModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
    },
  ],
})

export class AppModule {}
