import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { PrismaService } from '../prisma.service';


@Module({
  providers: [ProjectsService, PrismaService],
  exports: [ProjectsService], 
})
export class ProjectsModule {}
