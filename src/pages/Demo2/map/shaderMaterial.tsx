import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Color } from "three";

export default extend(
  shaderMaterial(
    {
      time: 0,
      depth: 1,
      baseTopColor: new Color("#8fc2ff"),
      baseBottomColor: new Color("#10182c"),
      scanColor: new Color("#8fc2ff"),
      opacity: 1.0,
    },
    `varying vec3 vPosition;
     varying vec3 vNormal;
     void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    `   varying vec3 vPosition;
        uniform float time;
        uniform float depth;
        uniform vec3 baseTopColor;
        uniform vec3 baseBottomColor;
        uniform vec3 scanColor;
        uniform float opacity;

        void main() {
            float bandHeight = 0.45;
            float normalizedHeight = clamp(vPosition.z / depth, 0.0, 1.0);
            float progress = fract(time) * (1.0 + bandHeight) - bandHeight;
            float distance = (progress + bandHeight) - normalizedHeight;
            float belowHead = step(0.0, distance);
            
            float withinBand = clamp(1.0 - distance / bandHeight, 0.0, 1.0) * belowHead;
            float feather = smoothstep(0.0, 1.0, withinBand);
            float bandCore = pow(feather, 1.5);
            float bandEdge = smoothstep(0.0, 0.6, withinBand) * (1.0 - smoothstep(0.6, 1.0, withinBand));
            float scanStrength = (bandCore * 0.85 + bandEdge * 0.4);

            if (normalizedHeight < 0.001 || normalizedHeight > 0.999) {
                scanStrength = 0.0;
            }

            vec3 baseColor = mix(baseBottomColor, baseTopColor, normalizedHeight);
            vec3 scanned = mix(baseColor, scanColor, clamp(scanStrength, 0.0, 1.0));
            gl_FragColor = vec4(scanned, opacity);
        }
        `
  )
);
