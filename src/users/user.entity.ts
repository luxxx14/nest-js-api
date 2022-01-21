import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  RelationId,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
} from 'typeorm';
import * as crypto from 'crypto';
import { IsEmail, IsBoolean, IsString } from 'class-validator';
import { Contracts } from '../contracts/contracts.entity';
import { WithdrawalRequests } from '../withdrawal-requests/withdrawal-requests.entity';
import { USER_ROLES } from '../constants';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;

  @Column({
    type: 'enum',
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.user,
  })
  role: string;

  @Column({ length: 512 })
  @IsString()
  name: string;

  @Column({ length: 254 })
  @IsEmail()
  email: string;

  @BeforeInsert()
  hashPasswordBeforeInsert() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }
  @BeforeUpdate()
  hashPasswordBeforeUpdate() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }
  @Column({ select: false })
  password: string;

  @BeforeInsert()
  updateEmail() {
    this.email = this.email.toLowerCase();
  }

  @Column({ default: false })
  @IsBoolean()
  twoFactorAuthEnabled: boolean;

  @Column({ default: '', select: false })
  @IsString()
  twoFactorSecret: string;

  @OneToMany(
    (type) => Contracts,
    (contracts) => contracts.user,
    {
      onDelete: 'CASCADE',
    },
  )
  contracts: Contracts[];

  @RelationId((user: User) => user.contracts)
  contractsIds: number[];

  @OneToMany(
    (type) => WithdrawalRequests,
    (withdrawalRequests) => withdrawalRequests.user,
    {
      onDelete: 'CASCADE',
    },
  )
  withdrawalRequests: WithdrawalRequests[];

  @RelationId((user: User) => user.withdrawalRequests)
  withdrawalRequestsIds: number[];

  @Column({ default: false })
  @IsBoolean()
  signUpConfirmed: boolean;

  @Column({ default: '' })
  @IsString()
  verifyId: string;
}
