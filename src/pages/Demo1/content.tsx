import { useEffect } from "react";
import styled from "styled-components";
import useMoveTo from "@/hooks/useMoveTo";
import AutoFit from "@/components/autoFit";

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

const Title = styled.div`
  font-size: 36px;
  letter-spacing: 8px;
  color: #fff;
  text-shadow: 0 8px 10px rgba(255, 145, 0, 0.8);
  font-weight: 700;
  background: linear-gradient(to bottom, #ea580c, #ff9100);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;

  &::after {
    content: "SICHUAN SMART BRAIN";
    display: block;
    font-size: 12px;
    letter-spacing: 12px;
    text-align: center;
    color: rgba(255, 145, 0, 0.6);
    margin-top: -5px;
    -webkit-text-fill-color: rgba(255, 145, 0, 0.6);
  }
`;

const TitleWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -2 1920 84'><path d='M0,0 L1920,0 L1920,60 L1300,60 L1250,80 L670,80 L620,60 L0,60 Z' fill='rgb(255, 245, 232)' stroke='rgb(234, 88, 12)' stroke-width='1'/></svg>");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: bottom;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
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

const BottomBox = styled.div`
  position: absolute;
  pointer-events: auto;
  bottom: 20px;
  left: 50%;
  display: flex;
  gap: 20px;
`;

