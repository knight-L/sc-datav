import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Grid,
  OrbitControls,
  Stage,
  Stats,
  useEnvironment,
} from "@react-three/drei";
import styled from "styled-components";
import { Color } from "three";
import {
  Bloom,
  EffectComposer,
  ToneMapping,
} from "@react-three/postprocessing";
import Model from "./model";

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

useEnvironment.preload({ files: "/sc-datav/hdr/venice_sunset_1k.hdr" });

export default function Demo2() {
  return (
    <Wrapper>
      <CanvasWrapper>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [-10, 5, 12], fov: 25 }}>
          <Suspense fallback={null}>
            <Stage
              intensity={0.5}
              shadows={{
                type: "accumulative",
                bias: -0.001,
                intensity: Math.PI,
              }}
              center={{ disableZ: true }}
              adjustCamera={false}>
              <Model />
            </Stage>
          </Suspense>

          <Grid
            infiniteGrid
            renderOrder={-1}
            position-y={-1.4}
            cellSize={0.6}
            cellThickness={0.6}
            sectionSize={3.3}
            sectionThickness={1.5}
            sectionColor={new Color(0.5, 0.5, 10)}
            fadeDistance={30}
          />

          <EffectComposer>
            <Bloom disableNormalPass luminanceThreshold={2} mipmapBlur />
            <ToneMapping />
          </EffectComposer>

          <Environment
            background
            blur={0.8}
            files="/sc-datav/hdr/venice_sunset_1k.hdr"
          />

          <OrbitControls
            autoRotate
            autoRotateSpeed={0.05}
            enableZoom={false}
            makeDefault
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </CanvasWrapper>
      <Stats />
    </Wrapper>
  );
}
