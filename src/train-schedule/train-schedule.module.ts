import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainSchedule } from './entities/train-schedule.entity';
import { UsersModule } from '../users/users.module';
import { TrainScheduleController } from './train-schedule.controller';
import { TrainScheduleService } from './train-schedule.service';
import { TransportItemsModule } from '../transport-items/transport-items.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainSchedule]),
    UsersModule,
    TransportItemsModule,
  ],
  controllers: [TrainScheduleController],
  providers: [TrainScheduleService],
  exports: [TrainScheduleService],
})
export class TrainScheduleModule {}
