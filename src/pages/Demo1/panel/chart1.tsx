import { useRef } from "react";
import Chart from "@/components/chart";
import type { ComposeOption, EChartsType } from "echarts/core";
import {
  PictorialBarChart,
  type BarSeriesOption,
  type PictorialBarSeriesOption,
} from "echarts/charts";
import {
  DataZoomComponent,
  GridComponent,
  TimelineComponent,
  TooltipComponent,
  type DataZoomComponentOption,
  type GridComponentOption,
  type TimelineComponentOption,
  type TooltipComponentOption,
} from "echarts/components";
import { LabelLayout } from "echarts/features";

import cityData from "../cityData";

type BarOption = ComposeOption<
  | PictorialBarSeriesOption
  | BarSeriesOption
  | TooltipComponentOption
  | GridComponentOption
  | DataZoomComponentOption
  | TimelineComponentOption
>;

const colors = ["#fbdf88", "#ea580c"];

// const citys = Object.keys(cityData) as Array<keyof typeof cityData>;

// const data = Array.from({ length: 5 }, (_, k) => ({
//   name: citys[k],
//   value: cityData[citys[k]].population,
// }));

const data = Object.entries(cityData).reduce<
  {
    yAxis: { data: string[] };
    series: [
      { data: number[] },
      { data: { value: number; symbolPosition: "end" }[] }
    ];
  }[]
>((pre, cur, idx) => {
  // 每 5 个新建一组
  if (idx % 5 === 0) {
    pre.push({
      yAxis: { data: [] },
      series: [{ data: [] }, { data: [] }],
    });
  }

  const currentGroup = pre[pre.length - 1];

  currentGroup.yAxis.data.push(cur[0]);
  currentGroup.series[0].data.push(cur[1].population);
  currentGroup.series[1].data.push({
    value: cur[1].population,
    symbolPosition: "end",
  });

  return pre;
}, []);

export default function Chart1() {
  const chartRef = useRef<EChartsType>(null);

  //   useRafInterval(() => {
  //     if (chartRef.current) {
  //       chartRef.current?.setOption({
  //         xAxis: [
  //           {data: categories},
  //           {data: categories2},
  //         ],
  //         series: [
  //           {data: data},
  //           {data: data2},
  //         ],
  //       });
  //     }
  //   }, 2_000);

  console.log(data);

  return (
    <Chart<BarOption>
      ref={chartRef}
      use={[
        PictorialBarChart,
        GridComponent,
        TooltipComponent,
        LabelLayout,
        DataZoomComponent,
        TimelineComponent,
      ]}
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
          //   data: data.map((item) => item.name),
          type: "category",
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
        },
        // dataZoom: {
        //   type: "slider",
        //   show: false,
        //   realtime: true,
        //   startValue: 0,
        //   endValue: 8,
        // },
        timeline: {
          // show: false,
          axisType: "category",
          autoPlay: true,
          playInterval: 3000,
          data: ["1", "2", "3", "4", "5"],
        },
        series: [
          {
            type: "bar",
            // data: data.map((item) => item.value),
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
              color: "rgba(0, 0, 0,0.8)",
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
            name: "",
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
            // data: data.map((item) => ({
            //   value: item.value,
            //   symbolPosition: "end",
            // })),
          },
        ],
        animationDuration: 0,
        // animationDurationUpdate: 1000,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
        options: data,
      }}
    />
  );
}
