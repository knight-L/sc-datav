import { MeshReflectorMaterial } from "@react-three/drei";
import { useConfigStore } from "../stores";

export default function Mirror() {
  const mirror = useConfigStore((s) => s.toggleMirror);
  return (
    <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-0.02}>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        visible={mirror}
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
