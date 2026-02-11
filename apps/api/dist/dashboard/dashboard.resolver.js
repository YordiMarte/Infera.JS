"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const prisma_service_1 = require("../prisma.service");
const dashboard_types_1 = require("./dashboard.types");
let DashboardResolver = class DashboardResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async costByService(projectId) {
        const services = await this.prisma.service.findMany({
            where: { projectId },
            include: {
                costSnapshots: true,
            },
        });
        return services.map((s) => ({
            serviceName: s.name,
            serviceType: s.type,
            totalCostUSD: s.costSnapshots.reduce((sum, c) => sum + c.costUSD, 0),
        }));
    }
    async metricAggregates(projectId) {
        const metrics = await this.prisma.metric.groupBy({
            by: ["type"],
            where: {
                service: { projectId },
            },
            _sum: { value: true }
        });
        return metrics.map((m) => ({
            type: m.type,
            value: m._sum.value ?? 0
        }));
    }
    async dashboardOverview(projectId) {
        const [costs, metrics] = await Promise.all([
            this.costByService(projectId),
            this.metricAggregates(projectId),
        ]);
        return { costs, metrics };
    }
};
exports.DashboardResolver = DashboardResolver;
__decorate([
    (0, graphql_1.Query)(() => [dashboard_types_1.ServiceCost]),
    __param(0, (0, graphql_1.Args)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardResolver.prototype, "costByService", null);
__decorate([
    (0, graphql_1.Query)(() => [dashboard_types_1.MetricAggregate]),
    __param(0, (0, graphql_1.Args)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardResolver.prototype, "metricAggregates", null);
__decorate([
    (0, graphql_1.Query)(() => dashboard_types_1.DashboardOverview),
    __param(0, (0, graphql_1.Args)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DashboardResolver.prototype, "dashboardOverview", null);
exports.DashboardResolver = DashboardResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardResolver);
