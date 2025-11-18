import { useMemo } from "react";
import { Billboard, Line, Text, useTexture } from "@react-three/drei";
import * as THREE from "three";
import Shape from "./shape";
import type { GeoProjection } from "d3-geo";
import type { CityGeoJSON } from "@/components/map";

import scMapData from "@/assets/sc.json";
import textureMap from "@/assets/sc_map.png";
import scNormalMap from "@/assets/sc_normal_map.png";

const data = scMapData as CityGeoJSON;

export default function BaseMap({ projection }: { projection: GeoProjection }) {
  const [texture1, texture2] = useTexture([textureMap, scNormalMap], (tex) =>
    tex.forEach((el) => {
      el.wrapS = el.wrapT = THREE.RepeatWrapping;
      el.flipY = false;
    })
  );

  // 预计算所有投影点与全局包围盒
  const { citys, regions, bbox } = useMemo(() => {
    const citys: { name: string; center: THREE.Vector3 }[] = [];
    const regions: THREE.Vector2[][] = [];
    const bbox = new THREE.Box2();

    const toV2 = (coord: number[]) => {
      const [x = 0, y = 0] = projection(coord as [number, number]) ?? [];
      //   if (x < bbox.min.x) bbox.min.x = x;
      //   if (x > bbox.max.x) bbox.max.x = x;
      //   if (y < bbox.min.y) bbox.min.y = y;
      //   if (y > bbox.max.y) bbox.max.y = y;
      const projected = new THREE.Vector2(x, y);
      bbox.expandByPoint(projected);
      return projected;
    };

    data.features.forEach((feature) => {
      const [x, y] =
        projection(feature.properties.centroid ?? feature.properties.center) ??
        [];
      citys.push({
        name: feature.properties.name,
        center: new THREE.Vector3(x, y),
      });

      feature.geometry.coordinates.forEach((polygonSet) => {
        const rings = polygonSet.reduce<THREE.Vector2[]>((pre, coordinates) => {
          return [...pre, ...coordinates.map(toV2)];
        }, []);

        regions.push(rings);
      });
    });

    return {
      citys,
      regions,
      bbox,
    };
  }, [projection]);

  return (
    <group renderOrder={0} position={[0, 0, -0.01]}>
      {regions.map((reg, i) => (
        <group key={i}>
          <Shape
            bbox={bbox}
            args={[new THREE.Shape(reg)]}
            // onPointerOver={() => meshRef.current?.position.setZ(-0.3)}
            // onPointerOut={() => meshRef.current?.position.setZ(0)}
          >
            <meshStandardMaterial
              map={texture1}
              normalMap={texture2}
              metalness={0.2}
              roughness={0.5}
              side={THREE.DoubleSide}
            />
          </Shape>

          <Line
            position={[0, 0, -0.01]}
            points={reg}
            linewidth={1}
            color="#ffffff"
          />
        </group>
      ))}
      <group position={[0, 0, -0.1]}>
        {citys.map((item, index) => {
          return (
            <Billboard key={"city_" + index} position={item.center}>
              <Text color="#ffffff" fontSize={0.2}>
                {item.name}
              </Text>
            </Billboard>
          );
        })}
      </group>
    </group>
  );
}
