import { useEffect } from "react";
import styled from "styled-components";
import useMoveTo from "@/hooks/useMoveTo";
import AutoFit from "@/components/autoFit";
import { useConfigStore } from "../stores";

import Headder from "./headder";
import Chart6 from "./chart6";
import Chart2 from "./chart2";
import Chart4 from "./chart4";
import Chart1 from "./chart1";
import Chart5 from "./chart5";
import Chart3 from "./chart3";

const GridWrapper = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(6, minmax(0, 1fr));
  gap: 20px;
  padding: 20px;
`;

const CardContent = styled.div`
  position: absolute;
  top: 70px;
  right: 20px;
  left: 20px;
  bottom: 20px;
  pointer-events: auto;
`;

const Card = ({
  title,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { title: string }) => (
  <div {...props}>
    <svg
      width="100%"
      height="100%"
      fill="none"
      viewBox="0 0 260 180"
      preserveAspectRatio="none">
      <g filter="url(#a)">
        <path
          fill="#3061DB"
          fillRule="evenodd"
          d="M206 10 190 0H9L0 9v171h45l4.5-4h161l4.5 4h45V10h-54Zm53 1h-53.287l-16-10H9.414L1 9.414V179h43.62l4.5-4h161.76l4.5 4H259V11Z"
        />
      </g>

      <text x={12} y={18} fill="#E8EFFF" fontSize={12} letterSpacing={0}>
        {title}
      </text>
      <path
        stroke="rgba(186, 206, 255, 0.33)"
        strokeWidth={0.5}
        d="M12 28h236"
      />
      <path fill="#BDCFFF" d="M12 26h25v2H12zM246 26h2v2h-2z" />
      <path fill="#789eff" d="m51 178-2 2h162l-2-2H51ZM0 0v7l7-7H0Z" />
      <path stroke="#789eff" strokeWidth={2} d="M1 169v10h10M259 21V11h-10" />
      <defs>
        <filter
          id="a"
          width={260}
          height={180}
          x={0}
          y={0}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse">
          <feFlood floodOpacity={0} result="feFloodId_xbUKg8cwFgs1p1qtvymEx" />
          <feBlend
            in="SourceGraphic"
            in2="feFloodId_xbUKg8cwFgs1p1qtvymEx"
            result="shape_xbUKg8cwFgs1p1qtvymEx"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha_xbUKg8cwFgs1p1qtvymEx"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={6} />
          <feComposite
            in2="hardAlpha_xbUKg8cwFgs1p1qtvymEx"
            k2={-1}
            k3={1}
            operator="arithmetic"
          />
          <feColorMatrix values="0 0 0 0 0.1607843137254902 0 0 0 0 0.3843137254901961 0 0 0 0 0.9490196078431372 0 0 0 1 0" />
          <feBlend
            in2="shape_xbUKg8cwFgs1p1qtvymEx"
            result="innerShadow_0_xbUKg8cwFgs1p1qtvymEx"
          />
        </filter>
      </defs>
    </svg>
    <CardContent>{children}</CardContent>
  </div>
);

export default function Panel() {
  const topBox = useMoveTo("toBottom", 0.6);
  const leftBox = useMoveTo("toRight", 0.8, 0.5);
  const leftBox1 = useMoveTo("toRight", 0.8, 0.6);
  const leftBox2 = useMoveTo("toRight", 0.8, 0.7);
  const rightBox = useMoveTo("toLeft", 0.8, 0.5);
  const rightBox1 = useMoveTo("toLeft", 0.8, 0.6);
  const rightBox2 = useMoveTo("toLeft", 0.8, 0.7);

  useEffect(() => {
    const unMapPlaySub = useConfigStore.subscribe(
      (s) => s.mapPlayComplete,
      (v) => {
        if (v) {
          topBox.restart();
          leftBox.restart();
          leftBox1.restart();
          leftBox2.restart();
          rightBox.restart();
          rightBox1.restart();
          rightBox2.restart();
        }
      }
    );

    return () => {
      unMapPlaySub();
    };
  }, []);

  return (
    <AutoFit>
      <Headder ref={topBox.ref} />
      <GridWrapper>
        <div></div>
        <Card
          ref={leftBox.ref}
          style={{ gridArea: "1 / 1 / 3 / 2" }}
          title="发电汇总">
          <Chart1 />
        </Card>
        <Card
          ref={leftBox1.ref}
          style={{ gridArea: "3 / 1 / 5 / 2" }}
          title="用电量预测">
          <Chart2 />
        </Card>
        <Card
          ref={leftBox2.ref}
          style={{ gridArea: "5 / 1 / 7 / 2" }}
          title="上半年发电情况">
          <Chart3 />
        </Card>
        <Card
          ref={rightBox.ref}
          style={{ gridArea: "1 / 4 / 3 / 5" }}
          title="电网设备数量">
          <Chart4 />
        </Card>
        <Card
          ref={rightBox1.ref}
          style={{ gridArea: "3 / 4 / 5 / 5" }}
          title="用电大市TOP5">
          <Chart5 />
        </Card>
        <Card
          ref={rightBox2.ref}
          style={{ gridArea: "5 / 4 / 7 / 5" }}
          title="故障异常">
          <Chart6 />
        </Card>
      </GridWrapper>
    </AutoFit>
  );
}
