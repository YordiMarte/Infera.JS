import { Query, Resolver, ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class HealthStatus {
    @Field()
    status: string;
}

@Resolver()
export class HealthResolver {
    @Query(() => HealthStatus)
    health() {
        return { status: 'OK' };
    }
}