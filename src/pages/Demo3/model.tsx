import { useRef } from "react";
import { Clone, useGLTF } from "@react-three/drei";
import { Mesh, type Group } from "three";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useControls } from "leva";

export default function Model() {
  const { scene } = useGLTF("/sc-datav/model/glb/turbine.glb");
  const obj = useRef<Group>(null!);

  const controls = useControls({
    disassembly: {
      label: "拆解/还原",
      value: false,
      transient: false,
      onChange: (v, _, { initial }) => {
        if (initial) {
          return;
        }
        const children = obj.current.children;
        const length = children.length;

        const mid = (length - 1) / 2; // 中心点（兼容奇偶）

        let step = 0.1;

        obj.current.traverse((child) => {
          if (child instanceof Mesh) {
            if (v) {
              child.userData.originPosition = child.position.clone();
            }
            const index = children.indexOf(child);

            let distance = (index - mid) * step;

            gsap.to(child.position, {
              x: child.position?.x,
              y: child.position?.y,
              z: v ? distance : child.userData.originPosition?.z,
              duration: 1,
              ease: "power2.inOut",
            });
          }
        });
      },
    },
  });

  useFrame((_, delta) => {
    if (!controls.disassembly) {
      obj.current?.getObjectByName("defaultMaterial_45")?.rotateY(delta * 10);
    }
  });

  return (
    <group scale={2} position-z={-1}>
      <Clone
        deep
        castShadow
        receiveShadow
        ref={obj}
        object={scene}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (e.object instanceof Mesh) {
            e.object.userData.originHex = e.object.material.emissive.getHex();
            e.object.material.emissive.setHex(0xff0000);
          }
        }}
        onPointerOut={(e) => {
          if (e.object instanceof Mesh) {
            e.object.material.emissive.setHex(e.object.userData.originHex);
          }
        }}
      />
    </group>
  );
}
