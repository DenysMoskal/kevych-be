export interface TrainScheduleParams {
  sortBy?: TrainScheduleSortBy;
  sortOrder?: 'ASC' | 'DESC';
  search?: string;
}

export enum TrainScheduleSortBy {
  DEPARTURE_TIME = 'departureTime',
  ARRIVAL_TIME = 'arrivalTime',
}

export enum TrainScheduleSortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
