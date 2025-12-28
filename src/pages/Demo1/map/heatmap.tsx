import { useEffect, useRef } from "react";
import {
  CanvasTexture,
  Color,
  DoubleSide,
  type Mesh,
  type PlaneGeometry,
  type ShaderMaterial,
} from "three";
import type { GeoProjection } from "d3-geo";
import type { ThreeElements } from "@react-three/fiber";
//@ts-ignore
import heatmapJs from "keli-heatmap.js";
import { useConfigStore } from "../stores";

import data from "@/assets/heatmapData.json";

interface HeatmapProps extends Omit<ThreeElements["group"], "visible"> {
  projection: GeoProjection;
  size?: number;
}

export default function Heatmap(props: HeatmapProps) {
  const { projection, size = 500, ...args } = props;
  const refMesh = useRef<Mesh<PlaneGeometry, ShaderMaterial>>(null!);

  const heat = useConfigStore((s) => s.heat);

  useEffect(() => {
    const radius = 10;
    const heatmapContainer = document.createElement("div");
    heatmapContainer.style = `position:absolute;top:-9999px;left:-9999px;`;
    document.body.appendChild(heatmapContainer);

    const heatmap = heatmapJs.create({
      container: heatmapContainer,
      gradient: {
        0.5: "#1fc2e1",
        0.6: "#24d560",
        0.7: "#9cd522",
        0.8: "#f1e12a",
        0.9: "#ffbf3a",
        1.0: "#ff0000",
      },
      blur: 1,
      radius: radius,
      maxOpacity: 1,
      width: size,
      height: size,
    });

    const greymap = heatmapJs.create({
      container: heatmapContainer,
      gradient: {
        0.0: "black",
        1.0: "white",
      },
      radius: radius,
      maxOpacity: 1,
      width: size,
      height: size,
    });

    const points = data.features.map((el) => {
      const [x = 0, y = 0] =
        projection(el.geometry.coordinates as [number, number]) ?? [];
      return {
        x: Math.floor(x + size / 2),
        y: Math.floor(y + size / 2),
        value: el.properties.value,
      };
    });

    const max = 1000;
    const min = 2000;

    heatmap.setData({
      max,
      min,
      data: points,
    });

    greymap.setData({
      max,
      min,
      data: points,
    });

    const texture = new CanvasTexture(heatmap._renderer.canvas);
    texture.needsUpdate = true;
    const texture2 = new CanvasTexture(greymap._renderer.canvas);
    texture2.needsUpdate = true;
    refMesh.current.material.uniforms.heatMap.value = texture;
    refMesh.current.material.uniforms.greyMap.value = texture2;

    return () => {
      greymap._renderer.canvas.remove();
      greymap._renderer.canvas.remove();
      document.body.removeChild(heatmapContainer);
    };
  }, []);

  return (
    <group visible={heat} {...args}>
      <mesh ref={refMesh}>
        <planeGeometry args={[size, size, 300, 300]} />
        <shaderMaterial
          transparent
          side={DoubleSide}
          vertexShader={`
            varying vec2 vUv;
            uniform float z_scale;
            uniform sampler2D greyMap;
            void main() {
                vUv = uv;
                vec4 frgColor = texture2D(greyMap, uv);
                float height = z_scale * frgColor.a;
                vec3 transformed = vec3( position.x, position.y, height);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
            }
        `}
          fragmentShader={`
            #ifdef GL_ES
            precision highp float;
            #endif
            varying vec2 vUv;
            uniform sampler2D heatMap;
            uniform vec3 u_color;//基础颜色
            uniform float u_opacity; // 透明度
            void main() {
                gl_FragColor = vec4(u_color, u_opacity) * texture2D(heatMap, vUv);
            }
        `}
          uniforms={{
            heatMap: {
              value: { value: undefined },
            },
            greyMap: {
              value: { value: undefined },
            },
            z_scale: { value: 4.0 },
            u_color: {
              value: new Color("#ffffff"),
            },
            u_opacity: {
              value: 1.0,
            },
          }}
        />
      </mesh>
    </group>
  );
}
