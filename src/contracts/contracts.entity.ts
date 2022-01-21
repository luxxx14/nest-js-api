import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { IsEmail, IsNumber, IsPositive, IsString } from 'class-validator';
import { CONTRACTS_STATUSES, PAYMENT_TYPES } from '../constants';
import { ContractsPlans } from '../contracts-plans/contracts-plans.entity';
import { User } from '../users/user.entity';
import { MiningHistory } from '../mining-history/mining-history.entity';

@Entity()
export class Contracts {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;

  @Column({ length: 254 })
  @IsEmail()
  contactEmail: string;

  @Column({ comment: 'in TH/S', type: 'float' })
  @IsNumber()
  @IsPositive()
  rate: number;

  @Column({
    type: 'enum',
    enum: Object.values(CONTRACTS_STATUSES),
    default: CONTRACTS_STATUSES.processing,
  })
  status: string;

  @Column({
    type: 'enum',
    enum: Object.values(PAYMENT_TYPES),
    default: PAYMENT_TYPES.bitcoin,
  })
  paymentType: string;

  @Column({  type: 'float' })
  @IsNumber()
  paymentValue: number;

  @Column()
  @IsString()
  paymentCurrencyCode: string;

  @ManyToOne((type) => User, (user) => user.contracts)
  user: User;

  @Column()
  @IsNumber()
  userId: number;

  @ManyToOne((type) => ContractsPlans, (contractsPlan) => contractsPlan.contracts)
  contractsPlan: ContractsPlans;

  @Column()
  @IsNumber()
  contractsPlanId: number;

  @OneToMany((type) => MiningHistory, (miningHistory) => miningHistory.contract, {
    onDelete: 'CASCADE',
  })
  miningHistory: MiningHistory[];

  @RelationId((contracts: Contracts) => contracts.miningHistory)
  miningHistoryIds: number[];

  @Column()
  @IsNumber()
  contractPrice: number;

}