const Github = styled.a.attrs({
  children: (
    <svg width="1em" height="1em" viewBox="0 0 22 22" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-262.000000, -2480.000000)" fill="#000000">
          <g transform="translate(252.000000, 2470.000000)">
            <path d="M29.9006449,27.904446 C28.5016932,29.8668872 26.6944882,31.2248797 24.4790301,31.9784237 C24.2211218,32.0272886 24.0325745,31.9931534 23.9133882,31.876018 C23.7942019,31.7588827 23.7346171,31.6119968 23.7346338,31.4353603 L23.7346338,28.3376019 C23.7346338,27.3880159 23.4865017,26.6930482 22.9902375,26.2526987 C23.5347812,26.1938141 24.024319,26.1058042 24.458851,25.9886688 C24.893383,25.8715335 25.3422785,25.680801 25.8055376,25.4164714 C26.2687966,25.1521418 26.6556591,24.8267354 26.9661251,24.4402521 C27.276591,24.0537688 27.5296112,23.5398222 27.7251857,22.8984123 C27.9207602,22.2570024 28.0185475,21.5203805 28.0185475,20.6885464 C28.0185475,19.504056 27.6414612,18.4959023 26.8872886,17.6640854 C27.240536,16.7733669 27.2023419,15.7752328 26.7727063,14.6696833 C26.5050218,14.5813565 26.1181593,14.6352226 25.6121189,14.8312818 C25.1060784,15.0273409 24.6669591,15.2428141 24.2947609,15.4777015 L23.7502256,15.8300324 C22.8622108,15.5757225 21.9454689,15.4485675 21,15.4485675 C20.0545311,15.4485675 19.1377892,15.5757225 18.2497744,15.8300324 C18.0969813,15.7223001 17.8940788,15.5901353 17.641067,15.433538 C17.3880551,15.2769408 16.9892689,15.0884007 16.4447085,14.8679176 C15.9001481,14.6474346 15.4894467,14.5813479 15.2126043,14.6696576 C14.7921266,15.7758408 14.7588206,16.7739749 15.1126863,17.6640597 C14.3585137,18.4958938 13.9814275,19.5040475 13.9814275,20.6885208 C13.9814275,21.5203548 14.0792147,22.2544676 14.2747892,22.8908591 C14.4703637,23.5272505 14.720944,24.0411971 15.0265302,24.4326988 C15.3321164,24.8242005 15.7165391,25.1521076 16.1797981,25.41642 C16.6430571,25.6807325 17.0919527,25.871465 17.5264847,25.9886174 C17.9610167,26.1057699 18.4505545,26.1937799 18.9950982,26.2526473 C18.6131238,26.60467 18.3790461,27.1085884 18.292865,27.7644025 C18.0924107,27.8621152 17.8775846,27.935404 17.6483866,27.984269 C17.4191886,28.0331339 17.1469167,28.0575663 16.831571,28.0575663 C16.5162253,28.0575663 16.203612,27.9523346 15.8937309,27.7418712 C15.5838499,27.5314078 15.3189144,27.225424 15.0989244,26.8239198 C14.9174043,26.5107253 14.6857747,26.2564154 14.4040358,26.0609899 C14.1222969,25.8655645 13.8860801,25.7481209 13.6953854,25.708659 L13.4084408,25.6644956 C13.2079866,25.6644956 13.069557,25.6864188 12.9931521,25.7302654 C12.9167472,25.7741119 12.8929083,25.8304873 12.9216353,25.8993914 C12.9503623,25.9682956 12.9934529,26.0368829 13.050907,26.1051533 C13.1083611,26.1734238 13.1703941,26.2319915 13.2370061,26.2808564 L13.336924,26.3541538 C13.5471712,26.4518665 13.7549701,26.6378974 13.9603209,26.9122466 C14.1656716,27.1865958 14.3160164,27.4362043 14.4113555,27.661072 L14.554364,27.9983735 C14.67843,28.3704354 14.8886689,28.6714094 15.1850804,28.9012955 C15.481492,29.1311815 15.8014334,29.2780674 16.1449045,29.3419532 C16.4883756,29.405839 16.8202406,29.4399742 17.1404995,29.4443589 C17.4607584,29.4487435 17.7256939,29.4315218 17.935306,29.3926936 L18.2644137,29.3335008 C18.2644137,29.7055627 18.2668619,30.1412107 18.2717584,30.6404447 C18.2766548,31.1396787 18.279103,31.4040083 18.279103,31.4334334 C18.279103,31.6094533 18.21707,31.7563392 18.093004,31.8740912 C17.9689379,31.9918431 17.7779507,32.0259784 17.5200424,31.9764969 C15.3045843,31.22297 13.4973793,29.8649774 12.0984276,27.9025191 C10.6994759,25.9400608 10,23.7305118 10,21.2738721 C10,19.2281225 10.4916769,17.3417791 11.4750308,15.6148418 C12.4583846,13.8879045 13.7928551,12.5202092 15.4784422,11.5117558 C17.1640293,10.5033024 19.0045486,9.99938397 21,10.0000006 C22.9954514,10.0006172 24.8359707,10.5045356 26.5215578,11.5117558 C28.2071449,12.518976 29.5416154,13.8866713 30.5249692,15.6148418 C31.5083231,17.3430123 32,19.2293557 32,21.2738721 C31.9990725,23.7324558 31.2995966,25.9420048 29.9006449,27.904446 Z"></path>
          </g>
        </g>
      </g>
    </svg>
  ),
})`
  position: absolute;
  right: 32px;
  top: 12px;
  width: 36px;
  height: 36px;
  font-size: 36px;
  pointer-events: auto;
`;

export default function Content() {
  const topBox = useMoveTo("toBottom", 0.6, 1);
  const leftBox = useMoveTo("toRight", 0.8, 1.5);
  const leftBox1 = useMoveTo("toRight", 0.8, 1.6);
  const leftBox2 = useMoveTo("toRight", 0.8, 1.7);
  const rightBox = useMoveTo("toLeft", 0.8, 1.5);
  const rightBox1 = useMoveTo("toLeft", 0.8, 1.6);
  const rightBox2 = useMoveTo("toLeft", 0.8, 1.7);
  const bottomBox = useMoveTo("toTop", 0.8, 1.5, "translateX(-50%)");

  useEffect(() => {
    bottomBox.restart(true);
    topBox.restart(true);
    leftBox.restart(true);
    leftBox1.restart(true);
    rightBox.restart(true);
    rightBox1.restart(true);
  }, []);

  return (
    <AutoFit>
      <TitleWrapper ref={topBox.ref}>
        <Title>四川省智慧城市数据大脑</Title>
        <Github href="https://github.com/knight-L/datav" target="_blank" />
      </TitleWrapper>
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

        <BottomBox ref={bottomBox.ref}></BottomBox>
      </GridWrapper>
    </AutoFit>
  );
}
