import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CostCardProps {
    name: string;
    value: number;
}


export function CostCard({ name, value }: CostCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm">{name}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
                ${value.toFixed(4)}
            </CardContent>
        </Card> 
    )
}