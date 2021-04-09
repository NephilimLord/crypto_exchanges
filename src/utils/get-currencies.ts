import * as yaml from 'js-yaml';
import * as fs from 'fs';
import { join } from 'path';

export const getCurrenciesArray = (type: 'fiat'|'crypto') => {
  try {
    const doc: any = yaml.load(fs.readFileSync(join(__dirname, '../', 'settings.yaml'), 'utf8'));
    return type === 'fiat' ? doc.fiatCurrencies : doc.cryptoCurrencies;
  } catch (e) {
    console.log(e);
    return [];
  }
}
