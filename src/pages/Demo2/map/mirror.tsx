import { MeshReflectorMaterial } from "@react-three/drei";

export default function Mirror() {
  return (
    <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-0.02}>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={1024}
        mixBlur={10}
        mixStrength={10}
        depthScale={1}
        minDepthThreshold={0.85}
        color="#011024"
        metalness={0.6}
        roughness={1}
      />
    </mesh>
  );
}
