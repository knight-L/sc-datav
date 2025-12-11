import { Fragment, useMemo } from "react";
import { Billboard, Line, Text, useTexture } from "@react-three/drei";
import {
  Box2,
  DoubleSide,
  RepeatWrapping,
  Shape,
  Vector2,
  Vector3,
} from "three";
import { useMapStyleStore } from "./stores";
import ShapeBox from "./shape";
import type { GeoProjection } from "d3-geo";
import type { CityGeoJSON } from "../../types/map";

import scMapData from "@/assets/sc.json";
import textureMap from "@/assets/sc_map.png";
import scNormalMap from "@/assets/sc_normal_map.png";
import scDisplacementMap from "@/assets/sc_displacement_map.png";

const data = scMapData as CityGeoJSON;

export default function BaseMap({ projection }: { projection: GeoProjection }) {
  const newStyle = useMapStyleStore((s) => s.newStyle);
  const [texture1, texture2, texture3] = useTexture(
    [textureMap, scNormalMap, scDisplacementMap],
    (tex) =>
      tex.forEach((el) => {
        el.wrapS = el.wrapT = RepeatWrapping;
      })
  );

  const { regions, bbox } = useMemo(() => {
    const regions: {
      name: string;
      center: Vector3;
      points: Vector2[][];
    }[] = [];
    const bbox = new Box2();

    const toV2 = (coord: number[]) => {
      const [x, y] = projection(coord as [number, number])!;
      const projected = new Vector2(x, -y);
      bbox.expandByPoint(projected);
      return projected;
    };

    data.features.forEach((feature) => {
      const [x, y] = projection(
        feature.properties.centroid ?? feature.properties.center
      )!;

      const points = feature.geometry.coordinates.reduce<Vector2[][]>(
        (pre, cur) => [
          ...pre,
          ...cur.map<Vector2[]>((coordinates) => coordinates.map(toV2)),
        ],
        []
      );

      regions.push({
        name: feature.properties.name,
        center: new Vector3(x, -y),
        points,
      });
    });

    return {
      regions,
      bbox,
    };
  }, [projection]);

  return newStyle ? (
    <group renderOrder={0} position={[0, 0, 0.51]}>
      {regions.map((reg, i) => (
        <Fragment key={`new` + i}>
          <ShapeBox bbox={bbox} args={[reg.points.map((e) => new Shape(e))]}>
            <meshStandardMaterial
              map={texture1}
              normalMap={texture2}
              displacementMap={texture3}
              metalness={0.2}
              roughness={0.5}
              side={DoubleSide}
            />
          </ShapeBox>

          <group position={[0, 0, 0.6]}>
            <Billboard position={reg.center}>
              <Text color="#ffffff" fontSize={0.3} fontWeight={600}>
                {reg.name}
              </Text>
            </Billboard>
          </group>
        </Fragment>
      ))}
    </group>
  ) : (
    <group renderOrder={0} position={[0, 0, 0.51]}>
      {regions.map((reg, i) => (
        <Fragment key={i}>
          <ShapeBox bbox={bbox} args={[reg.points.map((e) => new Shape(e))]}>
            <meshStandardMaterial
              map={texture1}
              normalMap={texture2}
              metalness={0.2}
              roughness={0.5}
              side={DoubleSide}
            />
          </ShapeBox>

          <Line
            position={[0, 0, 0.01]}
            points={reg.points[0]}
            linewidth={1}
            color="#a7a7a7"
          />

          <group position={[0, 0, 0.2]}>
            <Billboard position={reg.center}>
              <Text color="#ffffff" fontSize={0.3} fontWeight={600}>
                {reg.name}
              </Text>
            </Billboard>
          </group>
        </Fragment>
      ))}
    </group>
  );
}
