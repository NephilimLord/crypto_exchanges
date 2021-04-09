import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as config from 'config';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';

import { CryptoCurrencies, CurrenciesExchanges, FiatCurrencies } from '../mysql';
import { parseDbResponse } from '../utils/parse-db-response';
import { getThirdPartyExchange } from '../utils/api';

@Injectable()
export class GetCurrenciesExchanges {
  readonly #cryptoCurrenciesTableName: string;
  readonly #fiatCurrenciesTableName: string;
  readonly #currenciesExchangeTableName: string;

  constructor(
    @InjectRepository(CurrenciesExchanges) private currenciesExchanges: Repository<CurrenciesExchanges>,
    @InjectRepository(CryptoCurrencies) private cryptoCurrencies: Repository<CryptoCurrencies>,
    @InjectRepository(FiatCurrencies) private fiatCurrencies: Repository<FiatCurrencies>
  ) {
    this.#cryptoCurrenciesTableName = getManager().getRepository(CryptoCurrencies).metadata.tableName;
    this.#fiatCurrenciesTableName = getManager().getRepository(FiatCurrencies).metadata.tableName;
    this.#currenciesExchangeTableName = getManager().getRepository(CurrenciesExchanges).metadata.tableName;
  }

  @Cron(config.get('cronTime'))
  async handleCron() {
    console.log('Cron init:', new Date());
    const fiatCurrenciesDBRes = await this.getFiatCurrencies();
    const cryptoCurrenciesDBRes = await this.getCryptoCurrencies();
    const fiatCurrencies = fiatCurrenciesDBRes.map(el => el.currency_code);
    const cryptoCurrencies = cryptoCurrenciesDBRes.map(el => el.currency_code);
    const fiatCurString = fiatCurrencies.join(',');
    const cryptoCurString = cryptoCurrencies.join(',');

    let body;
    try {
      const apiExchangeResponse = await getThirdPartyExchange(cryptoCurString, fiatCurString);
      body = apiExchangeResponse.body;
    } catch (e) {
      console.log(e);
    }

    if (!body) {
      return;
    }

    const rawObj = body.RAW;
    const displayObj = body.DISPLAY;

    const sql =
      `insert into ${this.#currenciesExchangeTableName} (source_currency, target_currency, stats_json, created_at) values ?`;
    const values = [];

    cryptoCurrencies.forEach((cryptoCur: string) => {
      const rawCrypto = rawObj[cryptoCur];
      const displayCrypto = displayObj[cryptoCur];

      fiatCurrencies.forEach((fiatCur: string) => {
        const jsonStr = JSON.stringify({
          RAW: {
            [cryptoCur]: {
              [fiatCur]: rawCrypto[fiatCur],
            }
          },
          DISPLAY: {
            [cryptoCur]: {
              [fiatCur]: displayCrypto[fiatCur],
            },
          },
        });

        values.push([cryptoCur, fiatCur, jsonStr, new Date()]);
      });
    });

    await this.currenciesExchanges.query(sql, [values]);
  }

  async getFiatCurrencies() {
    const sql = `select * from ${this.#fiatCurrenciesTableName}`;
    return parseDbResponse(this.fiatCurrencies.query(sql));
  }

  async getCryptoCurrencies() {
    const sql = `select * from ${this.#cryptoCurrenciesTableName}`;
    return parseDbResponse(this.cryptoCurrencies.query(sql));
  }
}
