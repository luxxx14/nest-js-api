import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsNumber, IsPositive } from 'class-validator';
import { Contracts } from '../contracts/contracts.entity';

@Entity()
export class MiningHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;

  @Column({ comment: 'profit value in BTC', type: 'float' })
  @IsNumber()
  @IsPositive()
  profit: number;

  @Column({ comment: 'bonus value in BTC', type: 'float' })
  @IsNumber()
  @IsPositive()
  bonus: number;

  @Column({ comment: 'mining value in BTC', type: 'float' })
  @IsNumber()
  @IsPositive()
  mining: number;

  @ManyToOne((type) => Contracts, (contracts) => contracts.miningHistory)
  contract: Contracts;

  @Column()
  @IsNumber()
  contractId: number;
}
