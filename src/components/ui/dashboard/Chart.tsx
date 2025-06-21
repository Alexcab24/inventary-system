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
import { MdBarChart } from "react-icons/md";

const chartConfig = {
    desktop: {
        label: "Inbound Quantity",
        color: "#2563eb", // blue-600
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
        ? `Showing total inbound quantity for the last ${numberOfMonths} months, including this month.`
        : `Showing inbound quantity for this month.`;

    const barSize = chartData.length <= 4 ? 60 : chartData.length <= 8 ? 40 : 30;
    const chartWidth = Math.max(chartData.length * 80, 300);

    return (
        <Card className="shadow-sm rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50/50 to-white">
            <CardHeader className="border-b border-gray-100">
                <div className="flex items-center gap-x-4">
                    <div className="p-2 rounded-lg bg-blue-100/50">
                        <MdBarChart size={24} className="text-blue-600" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-semibold text-gray-800">Inbound Movements by Month</CardTitle>
                        <CardDescription className="text-sm text-gray-500 mt-1">
                            January - December {year}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <ChartContainer className="w-full min-w-[300px]" config={chartConfig}>
                    <BarChart
                        width={chartWidth}
                        height={250}
                        data={chartData}
                        margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
                    >
                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke="#e5e7eb"
                            opacity={0.5}
                        />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            className="text-gray-500 text-sm font-medium"
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            }}
                        />
                        <Bar
                            dataKey="desktop"
                            fill={chartConfig.desktop.color}
                            radius={[6, 6, 0, 0]}
                            barSize={barSize}
                            fillOpacity={0.85}
                            className="hover:opacity-90 transition-opacity"
                        >
                            <LabelList
                                position="top"
                                offset={10}
                                className="fill-gray-600 text-sm font-medium"
                                fontSize={12}
                                fill="currentColor"
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                <div className="text-sm text-gray-500 leading-relaxed">
                    {footerDescription}
                </div>
            </CardFooter>
        </Card>
    );
}
