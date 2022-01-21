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
/*import { Contracts } from '../contracts/contracts.entity';
import { WithdrawalRequests } from '../withdrawal-requests/withdrawal-requests.entity';
import { USER_ROLES } from '../constants';*/

@Entity()
@Unique(['login'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 254 })
    @IsString()
    login: string;

    @Column({
        type: 'enum',
        enum: ['phone', 'email'],
        default: 'phone',
    })
    loginType: string;

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

    @Column({ length: 254 })
    @IsString()
    firstName: string;

    @Column({ length: 254 })
    @IsString()
    lastName: string;

    @Column({ length: 254 })
    @IsString()
    surName: string;

    @Column({ type: 'timestamp' })
    birthdayAt: string;

    @Column({ nullable: false, default: 2 })
    roleId: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: number;

    @Column({
        type: 'enum',
        enum: ['ru', 'kz', 'en', 'de'],
        default: 'ru',
    })
    lang: string;
}
