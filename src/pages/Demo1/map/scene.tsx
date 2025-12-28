import { Suspense } from "react";
import Cloud from "./cloud";
import Base from "./base";
import Bottom from "./bottom";
import type { CityGeoJSON } from "@/types/map";

import scMapData from "@/assets/sc.json";
import scOutlineData from "@/assets/sc_outline.json";

const mapData = scMapData as CityGeoJSON,
  outlineData = scOutlineData as CityGeoJSON;

export default function Scene() {
  return (
    <Suspense fallback={null}>
      <Cloud />

      <Base data={mapData} outlineData={outlineData} />

      <Bottom />
    </Suspense>
  );
}
