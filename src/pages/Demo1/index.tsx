import styled from "styled-components";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { CityGeoJSON } from "@/pages/SCDataV/map";
import Content from "./content";
import Lights from "./lights";
import Base from "./base";

import scMapData from "@/assets/sc.json";
import scOutlineData from "@/assets/sc_outline.json";
import Sky from "./sky";
import Bottom from "./bottom";

const mapData = scMapData as CityGeoJSON,
  outlineData = scOutlineData as CityGeoJSON;

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
`;

export default function Map() {
  return (
    <Wrapper>
      <CanvasWrapper>
        <Canvas
          flat
          shadows
          camera={{ position: [0, 10, 20], fov: 50 }}
          dpr={[1, 2]}>
          <color attach="background" args={["#fff5e8"]} />
          <Lights />
          <Sky />

          <Base data={mapData} outlineData={outlineData} />

          <Bottom />

          <ContactShadows
            opacity={0.2}
            scale={20}
            blur={0.01}
            far={10}
            resolution={256}
            color="#000000"
            position={[0, -0.01, 0]}
          />

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
      <Content />
    </Wrapper>
  );
}
