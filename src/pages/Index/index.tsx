import { useRef, type ComponentProps } from "react";
import styled from "styled-components";
import {
  Canvas,
  useFrame,
  extend,
  type ThreeElements,
} from "@react-three/fiber";
import { Image, ScrollControls, useScroll } from "@react-three/drei";
import {
  Color,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
  PlaneGeometry,
  ShaderMaterial,
  Texture,
  Vector2,
  Vector3,
} from "three";
import { useNavigate } from "react-router";
import Bg from "./bg";

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

class BentPlaneGeometry extends PlaneGeometry {
  constructor(
    radius: number,
    width: number,
    height: number,
    widthSegments?: number,
    heightSegments?: number
  ) {
    super(width, height, widthSegments, heightSegments);
    let p = this.parameters;
    let hw = p.width * 0.5;
    let a = new Vector2(-hw, 0);
    let b = new Vector2(0, radius);
    let c = new Vector2(hw, 0);
    let ab = new Vector2().subVectors(a, b);
    let bc = new Vector2().subVectors(b, c);
    let ac = new Vector2().subVectors(a, c);
    let r =
      (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)));
    let center = new Vector2(0, radius - r);
    let baseV = new Vector2().subVectors(a, center);
    let baseAngle = baseV.angle() - Math.PI * 0.5;
    let arc = baseAngle * 2;
    let uv = this.attributes.uv;
    let pos = this.attributes.position;
    let mainV = new Vector2();
    for (let i = 0; i < uv.count; i++) {
      let uvRatio = uv.getX(i);
      let y = pos.getY(i);
      mainV.copy(c).rotateAround(center, arc * uvRatio);
      pos.setXYZ(i, mainV.x, y, -mainV.y);
    }
    pos.needsUpdate = true;
  }
}

const BentPlaneGeometryEl = extend(BentPlaneGeometry);

const WheelDrop = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.6;
`;

const Circle = styled.circle`
  @keyframes scroll-drop {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(15px);
      opacity: 0;
    }
  }

  animation: scroll-drop 1.5s ease-in-out infinite;
`;

export default function Index() {
  return (
    <Wrapper>
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
        <fog attach="fog" args={["#6e6e6e", 8.5, 12]} />
        <ScrollControls pages={4} infinite>
          <Rig rotation={[0, 0, 0.15]}>
            <Carousel />
          </Rig>
        </ScrollControls>
        <Bg />
      </Canvas>

      <WheelDrop>
        <svg width="20" height="32.5" viewBox="0 0 40 65">
          <rect
            x="2.5"
            y="2.5"
            width="35"
            height="60"
            rx="17.5"
            ry="17.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />

          <Circle cx="20" cy="15" r="3" fill="currentColor" />
        </svg>
      </WheelDrop>
    </Wrapper>
  );
}

function Rig(props: ThreeElements["group"]) {
  const ref = useRef<Group>(null!);
  const scroll = useScroll();
  const vector3 = useRef(new Vector3(1, 1, 1));

  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2);
    state.events.update?.();
    vector3.current.set(-state.pointer.x * 2, state.pointer.y + 1.5, 10);
    state.camera.position.lerp(vector3.current, 1 - Math.exp(-8 * delta));
    state.camera.lookAt(0, 0, 0);
  });

  return <group ref={ref} {...props} />;
}

function Carousel({ radius = 1.4, count = 8 }) {
  const navigator = useNavigate();

  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={`/sc-datav/demo_${i % 2}.png`}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
      onClick={(e) => {
        e.stopPropagation();
        navigator(["/demo0", "/demo1"][i % 2]);
      }}
    />
  ));
}

export interface ImageMaterial extends ShaderMaterial {
  scale?: number[];
  imageBounds?: number[];
  radius?: number;
  resolution?: number;
  color?: Color;
  map: Texture;
  zoom?: number;
  grayscale?: number;
}

function Card(props: ComponentProps<typeof Image>) {
  const ref = useRef<Mesh<BentPlaneGeometry, ImageMaterial>>(null!);
  const vector3 = useRef(new Vector3(1, 1, 1));
  const targetRadius = useRef(0.1);
  const targetZoom = useRef(1.5);

  useFrame((_, delta) => {
    ref.current.scale.lerp(vector3.current, 1 - Math.exp(-10 * delta));
    ref.current.material.radius = MathUtils.lerp(
      ref.current.material.radius!,
      targetRadius.current,
      1 - Math.exp(-8 * delta)
    );

    ref.current.material.zoom = MathUtils.lerp(
      ref.current.material.zoom!,
      targetZoom.current,
      1 - Math.exp(-8 * delta)
    );
  });

  return (
    <Image
      ref={ref}
      transparent
      toneMapped={false}
      side={DoubleSide}
      onPointerOver={(e) => {
        e.stopPropagation();
        vector3.current.setScalar(1.15);
        targetRadius.current = 0.25;
        targetZoom.current = 1;
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        vector3.current.setScalar(1);
        targetRadius.current = 0.1;
        targetZoom.current = 1.5;
        document.body.style.cursor = "auto";
      }}
      {...props}>
      <BentPlaneGeometryEl args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}
