import { ChartPieLegend } from "@/components";
import { useGetDashboard } from "@/hooks";
import _ from "lodash";
import { PieSectorData } from "recharts/types/polar/Pie";
import { GeometrySector } from "recharts/types/util/types";

type PieLabelProps = PieSectorData &
  GeometrySector & {
    tooltipPayload?: any;
  };

const chartConfig = {
  paid: {
    label: "Paid",
    color: "var(--primary)",
  },
  unpaid: {
    label: "Unpaid",
    color: "var(--muted-foreground)",
  },
};

export default function PaymentSummary() {
  const getDashboard = useGetDashboard();
  const paymentAggregateData = getDashboard.data?.data.data?.paymentAggregate;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value = 0,
  }: PieLabelProps) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
    const thousandValue = (value / 1000).toLocaleString("id-ID");

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {thousandValue}k
      </text>
    );
  };

  const data = [
    {
      paymentStatus: "paid",
      amount: paymentAggregateData?.sumPaidAmount || 0,
      fill: "var(--color-paid)",
    },
    {
      paymentStatus: "unpaid",
      amount: paymentAggregateData?.sumUnpaidAmount || 0,
      fill: "var(--color-unpaid)",
    },
  ];

  return (
    <ChartPieLegend
      title="Transaction Stats"
      description={`With total ${paymentAggregateData?.sumAmount.toLocaleString(
        "id-ID"
      )} potentially`}
      label={renderCustomizedLabel}
      config={chartConfig}
      data={data}
      dataKey="amount"
      legendNameKey="paymentStatus"
    />
  );
}
