import { useLayoutEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { geoMercator } from "d3-geo";
import { gsap } from "gsap";
import type { CityGeoJSON } from "@/types/map";

import scMapData from "@/assets/sc.json";
import BaseMap from "./baseMap";
import OutLine from "./outline";
import FlyLine from "./flyLine";

const data = scMapData as CityGeoJSON;

export default function SCMap() {
  const camera = useThree((state) => state.camera);

  const projection = useMemo(() => {
    return geoMercator()
      .center(data.features[0].properties.centroid)
      .translate([0, 0]);
  }, []);

  useLayoutEffect(() => {
    const tween = gsap.fromTo(
      camera.position,
      { x: -50, y: 50, z: 150 },
      { x: 0, y: 80, z: 100, duration: 1.5, ease: "sine.inOut" }
    );

    return () => {
      tween.kill();
    };
  }, [camera]);

  return (
    <Center top>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.8}>
        <BaseMap projection={projection} />

        <OutLine projection={projection} />
        <FlyLine projection={projection} />
      </group>
    </Center>
  );
}
