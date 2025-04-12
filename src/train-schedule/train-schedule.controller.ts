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
} from '@nestjs/common';
import { TrainScheduleService } from './train-schedule.service';
import { CreateTrainScheduleDto } from './dto/create-train-schedule.dto';
import { UpdateTrainScheduleDto } from './dto/update-train-schedule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';

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
  findAll(@Request() req: RequestWithUser) {
    return this.trainScheduleService.findAll(req.user.id);
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
