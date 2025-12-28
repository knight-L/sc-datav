import Chart from "@/components/chart";
import { BarChart, PictorialBarChart } from "echarts/charts";
import styled from "styled-components";
import NumberAnimation from "@/components/numberAnimation";
import { PieChart, type PieSeriesOption } from "echarts/charts";
import type { ComposeOption } from "echarts/core";
import {
  GraphicComponent,
  TooltipComponent,
  type LegendComponentOption,
  type TooltipComponentOption,
} from "echarts/components";
import { LegacyGridContainLabel } from "echarts/features";

type PieOption = ComposeOption<
  PieSeriesOption | TooltipComponentOption | LegendComponentOption
>;

const color = ["#bdcfff", "#b693e2", "#91cfd4", "#3061DB"];

const trafficWay = [
  { name: "第一季度", value: 20 },
  { name: "第二季度", value: 10 },
  { name: "第三季度", value: 30 },
  { name: "第四季度", value: 40 },
];

const data = trafficWay.reduce<PieSeriesOption["data"]>((pre, cur, i) => {
  pre?.push(
    {
      value: cur.value,
      name: cur.name,
      itemStyle: {
        borderRadius: 10,
        shadowBlur: 10,
        color: color[i],
        shadowColor: color[i],
      },
    },
    {
      value: 2,
      name: "",
      label: {
        show: false,
      },
      itemStyle: {
        color: "rgba(0, 0, 0, 0)",
        borderColor: "rgba(0, 0, 0, 0)",
        borderWidth: 0,
      },
    }
  );
  return pre;
}, []);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  grid-template-rows: 24px repeat(2, minmax(0, 3fr));
`;

const Statistics = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatisticsTitle = styled.div`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
`;

const StatisticsNumber = styled(NumberAnimation)`
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 28px;
  font-weight: 600;
  color: #3061db;

  &::after {
    content: "亿千瓦时";
    display: inline-block;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: normal;
  }
