import { useRef, type Ref } from "react";
import { useFrame, extend, type ThreeElements } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import {
  AdditiveBlending,
  Color,
  DoubleSide,
  Group,
  Points,
  Vector3,
  type ColorRepresentation,
} from "three";

const SparklesImplMaterial = extend(
  shaderMaterial(
    { uColor: new Color(), uOpacity: 1 },
    `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    `
        uniform vec3 uColor;
        uniform float uOpacity;
        
        varying vec2 vUv;

        void main() {
            // 1. 水平发光核心 (中间亮，两侧虚)
            float strength = 1.0 - abs(vUv.x - 0.5) * 2.0;
            strength = pow(strength, 2.0);

            // 2. 垂直渐变 (关键修改：两端透明，模拟一段独立的光)
            // 使用抛物线或正弦波让中间最亮，两头淡出
            float verticalFade = sin(vUv.y * 3.14159); 
            // 让两端更锐利一点
            verticalFade = pow(verticalFade, 0.5);

            float brightness = strength * verticalFade * (0.6 + 0.4);

            // 4. 最终颜色
            vec3 finalColor = uColor * brightness * 2.0; // 增强一点亮度
            
            gl_FragColor = vec4(finalColor, brightness * uOpacity);
        }
    `
  )
);

export type SparklesProps = Omit<
  ThreeElements["points"],
  "ref" | "children"
> & {
  ref?: Ref<Points>;
  /** Number of particles (default: 100) */
  count?: number;
  /** Speed of particles (default: 1) */
  speed?: number | Float32Array;
  /** Opacity of particles (default: 1) */
  opacity?: number | Float32Array;
  /** Color of particles (default: 100) */
  color?: ColorRepresentation | Float32Array;
  /** Size of particles (default: randomized between 0 and 1) */
  size?: number | Float32Array;
  /** The space the particles occupy (default: 1) */
  scale?: number | [number, number, number] | Vector3;
};

const BeamLight = ({}: SparklesProps) => {
  const ref = useRef<Group>(null!);

  useFrame((_, delta) => {
    ref.current.children.forEach((beam) => {
      // 向上移动
      beam.position.y += beam.userData.speed * delta;

      // 边界检查：如果飞得太高，就重置到底部
      if (beam.position.y > beam.userData.resetHeight) {
        // 随机水平位置
        beam.position.x = (Math.random() - 0.5) * range;
        beam.position.z = (Math.random() - 0.5) * range;

        // 从地底开始生成，避免直接突然出现在视野中
        beam.position.y = 1 - Math.random() * 5;

        // 随机长度 (流光段的长度)
        beam.scale.y = 2.0 + Math.random() * 1.0;
      }
    });
  });

  //   useImperativeHandle(forwardRef, () => ref.current, []);

  const range = 20;

  //   console.log(ref);

  return (
    <group ref={ref}>
      {Array.from({ length: 20 }, (_, k) => (
        <mesh
          key={k}
          position={[
            (Math.random() - 0.5) * range,
            5 - Math.random() * 5,
            (Math.random() - 0.5) * range,
          ]}
          scale={[1, 2.0 + Math.random() * 4.0, 1]}
          userData={{
            speed: 2 + Math.random(), // 上升速度
            resetHeight: 10 + Math.random() * 20, // 飞多高后消失
          }}>
          <cylinderGeometry args={[0.03, 0.03, 1, 6, 1, true]} />
          <SparklesImplMaterial
            transparent
            depthWrite={false}
            side={DoubleSide}
            blending={AdditiveBlending}
            uColor={0x8fc2ff}
            uOpacity={0.5 + Math.random() * 0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

export default BeamLight;
