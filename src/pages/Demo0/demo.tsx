import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls, Stars } from "@react-three/drei";
import styled from "styled-components";
import { folder, Leva, useControls } from "leva";
import { AmbientLight, PointLight } from "./map/lights";
import Panel from "./panel";
import SCMap from "./map";

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #26282a;
`;

const CanvasWrapper = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const LevaBox = styled.div`
  .leva-c-kWgxhW-bCBHqk-fill-false {
    right: 80px;
  }
`;

export default function Demo() {
  const controls = useControls({
    网格: folder({
      infiniteGrid: { label: "显示网格", value: true },
      cellColor: { label: "单元格颜色", value: "#6f6f6f" },
      sectionColor: { label: "分区颜色", value: "#7fe5a8" },
    }),
    GBackground: { label: "背景颜色", value: "#26282a" },
  });

  return (
    <>
      <LevaBox>
        <Leva collapsed />
      </LevaBox>

      <Wrapper>
        <CanvasWrapper>
          <Canvas camera={{ fov: 70 }} dpr={[1, 2]}>
            <color attach="background" args={[controls.GBackground]} />
            <Grid
              infiniteGrid={controls.infiniteGrid}
              scale={2}
              cellSize={0.3}
              cellThickness={0.6}
              sectionSize={1.5}
              sectionThickness={1.5}
              sectionColor={controls.sectionColor}
              cellColor={controls.cellColor}
              fadeDistance={30}
            />
            <AmbientLight />
            <PointLight />
            <Stars fade count={1000} factor={8} saturation={0} speed={2} />
            <SCMap />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              zoomSpeed={0.3}
              minDistance={10}
              maxDistance={20}
              maxPolarAngle={1.5}
            />
          </Canvas>
        </CanvasWrapper>

        <Panel />
      </Wrapper>
    </>
  );
}
