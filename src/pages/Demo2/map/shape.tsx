import { useImperativeHandle, useLayoutEffect, useRef, type Ref } from "react";
import { Box2, Float32BufferAttribute, Mesh } from "three";
import type { ThreeElements } from "@react-three/fiber";

export type ShapeProps = Omit<React.JSX.IntrinsicElements["mesh"], "args"> & {
  ref?: Ref<Mesh>;
  args?: ThreeElements["extrudeGeometry"]["args"];
  bbox: Box2;
};

export default function ShapeBox(props: ShapeProps) {
  const { ref, args, bbox, children, ...meshProps } = props;
  const meshRef = useRef<Mesh>(null!);

  useImperativeHandle(ref, () => meshRef.current);
  useLayoutEffect(() => {
    const { geometry } = meshRef.current;

    const pos = geometry.attributes.position;
    const width = bbox.max.x - bbox.min.x;
    const height = bbox.max.y - bbox.min.y;

    const uv: number[] = [];
    let x = 0,
      y = 0,
      u = 0,
      v = 0;
    for (let i = 0; i < pos.count; i++) {
      x = pos.getX(i);
      y = pos.getY(i);
      u = (x - bbox.min.x) / width;
      v = (y - bbox.min.y) / height;
      uv.push(u, v);
    }

    geometry.setAttribute("uv", new Float32BufferAttribute(uv, 2));
  });

  return (
    <mesh ref={meshRef} {...meshProps}>
      <extrudeGeometry attach="geometry" args={args} />
      {children}
    </mesh>
  );
}
