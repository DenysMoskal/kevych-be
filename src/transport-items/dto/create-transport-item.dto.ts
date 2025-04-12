import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { TransportItemType } from '../entities/transport-item.entity';

export class CreateTransportItemDto {
  @IsNotEmpty()
  @IsEnum(TransportItemType)
  type: TransportItemType;

  @IsNotEmpty()
  @IsString()
  name: string;
}
