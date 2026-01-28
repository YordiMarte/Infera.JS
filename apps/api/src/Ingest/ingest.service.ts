import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { IngestDto } from "./dto/IngestDto";
import { Project } from "@prisma/client";

@Injectable()
export class IngestService {
    constructor(private prisma: PrismaService) {}

    async ingest(project: any, body: any) {
        console.log('PROJECT: ', project);
        console.log('BODY: ', body);

        const service = await this.prisma.service.upsert({
            where: {
                projectId_name: {
                    projectId: project.id,
                    name: body.service.name,
                },
            },
            update: {
                type: body.service.type,
            },
            create: {
                projectId: project.id,
                name: body.service.name,
                type: body.service.type,
            },
        });

        for (const metric of body.metrics) {
            await this.prisma.metric.create({
                data: {
                    serviceId: service.id,
                    type: metric.type,
                    value: metric.value,
                    projectId: {
                        connect: { id: project.id },
                    },
                }
            });
        }

        return { status: "ingested" };
    } catch (error: any) {
        console.error('INGEST ERROR: ', error);
        throw error;
    }
}