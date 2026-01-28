import { Resolver, Query, Args } from "@nestjs/graphql"
import { PrismaService } from "../prisma.service"
import { DashboardOverview, ServiceCost, MetricAggregate } from "./dashboard.types"

@Resolver()
export class DashboardResolver {
    constructor(private readonly prisma: PrismaService) {}

    @Query(() => [ServiceCost])
    async costByService(
        @Args("projectId") projectId: string,
    ): Promise<ServiceCost[]> {
        const services = await this.prisma.service.findMany({
            where: { projectId },
            include: { 
                costSnapshots: true,
            },
        });

        return services.map(s => ({
            serviceName: s.name,
            serviceType: s.type,
            totalCostUSD: s.costSnapshots.reduce(
                (sum: number, c: { costUSD: number }) => sum + c.costUSD,
                0,
            ),
        }));
    }

    @Query(() => [MetricAggregate])
    async metricAggregates(
        @Args("projectId") projectId: string
    ): Promise<MetricAggregate[]> {
        const metrics = await this.prisma.metric.groupBy({
            by: ["type"],
            where: {
                service: { projectId },
            },
            _sum: { value: true }
        });

        return metrics.map(m => ({
            type: m.type,
            value: m._sum.value ?? 0
            }));
    }

    @Query(() => DashboardOverview)
    async dashboardOverview(
        @Args("projectId") projectId: string
    ): Promise<DashboardOverview> {
        const [costs, metrics] = await Promise.all([
            this.costByService(projectId),
            this.metricAggregates(projectId),
        ]);

        return { costs, metrics };
    }
}

