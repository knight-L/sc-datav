import { useRef } from "react";
import useRafInterval from "@/hooks/useRafInterval";
import Chart from "@/components/chart";
import { LineChart } from "echarts/charts";
import {
  DataZoomComponent,
  LegendComponent,
  MarkPointComponent,
} from "echarts/components";
import type { EChartsType } from "echarts/core";

const colors = ["#ACA891", "#6E918C"];
const dataType = { inCount: "进口", outCount: "出口" };

let data: [string[], number[], number[]] = [[], [], []];

for (let i = 0; i < 30; i++) {
  data[0].push(`${i + 1}`.padStart(2, "0"));
  data[1].push(Math.round(i * Math.random() * 1000));
  data[2].push(Math.round(i * Math.random() * 1020));
}

export default function Chart2() {
  const chartRef = useRef<EChartsType>(null);
  const xLength = useRef(0);

  useRafInterval(() => {
    if (chartRef.current) {
      chartRef.current?.dispatchAction({
        type: "dataZoom",
        // 开始位置的数值
        startValue: xLength.current,
        // 结束位置的数值
        endValue: xLength.current + 8,
      });
      xLength.current = (xLength.current + 1) % (data[0].length - 8);
    }
  }, 2_000);

  return (
    <Chart
      ref={chartRef}
      use={[LineChart, LegendComponent, DataZoomComponent, MarkPointComponent]}
      option={{
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          textStyle: {
            color: "#fff",
          },
          backgroundColor: "rgba(110,145,140,0.3)",
          borderColor: colors[1],
          borderWidth: 1,
          borderRadius: 8,
        },
        grid: {
          top: 16,
          bottom: 16,
          left: 16,
          right: 16,
          outerBoundsMode: "same",
        },
        legend: {
          right: 16,
          top: 0,
          data: Object.values(dataType).map((item, index) => ({
            name: item,
            value: 2000,
            icon: "none",
            textStyle: {
              color: colors[index],
            },
          })),
        },
        calculable: true,
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
          axisLabel: {
            interval: 0,
            color: "rgba(255, 255, 255, 0.6)",
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          data: data[0],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            interval: 0,
            color: "rgba(255, 255, 255, 0.6)",
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
        },
        dataZoom: {
          type: "slider",
          show: false,
          realtime: true,
          startValue: 0,
          endValue: 8,
        },
        series: [
          {
            name: "进口",
            type: "line",
            symbol: "none",
            smooth: true,
            itemStyle: {
              color: colors[0],
            },
            markPoint: {
              symbol: "rect",
              symbolSize: [50, 20],
              symbolOffset: [0, -10],
              data: [
                {
                  type: "max",
                  name: "最大值",
                },
              ],
            },
            data: data[1],
          },
          {
            name: "出口",
            type: "line",
            symbol: "none",
            smooth: true,
            itemStyle: {
              color: colors[1],
            },
            markPoint: {
              symbol: "rect",
              symbolSize: [50, 20],
              symbolOffset: [0, -10],
              data: [
                {
                  type: "max",
                  name: "最大值",
                },
              ],
            },
            data: data[2],
          },
        ],
      }}
    />
  );
}
