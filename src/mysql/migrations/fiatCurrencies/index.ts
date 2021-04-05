import { MigrationInterface, QueryRunner, getManager } from 'typeorm';

import { FiatCurrencies } from '../../schemas/fiatCurrencies';
import { fiatCurrencies } from '../../../utils/init-currencies';

export class FiatCurrenciesMigration implements MigrationInterface {
  readonly name = `FiatCurrenciesMigration${new Date().valueOf()}`;
  readonly tableName = getManager().getRepository(FiatCurrencies).metadata.tableName;

  public async up(queryRunner: QueryRunner): Promise<any> {
    const sql = `insert ignore into ${this.tableName} (currency_code) values ?`;
    const values = fiatCurrencies.map(curCode => [curCode]);
    queryRunner.query(sql, [values]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.dropColumn(this.tableName, 'currency_code');
  }
}
