import {
  createContext,
  use,
  useContext,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import {
  REVISION,
  DynamicDrawUsage,
  Color,
  Group,
  Vector3,
  InstancedMesh,
  Matrix4,
  Quaternion,
  BufferAttribute,
} from "three";
import {
  applyProps,
  ReactThreeFiber,
  useFrame,
  type ThreeElements,
} from "@react-three/fiber";
import { useConfigStore } from "../stores";
import loadTexture from "../helpers/loadTexture";

import cloudUrl from "@/assets/cloud.png";

const cloudTexture = loadTexture(cloudUrl);

type CloudState = {
  uuid: string;
  index: number;
  segments: number;
  dist: number;
  matrix: Matrix4;
  bounds: Vector3;
  position: Vector3;
  volume: number;
  length?: number;
  ref?: React.RefObject<Group>;
  speed: number;
  growth: number;
  opacity: number;
  fade: number;
  density: number;
  rotation: number;
  rotationFactor: number;
  color: Color;
};

export type CloudsProps = Omit<ThreeElements["group"], "ref"> & {
  ref?: React.Ref<Group>;
  /** Maximum number of segments, default: 200 (make this tight to save memory!) */
  limit?: number;
  /** How many segments it renders, default: undefined (all) */
  range?: number;
  /** Which material it will override, default: MeshLambertMaterial */
  /** Frustum culling, default: true */
  frustumCulled?: boolean;
};

export type CloudProps = Omit<ThreeElements["group"], "ref"> & {
  ref?: React.Ref<Group>;
  /** A seeded random will show the same cloud consistently, default: Math.random() */
  seed?: number;
  /** How many segments or particles the cloud will have, default: 20 */
  segments?: number;
  /** The box3 bounds of the cloud, default: [5, 1, 1] */
  bounds?: ReactThreeFiber.Vector3;
  /** How to arrange segment volume inside the bounds, default: inside (cloud are smaller at the edges) */
  concentrate?: "random" | "inside" | "outside";
  /** The general scale of the segments */
  scale?: Vector3;
  /** The volume/thickness of the segments, default: 6 */
  volume?: number;
  /** The smallest volume when distributing clouds, default: 0.25 */
  smallestVolume?: number;
  /** An optional function that allows you to distribute points and volumes (overriding all settings), default: null
   *  Both point and volume are factors, point x/y/z can be between -1 and 1, volume between 0 and 1 */
  distribute?: (
    cloud: CloudState,
    index: number
  ) => { point: Vector3; volume?: number };
  /** Growth factor for animated clouds (speed > 0), default: 4 */
  growth?: number;
  /** Animation factor, default: 0 */
  speed?: number;
  /** Camera distance until the segments will fade, default: 10 */
  fade?: number;
  /** Opacity, default: 1 */
  opacity?: number;
  /** Color, default: white */
  color?: ReactThreeFiber.Color;
};

const parentMatrix = new Matrix4();
const translation = new Vector3();
const rotation = new Quaternion();
const cpos = new Vector3();
const cquat = new Quaternion();
const scale = new Vector3();

export const setUpdateRange = (
  attribute: BufferAttribute,
  updateRange: { start: number; count: number }
): void => {
  attribute.updateRanges[0] = updateRange;
};

const context = createContext<React.RefObject<CloudState[]>>(null!);

export const Clouds = ({
  children,
  range,
  limit = 200,
  frustumCulled,
  ...props
}: CloudsProps) => {
  const instance = useRef<InstancedMesh>(null!);
  const clouds = useRef<CloudState[]>([]);
  const opacities = useMemo(
    () => new Float32Array(Array.from({ length: limit }, () => 1)),
    [limit]
  );
  const colors = useMemo(
    () =>
      new Float32Array(Array.from({ length: limit }, () => [1, 1, 1]).flat()),
    [limit]
  );

  const texture = use(cloudTexture);

  let t = 0;
  let index = 0;
  let config: CloudState;
  const qat = new Quaternion();
  const dir = new Vector3(0, 0, 1);
  const pos = new Vector3();

  useFrame((state, delta) => {
    t = state.clock.elapsedTime;
    parentMatrix.copy(instance.current.matrixWorld).invert();
    state.camera.matrixWorld.decompose(cpos, cquat, scale);

    for (index = 0; index < clouds.current.length; index++) {
      config = clouds.current[index];
      config.ref?.current.matrixWorld.decompose(translation, rotation, scale);
      translation.add(
        pos.copy(config.position).applyQuaternion(rotation).multiply(scale)
      );
      rotation
        .copy(cquat)
        .multiply(
          qat.setFromAxisAngle(
            dir,
            (config.rotation += delta * config.rotationFactor)
          )
        );
      scale.multiplyScalar(
        config.volume +
          ((1 + Math.sin(t * config.density * config.speed)) / 2) *
            config.growth
      );
      config.matrix
        .compose(translation, rotation, scale)
        .premultiply(parentMatrix);
      config.dist = translation.distanceTo(cpos);
    }

    // Depth-sort. Instances have no specific draw order, w/o sorting z would be random
    clouds.current.sort((a, b) => b.dist - a.dist);
    for (index = 0; index < clouds.current.length; index++) {
      config = clouds.current[index];
      opacities[index] =
        config.opacity *
        (config.dist < config.fade - 1 ? config.dist / config.fade : 1);
      instance.current.setMatrixAt(index, config.matrix);
      instance.current.setColorAt(index, config.color);
    }

    // Update instance
    instance.current.geometry.attributes.cloudOpacity.needsUpdate = true;
    instance.current.instanceMatrix.needsUpdate = true;
    if (instance.current.instanceColor)
      instance.current.instanceColor.needsUpdate = true;
  });

  useLayoutEffect(() => {
    const count = Math.min(
      limit,
      range !== undefined ? range : limit,
      clouds.current.length
    );
    instance.current.count = count;
    setUpdateRange(instance.current.instanceMatrix, {
      start: 0,
      count: count * 16,
    });
    if (instance.current.instanceColor) {
      setUpdateRange(instance.current.instanceColor, {
        start: 0,
        count: count * 3,
      });
    }
    setUpdateRange(
      instance.current.geometry.attributes.cloudOpacity as BufferAttribute,
      { start: 0, count: count }
    );
  });

  let imageBounds: [number, number] = [
    texture!.image.width ?? 1,
    texture!.image.height ?? 1,
  ];
  const max = Math.max(imageBounds[0], imageBounds[1]);
  imageBounds = [imageBounds[0] / max, imageBounds[1] / max];

  return (
    <group {...props}>
      <context.Provider value={clouds}>
        {children}
        <instancedMesh
          matrixAutoUpdate={false}
          ref={instance}
          args={[undefined, undefined, limit]}
          frustumCulled={frustumCulled}>
          <instancedBufferAttribute
            usage={DynamicDrawUsage}
            attach="instanceColor"
            args={[colors, 3]}
          />
          <planeGeometry args={[...imageBounds]}>
            <instancedBufferAttribute
              usage={DynamicDrawUsage}
              attach="attributes-cloudOpacity"
              args={[opacities, 1]}
            />
          </planeGeometry>
          <meshLambertMaterial
            transparent
            map={texture}
            depthWrite={false}
            onBeforeCompile={(shader) => {
              const opaque_fragment =
                parseInt(REVISION.replace(/\D+/g, "")) >= 154
                  ? "opaque_fragment"
                  : "output_fragment";
              shader.vertexShader =
                `attribute float cloudOpacity;
               varying float vOpacity;
              ` +
                shader.vertexShader.replace(
                  "#include <fog_vertex>",
                  `#include <fog_vertex>
                 vOpacity = cloudOpacity;
                `
                );
              shader.fragmentShader =
                `varying float vOpacity;
              ` +
                shader.fragmentShader.replace(
                  `#include <${opaque_fragment}>`,
                  `#include <${opaque_fragment}>
                 gl_FragColor = vec4(outgoingLight, diffuseColor.a * vOpacity);
                `
                );
            }}
          />
        </instancedMesh>
      </context.Provider>
    </group>
  );
};

export const CloudInstance = ({
  opacity = 1,
  speed = 0,
  bounds = [5, 1, 1],
  segments = 20,
  color = "#ffffff",
  fade = 10,
  volume = 6,
  smallestVolume = 0.25,
  distribute,
  growth = 4,
  concentrate = "inside",
  seed = Math.random(),
  ref: fref,
  ...props
}: CloudProps) => {
  function random() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  const parent = useContext(context);
  const ref = useRef<Group>(null!);
  const uuid = useId();
  const clouds: CloudState[] = useMemo(() => {
    return [...new Array(segments)].map(
      (_, index) =>
        ({
          segments,
          bounds: new Vector3(1, 1, 1),
          position: new Vector3(),
          uuid,
          index,
          ref,
          dist: 0,
          matrix: new Matrix4(),
          color: new Color(),
          rotation: index * (Math.PI / segments),
        } as CloudState)
    );
  }, [segments, uuid]);

  useLayoutEffect(() => {
    clouds.forEach((cloud, index) => {
      applyProps(cloud as any, {
        volume,
        color,
        speed,
        growth,
        opacity,
        fade,
        bounds,
        density: Math.max(0.5, random()),
        rotationFactor: Math.max(0.2, 0.5 * random()) * speed,
      });

      const distributed = distribute?.(cloud, index);

      if (distributed || segments > 1) {
        cloud.position.copy(cloud.bounds).multiply(
          distributed?.point ??
            ({
              x: random() * 2 - 1,
              y: random() * 2 - 1,
              z: random() * 2 - 1,
            } as Vector3)
        );
      }
      const xDiff = Math.abs(cloud.position.x);
      const yDiff = Math.abs(cloud.position.y);
      const zDiff = Math.abs(cloud.position.z);
      const max = Math.max(xDiff, yDiff, zDiff);
      cloud.length = 1;
      if (xDiff === max) cloud.length -= xDiff / cloud.bounds.x;
      if (yDiff === max) cloud.length -= yDiff / cloud.bounds.y;
      if (zDiff === max) cloud.length -= zDiff / cloud.bounds.z;
      cloud.volume =
        (distributed?.volume !== undefined
          ? distributed.volume
          : Math.max(
              Math.max(0, smallestVolume),
              concentrate === "random"
                ? random()
                : concentrate === "inside"
                ? cloud.length
                : 1 - cloud.length
            )) * volume;
    });
  }, [
    concentrate,
    bounds,
    fade,
    color,
    opacity,
    growth,
    volume,
    seed,
    segments,
    speed,
  ]);

  useLayoutEffect(() => {
    const temp = clouds;
    parent.current = [...parent.current, ...temp];
    return () => {
      parent.current = parent.current.filter((item) => item.uuid !== uuid);
    };
  }, [clouds]);

  useImperativeHandle(fref, () => ref.current, []);

  return <group ref={ref} {...props} />;
};

export const Cloud = (props: CloudProps) => {
  const parent = useContext(context);
  if (parent) return <CloudInstance {...props} />;
  return (
    <Clouds>
      <CloudInstance {...props} />
    </Clouds>
  );
};

export default function CloudGroup() {
  const ref = useRef<Group>(null!);
  const cloud0 = useRef<Group>(null!);
  const cloud = useConfigStore((s) => s.cloud);

  useFrame((state, delta) => {
    ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 2) / 2;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 2) / 2;
    cloud0.current.rotation.y -= delta / 5;
  });

  return (
    <Clouds ref={ref} visible={cloud}>
      <Cloud
        ref={cloud0}
        bounds={[50, 10, 10]}
        position={[100, 60, 20]}
        volume={50}
        opacity={0.5}
        fade={50}
      />
      <Cloud
        bounds={[50, 10, 10]}
        position={[-60, 60, 60]}
        volume={50}
        opacity={0.5}
        fade={50}
      />
    </Clouds>
  );
}
