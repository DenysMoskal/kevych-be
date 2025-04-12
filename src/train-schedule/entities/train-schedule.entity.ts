import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('train_schedules')
export class TrainSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  trainNumber: string;

  @Column()
  departureStation: string;

  @Column()
  arrivalStation: string;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;

  @ManyToOne(() => User, (user) => user.trainSchedules)
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
