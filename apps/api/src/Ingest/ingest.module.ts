import { Module } from '@nestjs/common';
import { IngestController } from './ingest.controller';
import { IngestService } from './ingest.service';
import { PrismaService } from '../prisma.service';
import { ProjectsModule } from '../projects/projects.module';
import { HealthResolver } from '../health.resolver';

@Module({
    imports: [ProjectsModule],
    controllers: [IngestController],
    providers: [IngestService, PrismaService, HealthResolver],
})
export class IngestModule {}
