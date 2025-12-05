import { useMemo, useRef } from "react";
import { Center, useTexture } from "@react-three/drei";
import { Box2, RepeatWrapping, Vector2, type Group } from "three";
import { geoMercator } from "d3-geo";
import type { CityGeoJSON } from "@/pages/SCDataV/map";
import City, { type CityProps } from "./city";

import map from "@/assets/sc_map.png";
import normalMap from "@/assets/sc_normal_map.png";

export interface BaseProps {
  depth?: number;
  data: CityGeoJSON;
  outlineData?: CityGeoJSON;
}

export default function Base(props: BaseProps) {
  const { data, depth = 1 } = props;
  const groupRef = useRef<Group>(null!);

  const [texture1, texture2] = useTexture([map, normalMap], (tex) =>
    tex.forEach((el) => {
      el.wrapS = el.wrapT = RepeatWrapping;
    })
  );

  const projection = useMemo(() => {
    return geoMercator()
      .center(data.features[0].properties.centroid)
      .translate([0, 0]);
  }, [data]);

  const { regions, bbox } = useMemo(() => {
    const regions: CityProps["data"][] = [];
    const bbox = new Box2();

    const toV2 = (coord: number[]) => {
      const [x, y] = projection(coord as [number, number])!;
      const projected = new Vector2(x, -y);
      bbox.expandByPoint(projected);
      return projected;
    };

    data.features.forEach((feature) => {
      const points = feature.geometry.coordinates.reduce<Vector2[][]>(
        (pre, cur) => [
          ...pre,
          ...cur.map<Vector2[]>((coordinates) => coordinates.map(toV2)),
        ],
        []
      );

      const [x, y] = projection(
        feature.properties.centroid ?? feature.properties.center
      )!;

      regions.push({
        city: feature.properties.name,
        cityId: [x, -y, 1.1],
        points,
      });
    });

    return {
      regions,
      bbox,
    };
  }, [projection, data]);

  return (
    <Center top>
      <group
        ref={groupRef}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.4}
        position={[0, 0, 0]}>
        {regions.map((region, idx) => (
          <City
            key={idx}
            depth={depth}
            bbox={bbox}
            data={region}
            map={texture1}
            normalMap={texture2}
          />
        ))}
      </group>
    </Center>
  );
}
