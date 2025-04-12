import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  TransportItem,
  TransportItemType,
} from './entities/transport-item.entity';
import { CreateTransportItemDto } from './dto/create-transport-item.dto';

@Injectable()
export class TransportItemsService {
  constructor(
    @InjectRepository(TransportItem)
    private transportItemsRepository: Repository<TransportItem>,
  ) {}

  async create(
    createTransportItemDto: CreateTransportItemDto,
  ): Promise<TransportItem> {
    const transportItem = this.transportItemsRepository.create(
      createTransportItemDto,
    );
    return this.transportItemsRepository.save(transportItem);
  }

  async findAll(): Promise<{
    stations: TransportItem[];
    trains: TransportItem[];
  }> {
    const allItems = await this.transportItemsRepository.find({
      order: { name: 'ASC' },
    });

    const stations = allItems.filter(
      (item) => item.type === TransportItemType.STATION,
    );
    const trains = allItems.filter(
      (item) => item.type === TransportItemType.TRAIN,
    );

    return { stations, trains };
  }

  async findAllStations(): Promise<TransportItem[]> {
    return this.transportItemsRepository.find({
      where: { type: TransportItemType.STATION },
      order: { name: 'ASC' },
    });
  }

  async findAllTrains(): Promise<TransportItem[]> {
    return this.transportItemsRepository.find({
      where: { type: TransportItemType.TRAIN },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<TransportItem> {
    const item = await this.transportItemsRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Transport item with ID ${id} not found`);
    }
    return item;
  }
}
