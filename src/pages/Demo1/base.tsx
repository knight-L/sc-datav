import { use, useLayoutEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import { gsap } from "gsap";
import {
  Box2,
  LineSegments,
  Mesh,
  RepeatWrapping,
  Vector2,
  type Group,
} from "three";
import { geoMercator } from "d3-geo";
import type { CityGeoJSON } from "@/types/map";
import City, { type CityProps } from "./city";
import loadTexture from "./helpers/loadTexture";

import map from "@/assets/sc_map.png";
import normalMap from "@/assets/sc_normal_map.png";

export interface BaseProps {
  depth?: number;
  data: CityGeoJSON;
  outlineData?: CityGeoJSON;
}

const textures = Promise.all([
  loadTexture(map, (tex) => {
    tex.wrapS = tex.wrapT = RepeatWrapping;
  }),
  loadTexture(normalMap, (tex) => {
    tex.wrapS = tex.wrapT = RepeatWrapping;
  }),
]);

export default function Base(props: BaseProps) {
  const { data, depth = 1 } = props;
  const groupRef = useRef<Group>(null!);
  const camera = useThree((state) => state.camera);

  const [texture1, texture2] = use(textures);

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

  useLayoutEffect(() => {
    if (!groupRef.current) return;
    const tl = gsap.timeline({
      paused: true,
    });

    tl.add(
      gsap.to(camera.position, {
        x: 5,
        y: 10,
        z: 10,
        duration: 2.5,
        ease: "circ.out",
      })
    );
    tl.add(
      tl.to(
        groupRef.current.scale,
        { x: 0.5, y: 0.5, z: 0.5, duration: 1, ease: "circ.out" },
        2.5
      )
    );
    groupRef.current.traverse((obj) => {
      if (obj instanceof Mesh || obj instanceof LineSegments) {
        tl.add(
          tl.to(
            obj.material,
            { opacity: 1, duration: 1, ease: "circ.out" },
            2.5
          ),
          3
        );
      }
    });

    tl.play();

    return () => {
      tl.kill();
    };
  }, [camera]);

  return (
    <Center top>
      <group
        ref={groupRef}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.5, 0.5, 0.01]}
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
