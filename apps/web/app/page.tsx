import { fetchDashboard } from "@/lib/graphql"; 
import { CostCard } from "@/components/cost-card";
import { MetricCard } from "@/components/metric-card";
import { CostChart } from "@/components/cost-chart";

export default async function Dashboard() {
  const data = await fetchDashboard("PROJECT_ID");

  const totalCost = data.costs.reduce(
    (sum: number, c: { totalCostUSD: number }) => sum + c.totalCostUSD,
    0
  );

  return (
    <main className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Infera Dashboard</h1>

      <div className="grid grid-cols-3 gap-4"> 
        <CostCard name="Total Cost" value={totalCost} />
        {data.costs.map((c: { serviceName: string; totalCostUSD: number }) => (
          <CostCard
            key={c.serviceName}
            name={c.serviceName}
            value={c.totalCostUSD}
          />
        ))}
      </div>

      <CostChart data={data.costs} />

      <div className="grid grid-cols-3 gap-4">
        {data.metrics.map((m: { name: string; value: number; unit: string }) => (
          <MetricCard 
            key={m.name}
            name={m.name} 
            value={m.value}
            unit={m.unit} 
          />
        ))}
      </div>
    </main>
  )
}