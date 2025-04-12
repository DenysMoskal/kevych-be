import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportItem } from './entities/transport-item.entity';
import { TransportItemsService } from './transport-items.service';
import { TransportItemsController } from './transport-items.controller';
import { TransportItemsSeedService } from './transport-items-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransportItem])],
  controllers: [TransportItemsController],
  providers: [TransportItemsService, TransportItemsSeedService],
  exports: [TransportItemsService],
})
export class TransportItemsModule {}
