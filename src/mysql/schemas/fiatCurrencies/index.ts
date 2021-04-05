import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class FiatCurrencies {
  @PrimaryColumn({ unique: true })
  currency_code: string;
}