import { useLayoutEffect, useMemo, useRef } from "react";
import { Center, useTexture } from "@react-three/drei";
import {
  Box2,
  DoubleSide,
  LineSegments,
  Mesh,
  ShaderMaterial,
  Shape,
  ShapeGeometry,
  Vector2,
  Vector3,
  type Group,
} from "three";
import { geoMercator } from "d3-geo";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import ShiftMaterial from "./shaderMaterial";
import GeoTrail from "./geoTrail";
import type { CityGeoJSON } from "@/types/map";
import ShapeBox from "./shape";
import FlyLine from "./flyLine";
import Boundary from "./boundary";
import Label from "./label";
import { useConfigStore } from "../stores";

import scNormalMap from "@/assets/sc_normal_map1.png";
import Cones from "./cone";

export interface BaseProps {
  depth?: number;
  data: CityGeoJSON;
  outlineData?: CityGeoJSON;
}

export default function Base(props: BaseProps) {
  const { data, outlineData, depth = 1 } = props;
  const groupRef = useRef<Group>(null!);
  const camera = useThree((state) => state.camera);

  const projection = useMemo(() => {
    return geoMercator()
      .center(data.features[0].properties.centroid)
      .translate([0, 0]);
  }, [data]);

  const { regions, bbox, boundary } = useMemo(() => {
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

    let boundary: Shape[] = [];

    outlineData?.features.forEach((feature) => {
      const points = feature.geometry.coordinates.map<Shape>((cur) => {
        return new Shape(
          cur.reduce<Vector2[]>(
            (pre, coordinates) => [...pre, ...coordinates.map(toV2)],
            []
          )
        );
      });

      boundary = boundary.concat(points);
    });

    return {
      regions,
      bbox,
      boundary,
    };
  }, [projection]);

  useLayoutEffect(() => {
    if (!groupRef.current) return;
    const tl = gsap.timeline();

    tl.to(camera.position, {
      x: -2,
      y: 7,
      z: 10,
      duration: 2.5,
      // delay: 2,
      ease: "circ.out",
      onComplete: () => {
        useConfigStore.setState({ mapPlayComplete: true });
      },
    });
    tl.to(groupRef.current.position, { x: 0, y: 0, z: 0, duration: 1 }, 2.5);

    tl.to(
      groupRef.current.scale,
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        ease: "circ.out",
      },
      2.5
    );
    groupRef.current.traverse((obj) => {
      if (obj instanceof Mesh || obj instanceof LineSegments) {
        tl.to(obj.material, { opacity: 1, duration: 1, ease: "circ.out" }, 2.5);
      }
    });

    return () => {
      tl.kill();
    };
  }, [camera]);

  return (
    <Center top>
      <group
        castShadow
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0.2, 0]}>
        <group ref={groupRef} scale={[1, 1, 0]} position={[0, 0, -0.01]}>
          {regions.map((region, idx) => (
            <City
              key={region.name + idx}
              depth={depth}
              bbox={bbox}
              data={region}
            />
          ))}
          {outlineData && (
            <GeoTrail
              projection={projection}
              feature={outlineData.features[0]}
            />
          )}
          <Cones data={regions} />
          <FlyLine data={regions} />
          <Boundary data={boundary} />
        </group>
      </group>
    </Center>
  );
}

function City(props: {
  depth: number;
  bbox: Box2;
  data: {
    name: string;
    center: Vector3;
    points: Vector2[][];
  };
}) {
  const { bbox, data, depth } = props;
  const materialRef = useRef<ShaderMaterial>(null!);
  const groupRef = useRef<Group>(null!);
  const vector3 = useRef(new Vector3(1, 1, 1));
  const { camera } = useThree();

  const texture = useTexture(scNormalMap);

  const [shape, shapeGeometry] = useMemo(() => {
    const shapes = data.points.map((e) => new Shape(e));
    const shapeGeometry = new ShapeGeometry(shapes);
    return [shapes, shapeGeometry];
  }, [data.points]);

  useFrame((_, delta) => {
    groupRef.current.scale.lerp(vector3.current, 0.1);
    materialRef.current.uniforms.time.value += delta / 3;
  });

  return (
    <object3D
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        vector3.current.setZ(1.5);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        vector3.current.setZ(1);
        document.body.style.cursor = "auto";
      }}
      //   onClick={(e) => {
      //     e.stopPropagation();
      //     gsap.to(e.camera.position, {
      //       x: e.object.position.x,
      //       y: e.object.position.y,
      //       z: e.object.position.z,
      //       duration: 2,
      //     });
      //   }}
    >
      <ShapeBox bbox={bbox} args={[shape, { depth, bevelEnabled: false }]}>
        <meshStandardMaterial
          transparent
          attach="material-0"
          color="#293b41"
          normalMap={texture}
          metalness={0.5}
          roughness={0.7}
          side={DoubleSide}
          opacity={0}
        />
        <ShiftMaterial
          transparent
          attach="material-1"
          ref={materialRef}
          opacity={0}
          depth={depth}
        />
      </ShapeBox>
      <lineSegments position={[0, 0, depth + 0.05]} raycast={() => null}>
        <edgesGeometry args={[shapeGeometry]} />
        <lineBasicMaterial transparent color="#ffffff" opacity={0} />
      </lineSegments>
      <Label
        center
        position={[data.center.x, data.center.y, depth + 0.2]}
        distanceFactor={10}
        zIndexRange={[100 - 1000]}>
        {data.name}
      </Label>
    </object3D>
  );
}
