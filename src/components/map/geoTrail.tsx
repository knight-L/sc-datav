import { useMemo, useRef } from "react";
import { Trail } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Color, Vector3, type Group } from "three";
import type { GeoProjection } from "d3-geo";
import type { CityGeoJSON } from "@/pages/SCDataV/map";

export interface GeoTrailProps {
  projection: GeoProjection;
  feature: CityGeoJSON["features"][0];
}

export default function GeoTrail(props: GeoTrailProps) {
  const { feature, projection } = props;
  const follower = useRef<Group>(null!);

  const t = useRef(0);

  const points = useMemo(() => {
    let v3Arr: Vector3[] = [];
    feature.geometry.coordinates[0].map((coord) => {
      v3Arr = coord.map((el) => {
        const [x, y] = projection(el as [number, number])!;
        return new Vector3(x, -y, 0);
      });
    });

    return v3Arr;
  }, [feature, projection]);

  useFrame(() => {
    if (!follower.current) return;

    t.current += 0.002; // 速度，越大越快
    const total = points.length;

    const idx = Math.floor(t.current * total) % total;
    const p = points[idx];

    // const lerpT = (t.current * total) % 1;
    // follower.current.position.lerp(p, lerpT);
    follower.current.position.set(p.x, p.y, p.z);
  });

  return (
    <group rotation={[0, 0, 0]}>
      <group position={[0, 0, 1.1]}>
        <Trail
          width={1}
          length={10}
          color={new Color(2, 10, 10)}
          attenuation={(t) => t * t}>
          <group ref={follower} position={points.at(-1)} />
          {/* <mesh ref={follower} position={points[0]}>
          <sphereGeometry args={[0.2]} />
          <meshBasicMaterial color={[2, 10, 10]} toneMapped={false} />
        </mesh> */}
        </Trail>
      </group>

      {/* <Line points={points} color={new Color(2, 10, 10)} lineWidth={1} /> */}
    </group>
  );
}
