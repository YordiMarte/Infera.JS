"use client";
import { fetchDashboard } from "@/lib/graphql"; 
import { CostCard } from "@/components/cost-card";
import { MetricCard } from "@/components/metric-card";
import { CostChart } from "@/components/cost-chart";

type Cost = {
  serviceName: string;
  totalCostUSD: number;
};

type Metric = {
  name: string;
  value: number;
  unit: string;
};

type DashboardData = {
  costs: Cost[];
  metrics: Metric[];
};

export default async function Dashboard() {
  const data: DashboardData = await fetchDashboard("PROJECT_ID");

  if (!data?.costs?.length) {
    return <main className="p-6">No data available</main>;
  }

  const totalCost = data.costs.reduce(
    (sum, c) => sum + c.totalCostUSD,
    0
  );

  return (
    <main className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Infera Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CostCard name="Total Cost" value={totalCost} />
        {data.costs.map((c) => (
          <CostCard
            key={c.serviceName}
            name={c.serviceName}
            value={c.totalCostUSD}
          />
        ))}
      </div>

      <CostChart data={data.costs} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.metrics.map((m) => (
          <MetricCard
            key={m.name}
            name={m.name}
            value={m.value}
            unit={m.unit}
          />
        ))}
      </div>
    </main>
  );
}