`;

const list = [
  { name: "累计增长率", value: 36 },
  { name: "同比增长率", value: 25 },
];
let yName = list.map((item) => item.name);
let xData = list.map((item) => item.value);
let barWidth = 14;

export default function Chart1() {
  return (
    <Wrapper>
      <Statistics>
        <StatisticsTitle>总发电量</StatisticsTitle>
        <StatisticsNumber
          value={16608}
          options={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
        />
      </Statistics>
      <Chart
        use={[PictorialBarChart, BarChart, LegacyGridContainLabel]}
        option={{
          xAxis: {
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
          },
          grid: {
            containLabel: true,
            left: 0,
            top: 0,
            right: 50,
            bottom: 0,
          },
          yAxis: {
            inverse: true,
            position: "right",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              margin: 10,
              fontSize: 14,
              color: "#fff",
            },
            data: yName,
          },
          series: [
            {
              type: "bar",
              barWidth,
              legendHoverLink: false,
              symbolRepeat: true,
              silent: true,
              itemStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [
                    { offset: 0, color: "#000000" },
                    { offset: 1, color: "#3061DB" },
                  ],
                },
              },
              data: list,
              z: 1,
              animationEasing: "elasticOut",
            },
            {
              type: "pictorialBar",
              animationDuration: 0,
              symbolRepeat: "fixed",
              symbolMargin: "20%",
              symbol: "rect",
              symbolSize: [14, barWidth],
              itemStyle: {
                color: "#83848d",
              },
              label: {
                show: true,
                position: "right",
                offset: [0, 2],
                distance: 100,
                color: "#3061DB",
                fontSize: 14,
                formatter: `{c}%`,
              },
              data: xData,
              z: 0,
              animationEasing: "elasticOut",
            },
            {
              type: "pictorialBar",
              itemStyle: {
                color: "#000",
              },
              symbolRepeat: "fixed",
              symbolMargin: 8,
              symbol: "roundRect",
              symbolClip: true,
              symbolSize: [2, barWidth],
              symbolPosition: "start",
              symbolOffset: [0, 0],
              data: list,
              z: 2,
              animationEasing: "elasticOut",
            },
          ],
        }}
      />
      <Chart<PieOption>
        use={[PieChart, TooltipComponent, GraphicComponent]}
        option={{
          color: color[0],
          tooltip: {
            show: false,
          },
          graphic: {
            elements: [
              {
                type: "image",
                style: {
                  image:
                    "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTAgMGgxMDI0djEwMjRIMFYweiIgZmlsbD0iI0ZGRiIgZmlsbC1vcGFjaXR5PSIuMDEiLz48cGF0aCBkPSJNMTkyIDIzMC43ODRMNTQ0LjE5MiAxMjggODk2IDIzMC43ODR2MjEwLjc1MmE1MTQuNjI0IDUxNC42MjQgMCAwIDEtMzUyIDQ4OC4yNTYgNTE0LjY4OCA1MTQuNjg4IDAgMCAxLTM1Mi00ODguMzJWMjMwLjc4NHoiIGZpbGw9IiNiZGNmZmYiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTE1Ljc1NzUzYTgxM2xOelgxIiBjbGFzcz0ic2VsZWN0ZWQiLz48cGF0aCBkPSJNMTI4IDQ0MS40NzJWMjMwLjc4NHEwLTUuMTIuODMyLTEwLjI0dDIuNDMyLTkuOTg0cTEuNjY0LTQuOTI4IDQuMDMyLTkuNDcyIDIuNDMyLTQuNjA4IDUuNTA0LTguNzA0IDMuMDcyLTQuMTYgNi43ODQtNy42OCAzLjcxMi0zLjU4NCA4LTYuNTI4IDQuMjI0LTIuOTQ0IDguODk2LTUuMTIgNC42MDgtMi4yNCA5LjYtMy43MTJMNTI2LjIwOCA2Ni41NnExNy45Mi01LjI0OCAzNS45MDQgMEw5MTMuOTIgMTY5LjM0NHE0Ljk5MiAxLjQ3MiA5LjYgMy42NDggNC42NzIgMi4yNCA4Ljk2IDUuMTIgNC4yMjQgMy4wMDggNy45MzYgNi41OTIgMy43MTIgMy41ODQgNi43ODQgNy42OCAzLjA3MiA0LjE2IDUuNTA0IDguNzA0IDIuMzY4IDQuNTQ0IDQuMDMyIDkuNDcyIDEuNiA0Ljg2NCAyLjQzMiA5Ljk4NC44MzIgNS4xMi44MzIgMTAuMjR2MjEwLjc1MnEwIDE4Ni44OC0xMDkuMjQ4IDMzOC4zNjgtMTA5LjI0OCAxNTEuNTUyLTI4Ni40NjQgMjEwLjU2LTkuODU2IDMuMzI4LTIwLjIyNCAzLjMyOHQtMjAuMjI0LTMuMjY0cS0xNzcuMjgtNTkuMDcyLTI4Ni41OTItMjEwLjYyNFExMjggNjI4LjI4OCAxMjggNDQxLjQ3MnptMTI4IDBxMCAxNDUuNTM2IDg1LjEyIDI2My41NTIgODUuMTIgMTE4LjA4IDIyMy4xNjggMTY0LjAzMmwtMjAuMjI0IDYwLjczNi0yMC4yMjQtNjAuNzM2cTEzNy45ODQtNDUuOTUyIDIyMy4xMDQtMTYzLjk2OFE4MzIgNTg3LjAwOCA4MzIgNDQxLjUzNlYyMzAuNzg0aDY0bC0xNy45MiA2MS40NEw1MjYuMjA4IDE4OS40NGwxNy45Mi02MS40NCAxNy45MiA2MS40NEwyMDkuOTIgMjkyLjIyNCAxOTIgMjMwLjc4NGg2NHYyMTAuNjg4eiIgZmlsbD0iI2JkY2ZmZiIgZGF0YS1zcG0tYW5jaG9yLWlkPSJhMzEzeC5zZWFyY2hfaW5kZXguMC5pMTQuNzU3NTNhODEzbE56WDEiLz48cGF0aCBkPSJNNDgzLjUyIDM1Ny41NjhoMTc2TDU1MiA0OTQuNTI4aDE0Ni42MjRMNDY0IDc0OC42NzJsNDguODk2LTE4NS43OTJoLTEzNi45Nkw0ODMuNTIgMzU3LjUwNHoiIGZpbGw9IiNGRkYiLz48L3N2Zz4=",
                  width: 36,
                  height: 36,
                },
                left: "center",
                top: "center",
              },
            ],
          },
          series: {
            name: "",
            type: "pie",
            center: ["50%", "50%"],
            radius: [35, 45],
            label: {
              alignTo: "edge",
              formatter: "{name|{b}}\n{val|{c} %}",
              minMargin: 5,
              edgeDistance: 10,
              lineHeight: 15,
              color: "rgba(255,255,255,0.8)",
              rich: {
                val: {
                  fontSize: 10,
                  color: "#999",
                },
              },
            },
            labelLine: {
              length: 15,
              length2: 0,
              maxSurfaceAngle: 80,
            },
            data: data,
          },
        }}
      />
    </Wrapper>
  );
}
