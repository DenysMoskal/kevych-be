import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TransportItem } from '../../transport-items/entities/transport-item.entity';

@Entity('train_schedules')
export class TrainSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  trainNumber: string;

  @ManyToOne(() => TransportItem)
  @JoinColumn({ name: 'trainId' })
  train: TransportItem;

  @Column()
  trainId: string;

  @Column()
  departureStation: string;

  @ManyToOne(() => TransportItem)
  @JoinColumn({ name: 'departureStationId' })
  departureStationRef: TransportItem;

  @Column()
  departureStationId: string;

  @Column()
  arrivalStation: string;

  @ManyToOne(() => TransportItem)
  @JoinColumn({ name: 'arrivalStationId' })
  arrivalStationRef: TransportItem;

  @Column()
  arrivalStationId: string;

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
