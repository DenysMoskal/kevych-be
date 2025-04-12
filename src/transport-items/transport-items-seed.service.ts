import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  TransportItem,
  TransportItemType,
} from './entities/transport-item.entity';

@Injectable()
export class TransportItemsSeedService implements OnModuleInit {
  private readonly logger = new Logger(TransportItemsSeedService.name);

  constructor(
    @InjectRepository(TransportItem)
    private transportItemsRepository: Repository<TransportItem>,
  ) {}

  async onModuleInit() {
    const count = await this.transportItemsRepository.count();
    if (count === 0) {
      this.logger.log('Seeding transport items...');
      await this.seedTransportItems();
      this.logger.log('Transport items seeded successfully');
    }
  }

  private async seedTransportItems() {
    const stations = [
      { type: TransportItemType.STATION, name: 'Kyiv' },
      { type: TransportItemType.STATION, name: 'Lviv' },
      { type: TransportItemType.STATION, name: 'Kharkiv' },
      { type: TransportItemType.STATION, name: 'Odessa' },
      { type: TransportItemType.STATION, name: 'Dnipro' },
      { type: TransportItemType.STATION, name: 'Zaporizhzhia' },
      { type: TransportItemType.STATION, name: 'Vinnytsia' },
      { type: TransportItemType.STATION, name: 'Poltava' },
      { type: TransportItemType.STATION, name: 'Ternopil' },
      { type: TransportItemType.STATION, name: 'Ivano-Frankivsk' },
    ];

    const trains = [
      { type: TransportItemType.TRAIN, name: 'Intercity+ №715' },
      { type: TransportItemType.TRAIN, name: 'Intercity+ №743' },
      { type: TransportItemType.TRAIN, name: 'Night express №91' },
      { type: TransportItemType.TRAIN, name: 'Night express №81' },
      { type: TransportItemType.TRAIN, name: 'Regional №829' },
      { type: TransportItemType.TRAIN, name: 'Intercity №747' },
      { type: TransportItemType.TRAIN, name: 'Night express №105' },
      { type: TransportItemType.TRAIN, name: 'Regional №769' },
      { type: TransportItemType.TRAIN, name: 'Intercity+ №731' },
      { type: TransportItemType.TRAIN, name: 'Night express №49' },
    ];

    const items = [...stations, ...trains];
    await this.transportItemsRepository.save(items);
  }
}
