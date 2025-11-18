import Chart from "@/components/chart";
import { RadarChart } from "echarts/charts";

const data = [582, 421.2, 622.1, 625.3, 265, 224];
const indicator = [
  {
    name: "套餐1",
    max: 1000,
  },
  {
    name: "套餐2",
    max: 1000,
  },
  {
    name: "套餐3",
    max: 1000,
  },
  {
    name: "套餐4",
    max: 1000,
  },
  {
    name: "套餐5",
    max: 1000,
  },
  {
    name: "套餐6",
    max: 1000,
  },
];

export default function Chart1() {
  return (
    <Chart
      use={[RadarChart]}
      option={{
        radar: {
          center: ["50%", "50%"],
          radius: "75%",
          axisName: {
            formatter: function (name: string) {
              return ["{a|" + name + "}"].join("\n");
            },
            rich: {
              //根据文字的组设置格式
              a: {
                color: "#BCDCFF",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "Source Han Sans CN",
              },
              // b:{
              //     fontSize:14,
              //     verticalAlign:'top',
              //     width:57,
              //     color:'#8E88FE',
              //     fontWeight:600,
              //     align:'center'
              // },
            },
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
            // name: '',
            type: "radar",
            data: [data],
            // value:14,
            label: {
              show: true,
              color: "#8E88FE",
              // position:[-20,-10,-10,-10],
              align: "right",
              distance: 10,
            },
            symbolSize: [6, 6],
            lineStyle: {
              //边缘颜色
              width: 0,
            },
            itemStyle: {
              borderWidth: 1,
              color: "#fff",
              borderColor: "#F2F063",
            },
            areaStyle: {
              color: "#7D77F1",
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
              color: "#4175F5",
            },

            areaStyle: {
              color: "#4175F5",
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
              color: "#4175F5",
            },

            areaStyle: {
              color: "#4175F5",
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
              color: "#4175F5",
            },

            areaStyle: {
              color: "#4175F5",
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
              color: "#4175F5",
            },

            areaStyle: {
              color: "#4175F5",
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
              color: "#4175F5",
            },

            areaStyle: {
              color: "#4175F5",
              opacity: 0.13,
            },
          },
        ],
      }}
    />
  );
}
