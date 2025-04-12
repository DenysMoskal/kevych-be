import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TransportItemsService } from './transport-items.service';
import { CreateTransportItemDto } from './dto/create-transport-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TransportItem } from './entities/transport-item.entity';

@Controller('transport-items')
export class TransportItemsController {
  constructor(private readonly transportItemsService: TransportItemsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createTransportItemDto: CreateTransportItemDto,
  ): Promise<TransportItem> {
    return this.transportItemsService.create(createTransportItemDto);
  }

  @Get('stations')
  findAllStations(): Promise<TransportItem[]> {
    return this.transportItemsService.findAllStations();
  }

  @Get('trains')
  findAllTrains(): Promise<TransportItem[]> {
    return this.transportItemsService.findAllTrains();
  }
}
