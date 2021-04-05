import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { FiatCurrencies } from '../fiatCurrencies';
import { CryptoCurrencies } from '../cryptoCurrencies';

@Entity()
export class CurrenciesExchanges {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => CryptoCurrencies, currency => currency.currency_code)
  @Column()
  source_currency: string;

  @OneToMany(type => FiatCurrencies, currency => currency.currency_code)
  @Column()
  target_currency: string;

  @Column('text')
  stats_json: string;

  @CreateDateColumn()
  created_at: Date;
}