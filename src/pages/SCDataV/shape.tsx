import * as THREE from "three";
import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import type { Args } from "@react-three/fiber";

export type ShapeProps = Omit<React.JSX.IntrinsicElements["mesh"], "args"> & {
  args?: Args<typeof THREE.ShapeGeometry>;
  bbox: THREE.Box2;
};

function Shape(props: ShapeProps, ref: React.ForwardedRef<THREE.Mesh>) {
  const { args, bbox, children, ...meshProps } = props;
  const meshRef = useRef<THREE.Mesh>(null!);

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
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  });

  return (
    <mesh ref={meshRef} {...meshProps}>
      <shapeGeometry attach="geometry" args={args} />
      {children}
    </mesh>
  );
}

export default forwardRef(Shape);
