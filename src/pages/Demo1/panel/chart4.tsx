import Chart from "@/components/chart";
import { LineChart } from "echarts/charts";
import styled from "styled-components";
import NumberAnimation from "@/components/numberAnimation";

const colors = ["#fbdf88", "#ea580c"];
const data = [270, 400, 380, 420, 300, 410, 400, 330, 210, 290];

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: 2fr repeat(2, minmax(0, 1fr));
  gap: 16px;
`;

const Statistics = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StatisticsTitle = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
`;

const StatisticsNumber = styled(NumberAnimation)`
  display: flex;
  align-items: baseline;
  gap: 4px;
  font-size: 28px;
  font-weight: 600;
  color: #ea580c;

  &::after {
    content: "亿万元";
    display: inline-block;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: normal;
  }
`;

const Statistics1 = styled.div`
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
`;

const Statistics1Number = styled(NumberAnimation)`
  font-size: 20px;
  font-weight: 600;
  margin-left: 16px;
  color: #ea580c;
`;

const CompanyIcon = styled.svg.attrs({
  viewBox: "0 0 1024 1024",
  width: "1em",
  height: "1em",
  fill: colors[0],
  children: (
    <path d="M597.479619 154.063238V852.358095h52.150857V320.658286l169.252572 58.88a56.32 56.32 0 0 1 25.795047 42.959238l0.170667 4.388571V852.358095H902.095238V926.47619H121.904762v-74.093714h56.953905v-566.613333c0-19.456 10.166857-37.546667 26.843428-47.85981l304.444953-131.705904c38.034286-23.503238 87.332571 3.510857 87.332571 47.859809zM471.771429 482.816l-167.107048 68.266667v80.115809l167.107048-68.242286v-80.14019z m0-175.225905L304.664381 377.904762v80.530286l167.107048-70.339048v-80.457143z" />
  ),
})`
  vertical-align: middle;
  margin-right: 4px;
`;

export default function Charts4() {
  return (
    <Wrapper>
      <Chart
        use={[LineChart]}
        option={{
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            textStyle: {
              color: "rgba(0, 0, 0,0.8)",
            },
            backgroundColor: "rgba(255, 245, 232,0.8)",
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
          calculable: true,
          xAxis: {
            show: false,
            data: data,
            boundaryGap: false,
          },
          yAxis: {
            show: false,
            type: "value",
          },
          series: {
            name: "series1",
            type: "line",
            symbol: "none",
            itemStyle: {
              color: colors[0],
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: colors[0] },
                  { offset: 1, color: "rgba(255,255,255,0.1)" },
                ],
                global: false,
              },
            },
            data: data,
          },
        }}
      />
      <Statistics>
        <StatisticsTitle>收益总计</StatisticsTitle>
        <StatisticsNumber
          value={99608}
          options={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
        />
      </Statistics>
      {Array.from({ length: 4 }, (_, k) => (
        <Statistics1 key={k}>
          <CompanyIcon />
          企业数量
          <Statistics1Number
            value={7792}
            options={{ maximumFractionDigits: 0 }}
          />
        </Statistics1>
      ))}
    </Wrapper>
  );
}
