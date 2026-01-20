import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { request } from "http";

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    async canActivate(ctx: ExecutionContext): Promise<boolean> {
        const req = ctx.switchToHttp().getRequest();
        const apiKey = req.headers['x-api-key'];

        if (!apiKey) return false;

        const project = await this.prisma.project.findUnique({
            where: { apiKey }
        });

        req.project = project;
        return !!project;
    }
}