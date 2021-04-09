import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

import { getCurrenciesArray } from '../../utils/get-currencies';

const cryptoCurrencies = getCurrenciesArray('crypto');
const fiatCurrencies = getCurrenciesArray('fiat');

const parseCryptoQuery = (v: string) =>
  v.split(',').map(cur => cryptoCurrencies.includes(cur) ? cur : null).filter(el => el).join(',');
const parseFiatQuery = (v: string) =>
  v.split(',').map(cur => fiatCurrencies.includes(cur) ? cur : null).filter(el => el).join(',');

export class IGetCurrentExchanges {
  @Transform((v: any) => parseCryptoQuery(v.obj.fsyms || ''))
  @IsString()
  readonly fsyms: 'BTC'|'XRP'|'ETH'|'BCH'|'EOS'|'LTC'|'XMR'|'DASH';

  @Transform((v: any) => parseFiatQuery(v.obj.tsyms || ''))
  @IsString()
  readonly tsyms: 'USD'|'EUR'|'GBP'|'JPY'|'RUR';
}
