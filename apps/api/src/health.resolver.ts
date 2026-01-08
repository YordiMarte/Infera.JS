"use strict"

import { Resolver, Query, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class HealthStatus {
    @Field()
    status!: string;
}

@Resolver()
export class HealthResolver {
    @Query(() => HealthStatus)
    health(): HealthStatus {
        return { status: 'OK' };
    }
}