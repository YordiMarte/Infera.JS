import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class ServiceCost {
    @Field()
    serviceName!: string;

    @Field()
    serviceType!: string;

    @Field(() => Float)
    totalCostUSD!: number;
}

@ObjectType()
export class MetricAggregate {
    @Field()
    type!: string;

    @Field(() => Float)
    value!: number;
}

@ObjectType()
export class DashboardOverview {
    @Field(() => [ServiceCost])
    costs!: ServiceCost[];

    @Field(() => [MetricAggregate])
    metrics!: MetricAggregate[];
}