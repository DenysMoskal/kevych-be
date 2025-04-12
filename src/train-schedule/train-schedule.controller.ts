import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { TrainScheduleService } from './train-schedule.service';
import { CreateTrainScheduleDto } from './dto/create-train-schedule.dto';
import { UpdateTrainScheduleDto } from './dto/update-train-schedule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { TrainScheduleSortBy, TrainScheduleSortOrder } from './types';

@Controller('train-schedules')
@UseGuards(JwtAuthGuard)
export class TrainScheduleController {
  constructor(private readonly trainScheduleService: TrainScheduleService) {}

  @Post()
  create(
    @Body() createTrainScheduleDto: CreateTrainScheduleDto,
    @Request() req: RequestWithUser,
  ) {
    return this.trainScheduleService.create(
      createTrainScheduleDto,
      req.user.id,
    );
  }

  @Get()
  findAll(
    @Query('sortBy') sortBy?: TrainScheduleSortBy,
    @Query('sortOrder') sortOrder?: TrainScheduleSortOrder,
    @Query('search') search?: string,
  ) {
    return this.trainScheduleService.findAll({
      sortBy,
      sortOrder,
      search,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.trainScheduleService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrainScheduleDto: UpdateTrainScheduleDto,
    @Request() req: RequestWithUser,
  ) {
    return this.trainScheduleService.update(
      id,
      updateTrainScheduleDto,
      req.user.id,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.trainScheduleService.remove(id, req.user.id);
  }
}
