export type ServiceType = "LAMBDA" | "ECS" | "EC2" | "K8S";

export type MetricType =
  | "INVOCATIONS"
  | "ERRORS"
  | "LATENCY_MS";

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
