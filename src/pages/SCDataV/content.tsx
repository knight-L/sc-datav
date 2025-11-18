import { useControls } from "leva";
import { useRef } from "react";
import styled from "styled-components";
import useMoveTo from "@/hooks/useMoveTo";
import SeamVirtualScroll from "@/components/seamVirtualScroll";
import Chart1 from "./chart1";
import Chart2 from "./chart2";
import Chart3 from "./chart3";

import bg from "@/assets/card_bg.jpg";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: radial-gradient(transparent 60%, black);
  }
`;

const GridWrapper = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(4, minmax(0, 1fr));
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  color: #ffffff;
  pointer-events: auto;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(141, 141, 141, 0.2);
  border-radius: 4px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url(${bg});
    background-size: 100px;
    opacity: 0.2;
    border-radius: 0px;
    z-index: -1;
    z-index: -1;
  }
`;

const Title = styled.div`
  font-family: "pmzd";
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 36px;
  letter-spacing: 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #ffffff;
  padding-left: 20px;
`;

const CardTitle = styled.div`
  font-family: "pmzd";
  font-size: 28px;
  padding: 8px 16px;
`;

export default function Content() {
  const topBoxRef = useRef<HTMLDivElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const leftBoxRef1 = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);
  const rightBoxRef1 = useRef<HTMLDivElement>(null);

  // 显示主面板
  const { restart: topRestart, reverse: topReverse } = useMoveTo(
    topBoxRef,
    "toBottom",
    0.6,
    1
  );
  const { restart: leftRestart, reverse: leftReverse } = useMoveTo(
    leftBoxRef,
    "toRight",
    0.8,
    1.5
  );
  const { restart: rightRestart, reverse: rightReverse } = useMoveTo(
    rightBoxRef,
    "toLeft",
    0.8,
    1.5
  );
  const { restart: leftRestart1, reverse: leftReverse1 } = useMoveTo(
    leftBoxRef1,
    "toRight",
    0.8,
    1.5
  );
  const { restart: rightRestart1, reverse: rightReverse1 } = useMoveTo(
    rightBoxRef1,
    "toLeft",
    0.8,
    1.5
  );

  useControls({
    showMain: {
      label: "显示内容面板",
      value: true,
      onChange: (v: boolean) => {
        if (v) {
          topRestart();
          leftRestart();
          leftRestart1();
          rightRestart();
          rightRestart1();
        } else {
          topReverse();
          leftReverse();
          leftReverse1();
          rightReverse();
          rightReverse1();
        }
      },
    },
  });

  return (
    <Wrapper>
      <Card ref={topBoxRef}>
        <Title>四川省地图示例</Title>
      </Card>
      <GridWrapper>
        <Card ref={leftBoxRef} style={{ gridArea: "1 / 1 / 3 / 2" }}>
          <CardTitle>标题</CardTitle>
          <Chart1 />
        </Card>
        <Card ref={leftBoxRef1} style={{ gridArea: "3 / 1 / 5 / 2" }}>
          <CardTitle>标题</CardTitle>
          <Chart2 />
        </Card>
        <Card ref={rightBoxRef} style={{ gridArea: "1 / 4 / 3 / 5" }}>
          <CardTitle style={{ textAlign: "right" }}>标题</CardTitle>
          <Chart3 />
        </Card>
        <Card ref={rightBoxRef1} style={{ gridArea: "3 / 4 / 5 / 5" }}>
          <CardTitle style={{ textAlign: "right" }}>标题</CardTitle>
          <SeamVirtualScroll
            rowHeight={50}
            column={[
              { title: "设备名称", dataIndex: "value1" },
              { title: "告警时间", dataIndex: "value2" },
              { title: "状态", dataIndex: "value3" },
            ]}
            data={Array.from({ length: 100 }, (_, k) => ({
              value1: `设备${k + 1}`,
              value2: new Date().toLocaleTimeString(),
              value3:
                k % 2 === 0 ? (
                  <div style={{ color: "#7fe5a8" }}>运行中</div>
                ) : (
                  "未启动"
                ),
            }))}
          />
        </Card>
      </GridWrapper>
    </Wrapper>
  );
}
