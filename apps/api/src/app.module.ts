
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { IngestModule } from './ingest/ingest.module';

@Module({
  imports: [
    IngestModule,
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //driver: ApolloDriver,
    //autoSchemaFile: true,
    //}),
  ],
})
export class AppModule {}
