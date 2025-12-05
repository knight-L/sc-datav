import styled from "styled-components";
import { OrbitControls, Stats, ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { CityGeoJSON } from "@/pages/SCDataV/map";
import Base from "./base";

import scMapData from "@/assets/sc.json";
import scOutlineData from "@/assets/sc_outline.json";

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
      <Stats />
      <CanvasWrapper>
        <Canvas
          flat
          shadows
          camera={{ position: [-5, 10, 10], fov: 50 }}
          dpr={[1, 2]}>
          <color attach="background" args={["#fff5e8"]} />
          <ambientLight intensity={2} />
          <pointLight
            intensity={3000}
            position={[-5, 20, 10]}
            distance={50}
            color="#fff5e8"
          />

          <Base data={mapData} outlineData={outlineData} />

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
            // autoRotate
            // autoRotateSpeed={0.05}
            // enableZoom={false}
            // makeDefault
            // minPolarAngle={Math.PI / 2}
            // maxPolarAngle={Math.PI / 2}
            zoomSpeed={0.3}
          />
        </Canvas>
      </CanvasWrapper>
    </Wrapper>
  );
}
