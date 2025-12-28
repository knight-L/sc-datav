import { Color, DoubleSide, Shape } from "three";
import { extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

const BoundaryMaterial = extend(
  shaderMaterial(
    {
      uColor: new Color("#8fc2ff"),
      uOpacity: 1,
      uDepth: 1,
    },
    `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying float vHeight;
          
    void main() {
        vUv=uv;
        vNormal=normal;
        vHeight = position.z;
            
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );
    }`,
    `
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec2 vUv; 
    varying vec3 vNormal;
    uniform float uDepth;
    varying float vHeight;

    void main() {
        if(vNormal.z==1.0||vNormal.z==-1.0||vUv.y ==0.0){
            discard;
        } else{
            float h = mix(1.0,0.0,vHeight / uDepth);
            gl_FragColor = vec4(uColor, h * uOpacity);
        } 
    }`
  )
);

export interface BoundaryProps {
  data: Shape[];
  depth?: number;
}

export default function Boundary(props: BoundaryProps) {
  const { data, depth = 3 } = props;
  return (
    <group renderOrder={11} position-z={1}>
      <mesh>
        <extrudeGeometry args={[data, { depth, bevelEnabled: false }]} />
        <BoundaryMaterial
          transparent
          depthTest={false}
          side={DoubleSide}
          uOpacity={0.2}
          uDepth={depth}
        />
      </mesh>
    </group>
  );
}
