import Chart from "@/components/chart";
import useRafInterval from "@/hooks/useRafInterval";
import { BarChart, type BarSeriesOption } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  type GridComponentOption,
  type TooltipComponentOption,
} from "echarts/components";
import type { ComposeOption, EChartsType } from "echarts/core";
import { useRef } from "react";

type BarOption = ComposeOption<
  BarSeriesOption | TooltipComponentOption | GridComponentOption
>;

const data = [3000, 2000, 4000, 5000, 4500];
const colors = ["#3061DB", "#BDCFFF"];
const xData = ["50", "50～100", "100～500", "500～1000", "1000"];
export default function Chart3() {
  const chartRef = useRef<EChartsType>(null);
  const tipIndex = useRef(0);

  useRafInterval(
    () => {
      if (chartRef.current) {
        chartRef.current?.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: tipIndex.current,
        });
        tipIndex.current = (tipIndex.current + 1) % data.length;
      }
    },
    3_000,
    true
  );

  return (
    <Chart<BarOption>
      ref={chartRef}
      use={[BarChart, TooltipComponent, GridComponent]}
      option={{
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0, 0, 0,0.8)",
          borderColor: colors[1],
          borderWidth: 1,
          borderRadius: 8,
          textStyle: {
            color: "rgba(255, 255, 255,0.8)",
            fontSize: 13,
            align: "left",
          },
          axisPointer: {
            type: "line",
            lineStyle: {
              width: 1,
              type: "dotted",
              color: colors[0],
            },
          },
        },
        grid: {
          top: "20%",
          bottom: "5%",
          left: 10,
          right: 10,
          outerBoundsMode: "same",
        },
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
          axisTick: {
            show: false,
          },
          data: xData,
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.6)",
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            barWidth: 30,
            label: {
              show: true,
              position: "top",
              color: "rgba(255, 255, 255, 0.8)",
            },
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: colors.map((color, index) => ({
                  offset: index,
                  color: color,
                })),
                global: false,
              },
            },
            data: data,
          },
        ],
      }}
    />
  );
}
