import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { AdditiveBlending, Color, Mesh, RepeatWrapping } from "three";

import rotationBorder1 from "@/assets/rotationBorder1.png";
import rotationBorder2 from "@/assets/rotationBorder2.png";
// import guangquan01 from "@/assets/guangquan01.png";
import grid from "@/assets/grid.png";
import gridBlack from "@/assets/gridBlack.png";
import quan from "@/assets/quan.png";

export default function Bottom() {
  const meshRef0 = useRef({
    uTime: {
      value: 0.0,
    },
    uSpeed: {
      value: 10.0,
    },
    uWidth: {
      value: 20.0,
    },
    uColor: {
      value: new Color(0x079fe6),
    },
    uDir: {
      value: 2.0, // 1.0-xy,2.0-xz
    },
  });
  const meshRef1 = useRef<Mesh>(null!);
  const meshRef2 = useRef<Mesh>(null!);
  //   const guangquanTex = useTexture(guangquan01, (tex) => {
  //     tex.colorSpace = SRGBColorSpace;
  //     tex.wrapS = tex.wrapT = RepeatWrapping;
  //     tex.repeat.set(1, 1);
  //   });

  const [gridTex, gridBlackTex] = useTexture([grid, gridBlack], (tex) =>
    tex.forEach((el) => {
      el.wrapS = el.wrapT = RepeatWrapping;
      el.repeat.set(80, 80);
    })
  );

  const [quanTex, rotationBorder1Tex, rotationBorder2Tex] = useTexture([
    quan,
    rotationBorder1,
    rotationBorder2,
  ]);

  useFrame((_state, delta) => {
    meshRef0.current.uTime.value += delta;
    if (meshRef0.current.uTime.value > 100 / 10) {
      meshRef0.current.uTime.value = 0.0;
    }
    meshRef1.current.rotation.z += 0.001;
    meshRef2.current.rotation.z += -0.004;
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial
          transparent
          map={gridTex}
          alphaMap={gridBlackTex}
          color="#00ffff"
          opacity={0.1}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial
          transparent
          map={gridTex}
          alphaMap={gridBlackTex}
          color="#00ffff"
          opacity={0.5}
          depthWrite={false}
          blending={AdditiveBlending}
          onBeforeCompile={(shader) => {
            shader.uniforms = {
              ...shader.uniforms,
              ...meshRef0.current,
            };
            shader.vertexShader = shader.vertexShader.replace(
              "void main() {",
              /* glsl */ `
            varying vec3 vPosition;
            void main(){
              vPosition = position;
          `
            );
            shader.fragmentShader = shader.fragmentShader.replace(
              "void main() {",
              /* glsl */ `
            uniform float uTime;
            uniform float uSpeed;
            uniform float uWidth;
            uniform vec3 uColor;
            uniform float uDir;
            varying vec3 vPosition;
            
            void main(){
          `
            );
            shader.fragmentShader = shader.fragmentShader.replace(
              "#include <opaque_fragment>",
              /* glsl */ `
            #ifdef OPAQUE
            diffuseColor.a = 1.0;
            #endif
            
            #ifdef USE_TRANSMISSION
            diffuseColor.a *= material.transmissionAlpha;
            #endif
            
            float r = uTime * uSpeed;
            //光环宽度
            float w = 0.0; 
            if(w>uWidth){
              w = uWidth;
            }else{
              w = uTime * 5.0;
            }
            //几何中心点
            vec2 center = vec2(0.0, 0.0); 
            // 距离圆心的距离

            float rDistance = distance(vPosition.xz, center);
            if(uDir==2.0){
              rDistance = distance(vPosition.xy, center);
            }
            if(rDistance > r && rDistance < r + 2.0 * w) {
              float per = 0.0;
              if(rDistance < r + w) {
                per = (rDistance - r) / w;
                outgoingLight = mix(outgoingLight, uColor, per);
                // 获取0->透明度的插值
                float alphaV = mix(0.0,diffuseColor.a,per);
                gl_FragColor = vec4(outgoingLight,  alphaV);
              } else {
                per = (rDistance - r - w) / w;
                outgoingLight = mix(uColor, outgoingLight, per);
                // 获取0->透明度的插值
                float alphaV = mix(diffuseColor.a,0.0,per);
                gl_FragColor = vec4(outgoingLight,  alphaV);
              }
            } else {
              gl_FragColor = vec4(outgoingLight, 0.0);
            }
          `
            );
          }}
        />
      </mesh>
      {/* <mesh position={[0, 0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial
          transparent
          blending={AdditiveBlending}
          map={guangquanTex}
        />
      </mesh> */}
      <mesh position={[0, 0.01, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial
          transparent
          depthTest={false}
          blending={AdditiveBlending}
          map={quanTex}
        />
      </mesh>
      <mesh ref={meshRef1} position={[0, 0.02, 0]}>
        <planeGeometry args={[16, 16]} />
        <meshBasicMaterial
          transparent
          map={rotationBorder1Tex}
          color="#48afff"
          opacity={0.2}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
      <mesh ref={meshRef2} position={[0, 0.02, 0]}>
        <planeGeometry args={[15, 15]} />
        <meshBasicMaterial
          transparent
          map={rotationBorder2Tex}
          color="#48afff"
          opacity={0.4}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
