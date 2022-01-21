import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { PARTNERSHIPS_REQUESTS_STATUSES } from '../constants';

@Entity()
export class PartnershipRequests {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: number;

  @Column({
    type: 'enum',
    enum: Object.values(PARTNERSHIPS_REQUESTS_STATUSES),
    default: PARTNERSHIPS_REQUESTS_STATUSES.opened,
  })
  status: string;

  @Column({ length: 254 })
  @IsString()
  email: string;

  @Column({ length: 512 })
  @IsString()
  name: string;

  @Column({ length: 100 })
  @IsString()
  phoneNumber: string;
}
