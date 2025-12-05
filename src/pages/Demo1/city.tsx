import { useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
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
import InfoPoint from "./infoPoint";

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
    () =>
      data.points instanceof Array
        ? data.points.map((e) => new Shape(e))
        : new Shape(data.points),
    [data.points]
  );

  useFrame(() => {
    groupRef.current.scale.lerp(vector3.current.setZ(hovered ? 2 : 1), 0.1);
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
          metalness={0.2}
          roughness={0.5}
          side={DoubleSide}
        />
      </mesh>
      <lineSegments position={[0, 0.01, depth + 0.02]} raycast={() => {}}>
        <edgesGeometry args={[new ShapeGeometry(shape)]} />
        <lineBasicMaterial transparent color="#ffffff" />
      </lineSegments>
      <InfoPoint color="#ffffff" position={data.cityId} />
    </group>
  );
}
