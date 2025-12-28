import { useRef } from "react";

export default function Lights() {
  const directionalRef = useRef(null!);

  //   useHelper(directionalRef, DirectionalLightHelper, 5, "red");

  return (
    <>
      <ambientLight color={0xffffff} intensity={2} />
      <directionalLight
        ref={directionalRef}
        color="#ffffff"
        intensity={10}
        position={[0, 50, -50]}
      />
    </>
  );
}
