import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainScheduleDto } from './create-train-schedule.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTrainScheduleDto extends PartialType(
  CreateTrainScheduleDto,
) {
  @IsNotEmpty()
  @IsString()
  trainNumber: string;

  @IsNotEmpty()
  @IsString()
  departureStation: string;

  @IsNotEmpty()
  @IsString()
  arrivalStation: string;
}
