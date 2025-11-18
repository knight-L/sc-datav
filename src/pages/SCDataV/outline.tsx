import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Extrude } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import { type GeoProjection } from "d3-geo";

import scOutlineData from "@/assets/sc_outline.json";

// const OutLineShiftMaterial = extend(
//   shaderMaterial(
//     { time: 0, color: new THREE.Color("#00FFFF") },
//     // vertex shader
//     /*glsl*/ `
//     varying vec2 vUv;
//     varying vec3 vNormal;

//     void main() {
//         vUv=uv;
//         vNormal=normal;

//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
//   `,
//     // fragment shader
//     /*glsl*/ `
//     uniform float time;
//     uniform vec3 color;
//     varying vec2 vUv;
//     varying vec3 vNormal;
//     void main() {
//         if(vNormal.z==1.0||vNormal.z==-1.0||vUv.y ==0.0){
//             discard;
//         } else{
//             gl_FragColor =vec4(color,0.6-fract((vUv.y-time)));
//         }
//     }
//   `
//   )
// );

export function OutLineAnimated() {
  const controls = useControls({
    background: { label: "侧边颜色", value: "#0e171a" },
    background1: {
      label: "侧边扫光颜色",
      value: "#1f8791",
      transient: false,
      onChange: (v) => {
        uniformsRef.current.uRiseColor.value = new THREE.Color(v);
      },
    },
  });
  const uniformsRef = useRef<{
    uRiseTime: THREE.IUniform<number>;
    uRiseColor: THREE.IUniform<THREE.Color>;
  }>({
    uRiseTime: { value: 0.5 },
    uRiseColor: { value: new THREE.Color(controls.background1) },
  });
  //   const [time, setTime] = useState(0.2);

  useFrame(() => {
    uniformsRef.current.uRiseTime.value =
      uniformsRef.current.uRiseTime.value <= -0.8
        ? 0.5
        : uniformsRef.current.uRiseTime.value - 0.003;
    // setTime((prev) => (prev - 0.003) % 1);
  });

  return (
    <>
      {/* <OutLineShiftMaterial
        transparent
        // depthTest={false}
        // depthWrite={true}
        side={THREE.DoubleSide}
        time={time}
      /> */}
      <meshPhysicalMaterial
        transparent
        opacity={0.9}
        color={controls.background}
        onBeforeCompile={(shader) => {
          shader.uniforms = {
            ...shader.uniforms,
            ...uniformsRef.current,
          };

          shader.vertexShader = shader.vertexShader
            .replace(
              "#include <common>",
              `
                #include <common>
                varying vec3 vTransformedNormal;
                varying float vHeight;
              `
            )
            .replace(
              "#include <begin_vertex>",
              `
                #include <begin_vertex>
                vTransformedNormal = normalize(normal);
                vHeight = transformed.z;
              `
            );

          shader.fragmentShader = shader.fragmentShader
            .replace(
              "#include <common>",
              `
            #include <common>
            uniform vec3 uRiseColor;
            uniform float uRiseTime;
            varying float vHeight;
            varying vec3 vTransformedNormal;

            vec3 riseLine() {
                float smoothness = 0.5;
                float speed = uRiseTime;
                bool isTopBottom = (vTransformedNormal.z > 0.0 || vTransformedNormal.z < 0.0) && vTransformedNormal.x == 0.0 && vTransformedNormal.y == 0.0;
                float ratio = isTopBottom ? 0.0 : smoothstep(speed, speed + smoothness, vHeight) - smoothstep(speed + smoothness, speed + smoothness * 2.0, vHeight);
                return uRiseColor * ratio;
            }
            `
            )
            .replace(
              "#include <dithering_fragment>",
              `
                #include <dithering_fragment>
                gl_FragColor = gl_FragColor + vec4(riseLine(), 1.0);
              `
            );
        }}
      />
    </>
  );
}

export default function OutLine({ projection }: { projection: GeoProjection }) {
  return (
    <group renderOrder={1}>
      {scOutlineData.features.map((feature) =>
        feature.geometry.coordinates[0].map((coordinates, coordinatesIndex) => (
          <Extrude
            key={`${feature.properties.name}--${coordinatesIndex}`}
            args={[
              new THREE.Shape(
                coordinates.map((coord) => {
                  const [x, y] = projection(coord as [number, number]) ?? [];
                  return new THREE.Vector2(x, y);
                })
              ),
              {
                depth: 0.5,
                bevelEnabled: false,
              },
            ]}>
            <OutLineAnimated />
          </Extrude>
        ))
      )}
    </group>
  );
}
