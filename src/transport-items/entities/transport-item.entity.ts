import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TransportItemType {
  STATION = 'station',
  TRAIN = 'train',
}

@Entity('transport_items')
export class TransportItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: TransportItemType,
  })
  type: TransportItemType;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
