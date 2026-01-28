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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardOverview = exports.MetricAggregate = exports.ServiceCost = void 0;
const graphql_1 = require("@nestjs/graphql");
let ServiceCost = class ServiceCost {
};
exports.ServiceCost = ServiceCost;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ServiceCost.prototype, "serviceName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ServiceCost.prototype, "serviceType", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ServiceCost.prototype, "totalCostUSD", void 0);
exports.ServiceCost = ServiceCost = __decorate([
    (0, graphql_1.ObjectType)()
], ServiceCost);
let MetricAggregate = class MetricAggregate {
};
exports.MetricAggregate = MetricAggregate;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], MetricAggregate.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], MetricAggregate.prototype, "value", void 0);
exports.MetricAggregate = MetricAggregate = __decorate([
    (0, graphql_1.ObjectType)()
], MetricAggregate);
let DashboardOverview = class DashboardOverview {
};
exports.DashboardOverview = DashboardOverview;
__decorate([
    (0, graphql_1.Field)(() => [ServiceCost]),
    __metadata("design:type", Array)
], DashboardOverview.prototype, "costs", void 0);
__decorate([
    (0, graphql_1.Field)(() => [MetricAggregate]),
    __metadata("design:type", Array)
], DashboardOverview.prototype, "metrics", void 0);
exports.DashboardOverview = DashboardOverview = __decorate([
    (0, graphql_1.ObjectType)()
], DashboardOverview);
