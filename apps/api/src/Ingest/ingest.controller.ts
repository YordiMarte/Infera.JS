import {
  Controller,
  Post,
  Body,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { IngestService } from './ingest.service';
import { ProjectsService } from '../projects/projects.service';

@Controller('ingest')
export class IngestController {
  constructor(
    private readonly ingestService: IngestService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  async ingest(
    @Headers('x-api-key') apiKey: string,
    @Body() body: any,
  ) {
    const project = await this.projectsService.findByApiKey(apiKey);

    if (!project) {
      throw new UnauthorizedException('Invalid API key');
    }

    return this.ingestService.ingest(project, body);
  }
}
