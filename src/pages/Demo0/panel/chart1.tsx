import Chart from "@/components/chart";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";

const colors = ["#ACA891", "#6E918C"];
const data = Array.from({ length: 50 }, (_, k) => [
  "2025-06-" + `${k}`.padStart(2, "0"),
  Math.round(Math.random() * 1000),
]);
const dateList = data.map((item) => item[0]);
const valueList = data.map((item) => item[1]);

export default function Chart1() {
  return (
    <Chart
      use={[
        LineChart,
        TitleComponent,
        VisualMapComponent,
        TooltipComponent,
        GridComponent,
      ]}
      option={{
        visualMap: [
          {
            show: false,
            type: "continuous",
            seriesIndex: 0,
            min: 0,
            max: 400,
            color: colors,
          },
          {
            show: false,
            type: "continuous",
            seriesIndex: 1,
            dimension: 0,
            min: 0,
            color: colors,
            max: dateList.length - 1,
          },
        ],
        title: [
          {
            left: "center",
            text: "全省",
            textStyle: { color: "rgba(255, 255, 255, 0.6)" },
          },
          {
            top: "50%",
            left: "center",
            text: "成都市",
            textStyle: { color: "rgba(255, 255, 255, 0.6)" },
          },
        ],
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
        xAxis: [
          {
            axisLabel: {
              color: "rgba(255, 255, 255, 0.6)",
            },
            data: dateList,
          },
          {
            axisLabel: {
              color: "rgba(255, 255, 255, 0.6)",
            },
            data: dateList,
            gridIndex: 1,
          },
        ],
        yAxis: [
          {
            axisLabel: {
              color: "rgba(255, 255, 255, 0.6)",
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.1)",
              },
            },
          },
          {
            axisLabel: {
              color: "rgba(255, 255, 255, 0.6)",
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.1)",
              },
            },
            gridIndex: 1,
          },
        ],
        grid: [
          {
            outerBoundsMode: "same",
            top: "10%",
            left: 16,
            right: 16,
            bottom: "60%",
          },
          {
            outerBoundsMode: "same",
            top: "60%",
            left: 16,
            right: 16,
            bottom: 16,
          },
        ],
        series: [
          {
            type: "line",
            showSymbol: false,
            data: valueList,
          },
          {
            type: "line",
            showSymbol: false,
            data: valueList,
            xAxisIndex: 1,
            yAxisIndex: 1,
          },
        ],
      }}
    />
  );
}
