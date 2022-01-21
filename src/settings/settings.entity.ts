import { Entity, Column, UpdateDateColumn, Unique, PrimaryColumn } from 'typeorm';
import { IsNumber, IsPositive } from 'class-validator';

@Entity()
@Unique(['id'])
export class Settings {
  @PrimaryColumn({ default: 1 })
  id: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;

  @Column({ comment: 'BTC price in USD', type: 'float' })
  @IsNumber()
  @IsPositive()
  btcPriceUsd: number;

  @Column({ comment: 'Mining daily income per 1th', type: 'float' })
  @IsNumber()
  @IsPositive()
  miningDailyIncome: number;
}
