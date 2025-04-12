import { IsNotEmpty, IsDateString, IsUUID } from 'class-validator';

export class CreateTrainScheduleDto {
  @IsNotEmpty()
  @IsUUID()
  trainId: string;

  @IsNotEmpty()
  @IsUUID()
  departureStationId: string;

  @IsNotEmpty()
  @IsUUID()
  arrivalStationId: string;

  @IsNotEmpty()
  @IsDateString()
  departureTime: string;

  @IsNotEmpty()
  @IsDateString()
  arrivalTime: string;
}
