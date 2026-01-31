import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricCardProps {
    name: string;
    value: number;
    unit: string;
}


export function MetricCard({ name, value, unit }: MetricCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm">{name}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
                {value} {unit}
            </CardContent>
        </Card>
    )
}