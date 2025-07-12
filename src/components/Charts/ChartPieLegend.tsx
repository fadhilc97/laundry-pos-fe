"use client";

import { Pie, PieChart, PieLabel } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

type Props<T = unknown> = {
  config: ChartConfig;
  data: T[];
  title: string;
  description?: string;
  dataKey: string;
  legendNameKey: string;
  label?: PieLabel;
};

export function ChartPieLegend({
  config,
  data,
  title,
  description,
  dataKey,
  legendNameKey,
  label,
}: Props) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey={dataKey}
              startAngle={90}
              endAngle={450}
              label={label}
              labelLine={false}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey={legendNameKey} />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
