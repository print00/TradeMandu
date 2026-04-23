"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Loader } from "@/components/loader";

const LazyLineChart = dynamic(() => import("@/components/charts/stock-history-chart"), {
  ssr: false
});

export function ChartComponent({
  data
}: {
  data: Array<{ date: string; close: number; volume: number }>;
}) {
  return (
    <Suspense fallback={<Loader label="Loading chart..." />}>
      <LazyLineChart data={data} />
    </Suspense>
  );
}

