import { IsNotEmpty, IsString, IsDateString, Validate } from 'class-validator';
import { DifferentStationsValidator } from '../validators/different-stations.validator';

export class CreateTrainScheduleDto {
  @IsNotEmpty()
  @IsString()
  trainNumber: string;

  @IsNotEmpty()
  @IsString()
  departureStation: string;

  @IsNotEmpty()
  @IsString()
  @Validate(DifferentStationsValidator, ['departureStation'])
  arrivalStation: string;

  @IsNotEmpty()
  @IsDateString()
  departureTime: string;

  @IsNotEmpty()
  @IsDateString()
  arrivalTime: string;
}
