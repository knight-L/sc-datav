import { Suspense, useMemo, useRef } from "react";
import {
  OrbitControls,
  Text,
  Loader,
  Billboard,
  Stars,
  Stats,
  Center,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { geoMercator, type GeoProjection } from "d3-geo";
import {
  Group,
  ShaderMaterial,
  Shape,
  ShapeGeometry,
  Vector2,
  Vector3,
} from "three";
import ShiftMaterial from "./shaderMaterial";
import Bottom from "./bottom";
import Lights from "./lights";
import type { CityGeoJSON } from "@/pages/SCDataV/map";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import GeoTrail from "./geoTrail";

import scMapData from "@/assets/sc.json";
import scOutlineData from "@/assets/sc_outline.json";
const mapData = scMapData as CityGeoJSON,
  outlineData = scOutlineData as CityGeoJSON;

function City(props: {
  projection: GeoProjection;
  feature: CityGeoJSON["features"][0];
  depth: number;
}) {
  const { projection, feature, depth } = props;
  const materialRef = useRef<ShaderMaterial>(null!);
  const groupRef = useRef<Group>(null!);
  const vector3 = useRef(new Vector3(1, 1, 1));

  const [shapes, textPosition] = useMemo(() => {
    const shape: Shape[] = [];

    feature.geometry.coordinates.map((polygon) => {
      const rings = polygon.reduce<Vector2[]>((pre, coordinates) => {
        return [
          ...pre,
          ...coordinates.map((coord) => {
            const [x, y] = projection(coord as [number, number])!;
            return new Vector2(x, -y);
          }),
        ];
      }, []);

      shape.push(new Shape(rings));
    });

    const [x, y] = projection(
      feature.properties.centroid ?? feature.properties.center
    )!;

    return [shape, [x, -y, depth + 0.1] as [number, number, number]];
  }, [feature, projection, depth]);

  useFrame(() => {
    materialRef.current.uniforms.time.value += 0.005;
    groupRef.current.scale.lerp(vector3.current, 0.1);
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => (e.stopPropagation(), vector3.current.setZ(1.5))}
      onPointerOut={(e) => (e.stopPropagation(), vector3.current.setZ(1))}>
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[shapes, { depth, bevelEnabled: false }]} />
        <ShiftMaterial
          ref={materialRef}
          depthWrite
          transparent
          polygonOffset
          opacity={0.5}
          depth={depth}
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </mesh>
      <mesh renderOrder={1} position={[0, 0, depth + 0.01]}>
        <lineSegments>
          <edgesGeometry args={[new ShapeGeometry(shapes)]} />
          <lineBasicMaterial transparent color="#ffffff" />
        </lineSegments>
      </mesh>
      <Billboard position={textPosition}>
        <Text color="#ffffff" fontSize={0.2}>
          {feature.properties.name}
        </Text>
      </Billboard>
    </group>
  );
}

function Base(props: { depth?: number }) {
  const { depth = 1 } = props;
  const groupRef = useRef<Group>(null!);

  const projection = useMemo(() => {
    return geoMercator()
      .center(mapData.features[0].properties.centroid)
      .translate([0, 0]);
  }, []);

  return (
    <Center top>
      <group
        ref={groupRef}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.5}
        position={[0, 0, 0]}>
        {mapData.features.map((feature, idx) => (
          <City
            key={feature.properties.name + idx}
            depth={depth}
            projection={projection}
            feature={feature}
          />
        ))}
        <GeoTrail projection={projection} feature={outlineData.features[0]} />
      </group>
    </Center>
  );
}

export default function Map() {
  return (
    <>
      <Stats />
      <Canvas
        camera={{
          fov: 70,
          position: [0, 10, 10],
        }}
        dpr={[1, 2]}>
        <color attach="background" args={["#011024"]} />
        <fog args={["#011024", 1, 300]} />
        <Lights />
        <Suspense fallback={null}>
          <Base />
        </Suspense>
        <Bottom />
        <Stars saturation={0} count={400} speed={0.5} />
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
        </EffectComposer>
        <OrbitControls />
      </Canvas>
      <Loader />
    </>
  );
}
