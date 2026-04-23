"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { formatCurrency } from "@/lib/utils";

export default function StockHistoryChart({
  data
}: {
  data: Array<{ date: string; close: number; volume: number }>;
}) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
          <XAxis
            dataKey="date"
            tick={{ fill: "currentColor", fontSize: 12 }}
            tickFormatter={(value: string) =>
              new Intl.DateTimeFormat("en-NP", { month: "short", day: "numeric" }).format(new Date(value))
            }
          />
          <YAxis tick={{ fill: "currentColor", fontSize: 12 }} domain={["auto", "auto"]} />
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Line type="monotone" dataKey="close" stroke="rgb(37, 99, 235)" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
