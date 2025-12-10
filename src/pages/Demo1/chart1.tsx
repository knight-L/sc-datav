import Chart from "@/components/chart";
import type { ComposeOption } from "echarts/core";
import {
  PictorialBarChart,
  type BarSeriesOption,
  type PictorialBarSeriesOption,
} from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  type GridComponentOption,
  type TooltipComponentOption,
} from "echarts/components";
import { LabelLayout } from "echarts/features";

import cityData from "./cityData";

type BarOption = ComposeOption<
  | PictorialBarSeriesOption
  | BarSeriesOption
  | TooltipComponentOption
  | GridComponentOption
>;

const colors = ["#fbdf88", "#ea580c"];

const citys = Object.keys(cityData);

const data = Array.from({ length: 5 }, (_, k) => ({
  name: citys[k],
  value: cityData[citys[k] as keyof typeof cityData].population,
}));

export default function Chart1() {
  return (
    <Chart<BarOption>
      use={[PictorialBarChart, GridComponent, TooltipComponent, LabelLayout]}
      option={{
        grid: {
          top: 0,
          bottom: 0,
          left: "8%",
          right: "12%",
        },
        xAxis: {
          show: false,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 14,
            margin: 16,
            inside: false,
            verticalAlign: "middle",
            color: "#000000",
            formatter: (v, i) => {
              return `{a|NO.${++i}} ${v}`;
            },
            rich: {
              a: {
                color: "rgba(0, 0, 0,0.6)",
              },
            },
          },
          data: data.map((item) => item.name),
          type: "category",
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
        },
        series: [
          {
            type: "bar",
            data: data.map((item) => item.value),
            realtimeSort: true,
            barWidth: 8,
            itemStyle: {
              borderRadius: 4,
              color: {
                type: "linear",
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: colors.map((color, index) => ({
                  offset: index,
                  color: color,
                })),
                global: false, // 缺省为 false
              },
            },
            showBackground: true,
            backgroundStyle: {
              borderRadius: 4,
            },
            label: {
              show: true,
              color: "#000000",
              valueAnimation: true,
              fontSize: 16,
              fontWeight: "bold",
            },
            labelLayout: (params) => {
              return {
                x: "100%",
                y: params.rect.y + params.rect.height / 2,
                verticalAlign: "middle",
                align: "right",
              };
            },
          },
          {
            name: "dot",
            type: "pictorialBar",
            symbol: "circle",
            symbolSize: 16,
            z: 12,
            itemStyle: {
              color: colors[0],
              shadowColor: colors[0],
              shadowBlur: 10,
            },
            // realtimeSort: true,
            data: data.map((item) => ({
              value: item.value,
              symbolPosition: "end",
            })),
          },
        ],
        animationDuration: 0,
        animationDurationUpdate: 1000,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
      }}
    />
  );
}
