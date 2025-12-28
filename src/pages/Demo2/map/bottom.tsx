import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { AdditiveBlending, Mesh } from "three";

import quan1 from "@/assets/quan1.png";

export default function Bottom() {
  const meshRef1 = useRef<Mesh>(null!);

  const quan1Tex = useTexture(quan1);

  useFrame((_state, delta) => {
    meshRef1.current.rotation.z += delta / 5;
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position-y={-0.01}>
      <mesh ref={meshRef1}>
        <planeGeometry args={[16, 16]} />
        <meshBasicMaterial
          transparent
          map={quan1Tex}
          color="#8fc2ff"
          opacity={1}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
