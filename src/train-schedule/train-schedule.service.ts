import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainSchedule } from './entities/train-schedule.entity';
import { CreateTrainScheduleDto } from './dto/create-train-schedule.dto';
import { UpdateTrainScheduleDto } from './dto/update-train-schedule.dto';

@Injectable()
export class TrainScheduleService {
  constructor(
    @InjectRepository(TrainSchedule)
    private trainScheduleRepository: Repository<TrainSchedule>,
  ) {}

  async create(
    createTrainScheduleDto: CreateTrainScheduleDto,
    userId: string,
  ): Promise<TrainSchedule> {
    const trainSchedule = this.trainScheduleRepository.create({
      ...createTrainScheduleDto,
      userId,
    });

    return this.trainScheduleRepository.save(trainSchedule);
  }

  async findAll(userId: string): Promise<TrainSchedule[]> {
    return this.trainScheduleRepository.find({
      where: { userId },
      order: { departureTime: 'ASC' },
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

    Object.assign(trainSchedule, updateTrainScheduleDto);

    return this.trainScheduleRepository.save(trainSchedule);
  }

  async remove(id: string, userId: string): Promise<void> {
    const trainSchedule = await this.findOne(id, userId);

    await this.trainScheduleRepository.remove(trainSchedule);
  }
}
