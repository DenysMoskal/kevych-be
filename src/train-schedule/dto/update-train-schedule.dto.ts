import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainScheduleDto } from './create-train-schedule.dto';

export class UpdateTrainScheduleDto extends PartialType(
  CreateTrainScheduleDto,
) {
  trainNumber?: string;
  departureStation?: string;
  arrivalStation?: string;
}
