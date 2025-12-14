import React, {
  type Ref,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import styled from "styled-components";
import useSize from "@/hooks/useSize";
import { useDebounceEffect } from "@/hooks/useDebounceEffect";

echarts.use(CanvasRenderer);

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export interface ChartProps<T> {
  ref?: Ref<echarts.EChartsType>;
  option: T;
  use: Parameters<typeof echarts.use>[0];
  style?: React.CSSProperties;
  theme?: string | object | undefined;
}

function Chart<T extends echarts.EChartsCoreOption>(props: ChartProps<T>) {
  const chartBox = useRef<HTMLDivElement>(null);
  const chart = useRef<echarts.EChartsType | null>(null);
  const size = useSize(chartBox);

  echarts.use(props.use);

  const memoOption = useMemo(() => props.option, [props.option]);

  useImperativeHandle(props.ref, () => chart.current!);

  useLayoutEffect(() => {
    chart.current = echarts.init(chartBox.current as HTMLElement);

    return () => {
      chart.current?.dispose();
      chart.current = null;
      chartBox.current = null;
    };
  }, []);

  useDebounceEffect(
    () => {
      if (size?.width !== 0 && size?.height !== 0) chart.current?.resize();
    },
    [size],
    300
  );

  useEffect(() => {
    if (!chart.current) return;

    chart.current.setOption(memoOption, {
      notMerge: false,
      lazyUpdate: true,
      replaceMerge: ["series"],
    });
  }, [memoOption]);

  return <Wrapper ref={chartBox} style={props.style} />;
}

export default Chart;
