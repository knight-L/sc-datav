import { useMemo, useRef } from "react";
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
import Tooltip from "./tooltip";
import Bar from "./bar";
import Label from "./label";

import cityData from "../cityData";

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
  const tooltipRef = useRef<{ open: () => void; close: () => void }>(null!);
  const vector3 = useRef(new Vector3(1, 1, 1));

  const [shape, shapeGeometry] = useMemo(() => {
    const shapes = data.points.map((e) => new Shape(e));
    const shapeGeometry = new ShapeGeometry(shapes);
    return [shapes, shapeGeometry];
  }, [data.points]);

  useFrame(() => {
    groupRef.current.scale.lerp(vector3.current, 0.1);
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        vector3.current.setZ(1.5);
        tooltipRef.current.open();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        vector3.current.setZ(1);
        tooltipRef.current.close();
        document.body.style.cursor = "auto";
      }}>
      <ShapeMesh position-z={depth + 0.1} bbox={bbox} args={[shape]}>
        <meshStandardMaterial map={map} normalMap={normalMap} />
      </ShapeMesh>
      <mesh castShadow receiveShadow>
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
      <lineSegments position-z={depth + 0.2} raycast={() => null}>
        <edgesGeometry args={[shapeGeometry]} />
        <lineBasicMaterial transparent opacity={0} color="#ffffff" />
      </lineSegments>

      <Bar
        position={data.cityId}
        value={cityData[data.city as keyof typeof cityData]?.population ?? 0}>
        {(barHeight) => (
          <>
            <Label
              center
              position={[0, 0, barHeight + 0.2]}
              distanceFactor={100}
              zIndexRange={[100 - 1000]}>
              {data.city}
            </Label>
            <Tooltip
              ref={tooltipRef}
              data={{
                city: data.city,
                ...cityData[data.city as keyof typeof cityData],
              }}
              position={[0, 0, barHeight + 7]}
              visible={false}
            />
          </>
        )}
      </Bar>
    </group>
  );
}
