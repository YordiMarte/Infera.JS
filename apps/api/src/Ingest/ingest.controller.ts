import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';
import { IngestService } from './ingest.service';
import { RequestWithProject } from './types/request-with-project';
import { IngestDto } from './dto/IngestDto';

@Controller('ingest')
export class IngestController {
    constructor(private ingestService: IngestService) {}

    @Post()
    @UseGuards(ApiKeyGuard)
    async ingest(
        @Req() req: RequestWithProject, 
        @Body() body: IngestDto
    ) {
        return this.ingestService.ingest(req.project, body,);
    } 
}