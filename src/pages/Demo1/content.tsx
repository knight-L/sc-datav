import { useEffect } from "react";
import styled from "styled-components";
import useMoveTo from "@/hooks/useMoveTo";
import AutoFit from "@/components/autoFit";
import { useConfigStore } from "./stores";

import Headder from "./headder";
import Footer from "./footer";
import Chart1 from "./chart1";
import Chart2 from "./chart2";
import Chart3 from "./chart3";
import Chart4 from "./chart4";
import Chart5 from "./chart5";
import Chart6 from "./chart6";

const GridWrapper = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(6, minmax(0, 1fr));
  gap: 20px;
  padding: 20px;
`;

const Card = styled.div`
  position: relative;
  background: rgba(255, 245, 232, 0.65);
  border: 1px solid rgba(255, 145, 0, 0.3);
  position: relative;
  padding: 15px;
  backdrop-filter: blur(4px);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  z-index: 9999;

  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    width: 10px;
    height: 10px;
    border-top: 2px solid #ea580c;
    border-left: 2px solid #ea580c;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -1px;
    right: -1px;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #ea580c;
    border-right: 2px solid #ea580c;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  &:hover::before,
  &:hover::after {
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
`;

const CardTitle = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  padding-left: 10px;
  border-left: 4px solid #fdb961;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #5a4a42;

  span {
    font-size: 10px;
    color: rgba(0, 0, 0, 0.4);
    font-weight: normal;
  }
`;

export default function Content() {
  const topBox = useMoveTo("toBottom", 0.6);
  const leftBox = useMoveTo("toRight", 0.8, 0.5);
  const leftBox1 = useMoveTo("toRight", 0.8, 0.6);
  const leftBox2 = useMoveTo("toRight", 0.8, 0.7);
  const rightBox = useMoveTo("toLeft", 0.8, 0.5);
  const rightBox1 = useMoveTo("toLeft", 0.8, 0.6);
  const rightBox2 = useMoveTo("toLeft", 0.8, 0.7);
  const bottomBox = useMoveTo("toTop", 0.8, 0.5);

  useEffect(() => {
    const unMapPlaySub = useConfigStore.subscribe(
      (s) => s.mapPlayComplete,
      (v) => {
        if (v) {
          topBox.restart();
          bottomBox.restart();
          leftBox.restart();
          leftBox1.restart();
          leftBox2.restart();
          rightBox.restart();
          rightBox1.restart();
          rightBox2.restart();
        }
      }
    );

    const unModeSub = useConfigStore.subscribe(
      (s) => s.mode,
      (v) => {
        if (v) {
          topBox.restart();
          leftBox.restart();
          leftBox1.restart();
          leftBox2.restart();
          rightBox.restart();
          rightBox1.restart();
          rightBox2.restart();
        } else {
          topBox.reverse();
          leftBox.reverse();
          leftBox1.reverse();
          leftBox2.reverse();
          rightBox.reverse();
          rightBox1.reverse();
          rightBox2.reverse();
        }
      }
    );

    return () => {
      unMapPlaySub();
      unModeSub();
    };
  }, []);

  return (
    <AutoFit>
      <Headder ref={topBox.ref} />
      <GridWrapper>
        <Card ref={leftBox.ref} style={{ gridArea: "1 / 1 / 3 / 2" }}>
          <CardTitle>
            2025年规模指标分析<span>INDICATOR ANALYSIS</span>
          </CardTitle>
          <Chart1 />
        </Card>
        <Card ref={leftBox1.ref} style={{ gridArea: "3 / 1 / 5 / 2" }}>
          <CardTitle>
            企业税收分析<span>TAX ANALYSIS</span>
          </CardTitle>
          <Chart2 />
        </Card>
        <Card ref={leftBox2.ref} style={{ gridArea: "5 / 1 / 7 / 2" }}>
          <CardTitle>
            行政处罚信息<span>PENALTY INFORMATION</span>
          </CardTitle>
          <Chart3 />
        </Card>
        <Card ref={rightBox.ref} style={{ gridArea: "1 / 4 / 3 / 5" }}>
          <CardTitle>
            企业收益总数统计<span>REVENUE STATISTICS</span>
          </CardTitle>
          <Chart4 />
        </Card>
        <Card ref={rightBox1.ref} style={{ gridArea: "3 / 4 / 5 / 5" }}>
          <CardTitle>
            企业能耗分析<span>ENERGY CONSUMPTION ANALYSIS</span>
          </CardTitle>
          <Chart5 />
        </Card>
        <Card ref={rightBox2.ref} style={{ gridArea: "5 / 4 / 7 / 5" }}>
          <CardTitle>
            企业税收分析<span>TAX ANALYSIS</span>
          </CardTitle>
          <Chart6 />
        </Card>
      </GridWrapper>
      <Footer ref={bottomBox.ref} />
    </AutoFit>
  );
}
