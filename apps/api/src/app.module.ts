
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { IngestModule } from './ingest/ingest.module';
import { DashboardModule } from './dashboard/dashboard.module';


@Module({
  imports: [
    IngestModule,
    DashboardModule,
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //driver: ApolloDriver,
    //autoSchemaFile: true,
    //}),
  ],
})
export class AppModule {}
