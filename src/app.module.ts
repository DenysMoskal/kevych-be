import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TrainScheduleModule } from './train-schedule/train-schedule.module';
import { TransportItemsModule } from './transport-items/transport-items.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    TrainScheduleModule,
    TransportItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
