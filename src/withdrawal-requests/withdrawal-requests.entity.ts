import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
import { PAYMENT_TYPES, WITHDRAWAL_REQUESTS_STATUSES } from '../constants';
import { User } from '../users/user.entity';

@Entity()
export class WithdrawalRequests {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;

  @Column({
    type: 'enum',
    enum: Object.values(WITHDRAWAL_REQUESTS_STATUSES),
    default: WITHDRAWAL_REQUESTS_STATUSES.processing,
  })
  status: string;

  @Column({
    type: 'enum',
    enum: Object.values(PAYMENT_TYPES),
    default: PAYMENT_TYPES.bitcoin,
  })
  withdrawalType: string;

  @Column({ type: 'float' })
  @IsNumber()
  withdrawalValue: number;

  @Column()
  @IsString()
  withdrawalCurrencyCode: string;

  @ManyToOne((type) => User, (user) => user.withdrawalRequests)
  user: User;

  @Column()
  @IsNumber()
  userId: number;
}
