import { useMemo, useRef, useState } from "react";
import { useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  DoubleSide,
  Shape,
  ShapeGeometry,
  Vector3,
  type Box2,
  type Group,
  type MeshStandardMaterialProperties,
  type Vector2,
} from "three";
import ShapeMesh from "./shape";
import CityTooltip from "./cityTooltip";
import CityBar from "./cityBar";
import Label from "./label";

import cityData from "./cityData";

export interface CityProps
  extends Pick<MeshStandardMaterialProperties, "map" | "normalMap"> {
  bbox: Box2;
  depth: number;
  data: {
    city: string;
    cityId: [x: number, y: number, z: number];
    points: Vector2[][];
  };
}

export default function City(props: CityProps) {
  const { data, bbox, depth, map, normalMap } = props;
  const groupRef = useRef<Group>(null!);
  const vector3 = useRef(new Vector3(1, 1, 1));

  const [hovered, setHovered] = useState(false);

  const shape = useMemo(
    () => data.points.map((e) => new Shape(e)),
    [data.points]
  );

  useFrame(() => {
    groupRef.current.scale.lerp(vector3.current.setZ(hovered ? 1.5 : 1), 0.1);
  });

  useCursor(hovered);

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={() => setHovered(false)}>
      <ShapeMesh
        castShadow
        receiveShadow
        bbox={bbox}
        args={[shape]}
        position={[0, 0, depth + 0.01]}>
        <meshStandardMaterial map={map} normalMap={normalMap} />
      </ShapeMesh>
      <mesh>
        <extrudeGeometry
          args={[shape, { depth, steps: 1, bevelEnabled: false }]}
        />
        <meshStandardMaterial
          transparent
          opacity={0}
          metalness={0.2}
          roughness={0.5}
          side={DoubleSide}
          color="#f9f3e7"
        />
      </mesh>
      <lineSegments position={[0, 0.01, depth + 0.02]} raycast={() => null}>
        <edgesGeometry args={[new ShapeGeometry(shape)]} />
        <lineBasicMaterial transparent opacity={0} color="#ffffff" />
      </lineSegments>

      <CityBar
        position={data.cityId}
        value={cityData[data.city as keyof typeof cityData]?.population ?? 0}>
        {(barHeight) => (
          <>
            <Label
              center
              position={[0, 0, barHeight + 0.2]}
              distanceFactor={10}
              zIndexRange={[100 - 1000]}>
              {data.city}
            </Label>
            <CityTooltip
              data={{
                city: data.city,
                ...cityData[data.city as keyof typeof cityData],
              }}
              position={[0, 0, barHeight + 2]}
              visible={hovered}
            />
          </>
        )}
      </CityBar>
    </group>
  );
}
