import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsNumber } from 'class-validator';

@Entity()
export class Profitability {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  date: number;

  @Column({  type: 'float' })
  @IsNumber()
  value: number;
}

