'use client';
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
        color: "#2e86c1", 
    },
} satisfies ChartConfig;

interface ChartComponentProps {
    chartData: { month: string; desktop: number }[];
    numberOfMonths: number;
}

export default function Component({ chartData, numberOfMonths }: ChartComponentProps) {
    const date = new Date();
    const year = date.getFullYear();
    
    const footerDescription = numberOfMonths > 1 
        ? `Mostrando el total de productos de los últimos ${numberOfMonths} meses, incluyendo este mes.` 
        : `Mostrando los productos de este mes.`;

    const barSize = chartData.length <= 4 ? 60 : chartData.length <= 8 ? 40 : 30;
    const chartWidth = Math.max(chartData.length * 80, 300); 

    return (
        <Card className="shadow-lg rounded-2xl bg-white dark:bg-zinc-900">
            <CardHeader>
                <div className="flex items-center gap-x-4">
                    <FaChartBar size={28} className="text-primary" />
                    <CardTitle className="text-lg font-semibold">Productos Ingresados por Mes</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                    Enero - Diciembre {year}
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
                <ChartContainer className="w-full min-w-[300px]" config={chartConfig}>
                    <BarChart
                        width={chartWidth} 
                        height={250}
                        data={chartData}
                        margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
                    >
                        <CartesianGrid vertical={false} strokeOpacity={0.1} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)} 
                            className="text-muted-foreground text-sm"
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar 
                            dataKey="desktop" 
                            fill={chartConfig.desktop.color} 
                            radius={[6, 6, 0, 0]} 
                            barSize={barSize} 
                            fillOpacity={0.85} 
                        >
                            <LabelList
                                position="top"
                                offset={10}
                                className="fill-foreground text-sm"
                                fontSize={12}
                                fill="currentColor"
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm text-muted-foreground">
                <div className="leading-none">{footerDescription}</div>
            </CardFooter>
        </Card>
    );
}
