import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  AdditiveBlending,
  QuadraticBezierCurve3,
  RepeatWrapping,
  Vector2,
  Vector3,
} from "three";

import flyLine from "@/assets/fly_line.png";

export interface FlyLineProps {
  data: {
    name: string;
    center: Vector3;
    points: Vector2[][];
  }[];
}

export default function FlyLine(props: FlyLineProps) {
  const { data } = props;
  const texture = useTexture(flyLine, (tex) => {
    tex.wrapS = tex.wrapT = RepeatWrapping;
    tex.repeat.set(0.5, 2);
  });

  const curve = useMemo(() => {
    const centerPoint = data[0].center;

    return data.map((el) => {
      let point = el.center;
      const center = new Vector3()
        .addVectors(centerPoint, point)
        .multiplyScalar(0.5)
        .setZ(5);
      return new QuadraticBezierCurve3(centerPoint, center, point);
    });
  }, []);

  useFrame((_, delta) => {
    texture.offset.x -= delta / 5;
  });

  return (
    <group renderOrder={10} position-z={1.1}>
      {curve.map((el, idx) => (
        <mesh key={idx}>
          <tubeGeometry args={[el, 32, 0.1, 2, false]} />
          <meshBasicMaterial
            transparent
            color={0x8fc2ff}
            fog={false}
            map={texture}
            opacity={0}
            depthTest={false}
            blending={AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}
