import { useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls, Sparkles } from "@react-three/drei";
import styled from "styled-components";
import autofit from "autofit.js";
import { folder, Leva, useControls } from "leva";
import { AmbientLight, PointLight } from "./lights";
import Content from "./content";
import SCMap from "./scMap";

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const CanvasWrapper = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

const scale = new Float32Array(
  Array.from({ length: 50 }, () => 0.5 + Math.random() * 30)
);

export default function SichuanMap() {
  const controls = useControls({
    网格: folder({
      infiniteGrid: { label: "显示网格", value: true },
      cellColor: { label: "单元格颜色", value: "#6f6f6f" },
      sectionColor: { label: "分区颜色", value: "#7fe5a8" },
    }),
    GBackground: { label: "背景颜色", value: "#26282a" },
  });

  useLayoutEffect(() => {
    autofit.init({ el: "#datav" });

    return () => {
      autofit.off();
    };
  }, []);

  return (
    <>
      <Leva collapsed />
      <Wrapper id="datav">
        <CanvasWrapper>
          <Canvas camera={{ fov: 60 }} dpr={[1, 2]}>
            <color attach="background" args={[controls.GBackground]} />
            <Grid
              renderOrder={-1}
              infiniteGrid={controls.infiniteGrid}
              cellSize={0.6}
              cellThickness={0.6}
              sectionSize={3.3}
              sectionThickness={1.5}
              sectionColor={controls.sectionColor}
              cellColor={controls.cellColor}
              fadeDistance={30}
            />
            <AmbientLight />
            <PointLight />
            <Sparkles
              count={scale.length}
              size={scale}
              position={[0, 2, 0]}
              scale={[20, 5, 20]}
              speed={0.5}
            />
            <SCMap />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              target={[0, 0, 0]}
              minDistance={10}
              maxDistance={20}
              maxPolarAngle={1.5}
            />
          </Canvas>
        </CanvasWrapper>
        <Content />
      </Wrapper>
    </>
  );
}
