import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';
import { IngestService } from './ingest.service';
import { Request } from 'express';

interface RequestWithProject extends Request {
    project: any;
}

@Controller('ingest')
export class IngestController {
    constructor(private ingestService: IngestService) {}

    @Post()
    @UseGuards(ApiKeyGuard)
    async ingest(@Req() req: RequestWithProject, @Body() body: any) {
        return this.ingestService.ingest(req, body,);
    } 
}