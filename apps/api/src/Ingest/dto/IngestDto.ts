import { ServiceType, MetricType } from "@prisma/client";

export interface MetricDto {
  type: MetricType;
  value: number;
}

export interface ServiceDto {
  name: string;
  type: ServiceType;
}

export interface IngestDto {
  service: ServiceDto;
  metrics: MetricDto[];
}



