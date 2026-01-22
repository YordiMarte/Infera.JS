import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { IngestDto } from "./dto/IngestDto";
import { Project } from "@prisma/client";

@Injectable()
export class IngestService {
    constructor(private prisma: PrismaService) {}

    async ingest(project: Project, payload: IngestDto) {
        const service = await this.prisma.service.upsert({
            where: {
                projectId_name: {
                    projectId: project.id,
                    name: payload.service.name,
                },
            },
            update: {
                type: payload.service.type,
            },
            create: {
                projectId: project.id,
                name: payload.service.name,
                type: payload.service.type,
            },
        });

        for (const metric of payload.metrics) {
            await this.prisma.metric.create({
                data: {
                    serviceId: service.id,
                    type: metric.type,
                    value: metric.value,
                }
            });
        }

        return { status: "ingested" };
    }
}   