import { getManager, MigrationInterface, QueryRunner } from 'typeorm';

import { CryptoCurrencies } from '../../schemas/cryptoCurrencies';
import { getCurrenciesArray } from '../../../utils/get-currencies';

const cryptoCurrencies = getCurrenciesArray('crypto');

export class CryptoCurrenciesMigration implements MigrationInterface {
  readonly name = `CryptoCurrenciesMigration${new Date().valueOf()}`;
  readonly tableName = getManager().getRepository(CryptoCurrencies).metadata.tableName;

  public async up(queryRunner: QueryRunner): Promise<any> {
    const sql = `insert ignore into ${this.tableName} (currency_code) values ?`;
    const values = cryptoCurrencies.map(curCode => [curCode]);
    queryRunner.query(sql, [values]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.dropColumn(this.tableName, 'currency_code');
  }
}
