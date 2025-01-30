'use client';
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../chart";
import { FaChartBar } from "react-icons/fa";


const chartConfig = {
    desktop: {
        label: "Products",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

interface ChartComponentProps {
    chartData: { month: string; desktop: number }[];
    numberOfMonths: number;
}

export default function Component({ chartData, numberOfMonths }: ChartComponentProps) {
    const date = new Date()
    const year = date.getFullYear();

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-x-4">
                    <FaChartBar size={26} />
                    <CardTitle>Productos Ingresados por Mes</CardTitle>
                </div>

                <CardDescription>{`Enero - Diciembre ${year}`}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData} 
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)} 
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Mostrando el total de productos de los últimos {numberOfMonths} meses
                </div>
            </CardFooter>
        </Card>
    );
}