import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CryptoCurrencies {
  @PrimaryColumn({ unique: true })
  currency_code: string;
}