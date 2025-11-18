import { useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import * as d3 from "d3-geo";
import { gsap } from "gsap";
import type { CityGeoJSON } from "@/components/map";

import scMapData from "@/assets/sc.json";
import BaseMap from "./baseMap";
import OutLine from "./outline";
import FlyLine from "./flyLine";

const data = scMapData as CityGeoJSON;

export default function SCMap() {
  const camera = useThree((state) => state.camera);

  const projection = useMemo(() => {
    return d3
      .geoMercator()
      .center(data.features[0].properties.centroid)
      .scale(80)
      .translate([0, 0]);
  }, []);

  useEffect(() => {
    const tween = gsap.fromTo(
      camera.position,
      { x: 15, y: 5, z: 5 },
      { duration: 1.5, x: 10, y: 8, z: 0, ease: "sine.inOut" }
    );

    return () => {
      tween.kill();
    };
  }, [camera]);

  return (
    <group position={[0, 0.5, -1.5]} rotation={[Math.PI / 2, 0, Math.PI * 1.5]}>
      <BaseMap projection={projection} />

      <OutLine projection={projection} />
      <FlyLine projection={projection} />
    </group>
  );
}
