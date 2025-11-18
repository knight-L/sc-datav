import { useControls } from "leva";

export const AmbientLight = () => {
  const controls = useControls({
    intensity: {
      label: "环境光",
      value: 2,
      min: 0,
      max: 10,
    },
  });
  return <ambientLight intensity={controls.intensity} />;
};

export const PointLight = () => {
  const controls = useControls({
    intensity1: {
      label: "点光源",
      value: 1000,
      min: 0,
      max: 2000,
    },
  });

  return (
    <pointLight
      intensity={controls.intensity1}
      position={[-5, 20, 0]}
      distance={50}
    />
  );
};
