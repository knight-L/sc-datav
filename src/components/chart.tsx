import React, {
  type ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
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

export interface ChartProps {
  option: echarts.EChartsCoreOption;
  use: Parameters<typeof echarts.use>[0];
  notMerge?: boolean;
  lazyUpdate?: boolean;
  style?: React.CSSProperties;
  theme?: string | object | undefined;
}

const Chart: ForwardRefRenderFunction<echarts.EChartsType, ChartProps> = (
  props,
  ref
) => {
  const chartBox = useRef<HTMLDivElement>(null);
  const chart = useRef<echarts.EChartsType>(null!);
  const size = useSize(chartBox);

  echarts.use(props.use);

  useImperativeHandle(ref, () => chart.current, [chart]);

  useEffect(() => {
    chart.current = echarts.init(chartBox.current as HTMLElement);

    return () => {
      chart.current?.dispose();
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
    chart.current?.setOption(props.option, props.notMerge, props.lazyUpdate);
  }, [props.option, props.notMerge, props.lazyUpdate]);

  return <Wrapper ref={chartBox} style={props.style} />;
};

export default forwardRef(Chart);
