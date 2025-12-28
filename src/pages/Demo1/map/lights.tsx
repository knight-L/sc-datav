import { useRef } from "react";
import { DirectionalLight } from "three";

export default function Lights() {
  const lightRef = useRef<DirectionalLight>(null!);

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight
        ref={lightRef}
        intensity={12}
        position={[0, 200, 20]}
        color="#fff5e8"
      />
    </>
  );
}
