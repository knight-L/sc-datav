import { RadarChart, type RadarSeriesOption } from "echarts/charts";
import Chart from "@/components/chart";
import type { ComposeOption } from "echarts/core";
import {
  LegendComponent,
  TooltipComponent,
  type LegendComponentOption,
  type TooltipComponentOption,
} from "echarts/components";

type PieOption = ComposeOption<
  RadarSeriesOption | TooltipComponentOption | LegendComponentOption
>;

const data = [582, 421.2, 622.1, 625.3, 265, 224];
const indicator = [
  { name: "成都市", max: 1000 },
  { name: "德阳市", max: 1000 },
  { name: "绵阳市", max: 1000 },
  { name: "宜宾市", max: 1000 },
  { name: "达州市", max: 1000 },
];

export default function Chart5() {
  return (
    <Chart<PieOption>
      use={[RadarChart, TooltipComponent, LegendComponent]}
      option={{
        radar: {
          center: ["50%", "50%"],
          radius: "100%",
          axisName: {
            color: "#BCDCFF",
          },
          axisNameGap: 0,
          indicator: indicator,
          splitLine: {
            show: false,
          },
          splitArea: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        series: [
          {
            type: "radar",
            data: [data],
            label: {
              show: true,
              formatter: "{c}",
              color: "#bdcfff",
              align: "right",
              distance: 10,
            },
            symbolSize: [6, 6],
            lineStyle: {
              width: 0,
            },
            areaStyle: {
              color: "#bdcfff",
              opacity: 0.6,
            },
          },
          {
            type: "radar",
            data: [[1000, 1000, 1000, 1000, 1000, 1000]],
            symbol: "none",
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              color: "#4175F5",
            },
            areaStyle: {
              color: "#4175F5",
              opacity: 0.06,
            },
          },
          {
            type: "radar",
            data: [[900, 900, 900, 900, 900, 900]],
            symbol: "none",
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              color: "#2C72C8",
            },
            areaStyle: {
              color: "#2C72C8",
              opacity: 0.12,
            },
          },
          {
            type: "radar",
            data: [[800, 800, 800, 800, 800, 800]],
            symbol: "none",
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              color: "#3061DB",
            },
            areaStyle: {
              color: "#3061DB",
              opacity: 0.18,
            },
          },
          {
            type: "radar",
            data: [[700, 700, 700, 700, 700, 700]],
            symbol: "none",
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              color: "#3061DB",
            },
            areaStyle: {
              color: "#3061DB",
              opacity: 0.19,
            },
          },
          {
            type: "radar",
            data: [[600, 600, 600, 600, 600, 600]],
            symbol: "none",
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              color: "#3061DB",
            },
            areaStyle: {
              color: "#3061DB",
              opacity: 0.17,
            },
          },
          {
            type: "radar",
            data: [[500, 500, 500, 500, 500, 500]],
            symbol: "none",
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              color: "#3061DB",
            },
            areaStyle: {
              color: "#3061DB",
              opacity: 0.16,
            },
          },
          {
            type: "radar",
            data: [[400, 400, 400, 400, 400, 400]],
            symbol: "none",
            lineStyle: {
              width: 0,
            },
            itemStyle: {
              color: "#3061DB",
            },
            areaStyle: {
              color: "#3061DB",
              opacity: 0.13,
            },
          },
        ],
      }}
    />
  );
}
