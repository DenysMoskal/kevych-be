import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual, Not } from 'typeorm';
import { TrainSchedule } from './entities/train-schedule.entity';
import { CreateTrainScheduleDto } from './dto/create-train-schedule.dto';
import { UpdateTrainScheduleDto } from './dto/update-train-schedule.dto';
import { TransportItemsService } from '../transport-items/transport-items.service';
import { TransportItemType } from '../transport-items/entities/transport-item.entity';
import {
  TrainScheduleParams,
  TrainScheduleSortBy,
  TrainScheduleSortOrder,
} from './types';

@Injectable()
export class TrainScheduleService {
  constructor(
    @InjectRepository(TrainSchedule)
    private trainScheduleRepository: Repository<TrainSchedule>,
    private transportItemsService: TransportItemsService,
  ) {}

  async create(
    createTrainScheduleDto: CreateTrainScheduleDto,
    userId: string,
  ): Promise<TrainSchedule> {
    const train = await this.transportItemsService.findOne(
      createTrainScheduleDto.trainId,
    );
    if (!train || train.type !== TransportItemType.TRAIN) {
      throw new BadRequestException('Invalid train ID');
    }

    const departureStation = await this.transportItemsService.findOne(
      createTrainScheduleDto.departureStationId,
    );
    if (
      !departureStation ||
      departureStation.type !== TransportItemType.STATION
    ) {
      throw new BadRequestException('Invalid departure station ID');
    }

    const arrivalStation = await this.transportItemsService.findOne(
      createTrainScheduleDto.arrivalStationId,
    );
    if (!arrivalStation || arrivalStation.type !== TransportItemType.STATION) {
      throw new BadRequestException('Invalid arrival station ID');
    }

    if (departureStation.id === arrivalStation.id) {
      throw new BadRequestException(
        'Departure and arrival stations must be different',
      );
    }

    const departureTime = new Date(createTrainScheduleDto.departureTime);
    const arrivalTime = new Date(createTrainScheduleDto.arrivalTime);

    const overlappingSchedule = await this.trainScheduleRepository.findOne({
      where: {
        trainId: createTrainScheduleDto.trainId,
        departureTime: LessThanOrEqual(arrivalTime),
        arrivalTime: MoreThanOrEqual(departureTime),
      },
    });

    if (overlappingSchedule) {
      throw new BadRequestException(
        `This train already has a schedule that overlaps with the requested time period. 
        Existing schedule: from ${overlappingSchedule.departureTime.toISOString()} to ${overlappingSchedule.arrivalTime.toISOString()}`,
      );
    }

    const trainSchedule = this.trainScheduleRepository.create({
      ...createTrainScheduleDto,
      trainNumber: train.name,
      departureStation: departureStation.name,
      arrivalStation: arrivalStation.name,
      userId,
    });

    return this.trainScheduleRepository.save(trainSchedule);
  }

  async findAll(params: TrainScheduleParams = {}): Promise<TrainSchedule[]> {
    const {
      sortBy = TrainScheduleSortBy.DEPARTURE_TIME,
      sortOrder = TrainScheduleSortOrder.ASC,
      search,
    } = params;

    if (search) {
      const queryBuilder =
        this.trainScheduleRepository.createQueryBuilder('trainSchedule');

      queryBuilder.where(
        'LOWER(trainSchedule.trainNumber) LIKE LOWER(:search) OR ' +
          'LOWER(trainSchedule.departureStation) LIKE LOWER(:search) OR ' +
          'LOWER(trainSchedule.arrivalStation) LIKE LOWER(:search)',
        { search: `%${search.toLowerCase()}%` },
      );

      queryBuilder.orderBy(`trainSchedule.${sortBy}`, sortOrder);

      return queryBuilder.getMany();
    }

    return this.trainScheduleRepository.find({
      order: { [sortBy]: sortOrder },
    });
  }

  async findOne(id: string, userId: string): Promise<TrainSchedule> {
    const trainSchedule = await this.trainScheduleRepository.findOne({
      where: { id },
    });

    if (!trainSchedule) {
      throw new NotFoundException(`Train schedule with ID ${id} not found`);
    }

    if (trainSchedule.userId !== userId) {
      throw new ForbiddenException(
        'You do not have permission to access this train schedule',
      );
    }

    return trainSchedule;
  }

  async update(
    id: string,
    updateTrainScheduleDto: UpdateTrainScheduleDto,
    userId: string,
  ): Promise<TrainSchedule> {
    const trainSchedule = await this.findOne(id, userId);

    let trainId = trainSchedule.trainId;
    if (updateTrainScheduleDto.trainId) {
      const train = await this.transportItemsService.findOne(
        updateTrainScheduleDto.trainId,
      );
      if (!train || train.type !== TransportItemType.TRAIN) {
        throw new BadRequestException('Invalid train ID');
      }
      trainId = updateTrainScheduleDto.trainId;
      updateTrainScheduleDto.trainNumber = train.name;
    }

    let departureStationId = trainSchedule.departureStationId;
    if (updateTrainScheduleDto.departureStationId) {
      const departureStation = await this.transportItemsService.findOne(
        updateTrainScheduleDto.departureStationId,
      );
      if (
        !departureStation ||
        departureStation.type !== TransportItemType.STATION
      ) {
        throw new BadRequestException('Invalid departure station ID');
      }
      departureStationId = updateTrainScheduleDto.departureStationId;
      updateTrainScheduleDto.departureStation = departureStation.name;
    }

    let arrivalStationId = trainSchedule.arrivalStationId;
    if (updateTrainScheduleDto.arrivalStationId) {
      const arrivalStation = await this.transportItemsService.findOne(
        updateTrainScheduleDto.arrivalStationId,
      );
      if (
        !arrivalStation ||
        arrivalStation.type !== TransportItemType.STATION
      ) {
        throw new BadRequestException('Invalid arrival station ID');
      }
      arrivalStationId = updateTrainScheduleDto.arrivalStationId;
      updateTrainScheduleDto.arrivalStation = arrivalStation.name;
    }

    if (departureStationId === arrivalStationId) {
      throw new BadRequestException(
        'Departure and arrival stations must be different',
      );
    }

    const departureTime = updateTrainScheduleDto.departureTime
      ? new Date(updateTrainScheduleDto.departureTime)
      : trainSchedule.departureTime;
    const arrivalTime = updateTrainScheduleDto.arrivalTime
      ? new Date(updateTrainScheduleDto.arrivalTime)
      : trainSchedule.arrivalTime;

    const overlappingSchedule = await this.trainScheduleRepository.findOne({
      where: {
        trainId,
        id: Not(id),
        departureTime: LessThanOrEqual(arrivalTime),
        arrivalTime: MoreThanOrEqual(departureTime),
      },
    });

    if (overlappingSchedule) {
      throw new BadRequestException(
        `This train already has a schedule that overlaps with the requested time period. 
        Existing schedule: from ${overlappingSchedule.departureTime.toISOString()} to ${overlappingSchedule.arrivalTime.toISOString()}`,
      );
    }

    Object.assign(trainSchedule, updateTrainScheduleDto, {
      trainId,
      departureStationId,
      arrivalStationId,
      departureTime,
      arrivalTime,
    });

    return this.trainScheduleRepository.save(trainSchedule);
  }

  async remove(id: string, userId: string): Promise<void> {
    const trainSchedule = await this.findOne(id, userId);

    await this.trainScheduleRepository.remove(trainSchedule);
  }
}
