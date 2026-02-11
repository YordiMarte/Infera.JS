"use client"

interface CostChartProps {
    data: Array<{
        serviceName: string;
        totalCostUSD: number;
    }>;
}

export function CostChart({ data }: CostChartProps) {
    const max = Math.max(...data.map(d => d.totalCostUSD), 1);

    return (
        <div className="space-y-2">
            {data.map((d) => (
                <div key={d.serviceName}>
                    <div className="text-xs mb-1">{d.serviceName}</div>
                    <div className="h-2 bg-muted rounded">
                        <div 
                            className="h-2 bg-primary rounded" 
                            style={{ width: `${(d.totalCostUSD / max * 100)}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}