import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  RelationId,
} from 'typeorm';
import { IsString, IsNumber, IsPositive, IsBoolean } from 'class-validator';
import { CONTRACTS_PLANS_PERIOD } from '../constants';
import { Contracts } from '../contracts/contracts.entity';

@Entity()
export class ContractsPlans {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;

  @Column({
    default: false,
    comment: 'Display plan on site',
 })
  @IsBoolean()
  published: boolean;

  @Column({
    default: false,
    comment: 'Available to purchase',
  })
  @IsBoolean()
  available: boolean;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  description: string;

  @Column({ comment: 'in TH/S', type: 'float' })
  @IsNumber()
  @IsPositive()
  minRate: number;

  @Column({ comment: 'in TH/S', type: 'float' })
  @IsNumber()
  @IsPositive()
  maxRate: number;

  @Column()
  @IsString()
  maint: string;

  @Column({
    type: 'enum',
    enum: Object.values(CONTRACTS_PLANS_PERIOD),
  })
  period: string;

  @Column()
  @IsNumber()
  @IsPositive()
  periodValue: number;

  @Column({type: 'float' })
  @IsString()
  tHsPrice: number;

  @OneToMany((type) => Contracts, (contract) => contract.contractsPlan, {
    onDelete: 'CASCADE',
  })
  contracts: Contracts[];

  @RelationId((contractsPlan: ContractsPlans) => contractsPlan.contracts)
  contractsIds: number[];
}
