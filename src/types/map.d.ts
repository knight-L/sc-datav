/**
 * 通用 GeoJSON 类型定义
 * 兼容 FeatureCollection、Feature、Geometry 各类型
 */
export type GeoJSONGeometryType =
  | "Point"
  | "MultiPoint"
  | "LineString"
  | "MultiLineString"
  | "Polygon"
  | "MultiPolygon"
  | "GeometryCollection";

export interface GeoJSONGeometry {
  type: GeoJSONGeometryType;
  coordinates:
    | number[] // Point
    | number[][] // LineString
    | number[][][] // Polygon
    | number[][][][] // MultiPolygon
    | number[][][][][]; // 兼容 GeometryCollection 的嵌套情况
}

/**
 * GeoJSON Feature
 */
export interface GeoJSONFeature<
  P = Record<string, unknown>,
  G = GeoJSONGeometry
> {
  type: "Feature";
  geometry: G;
  properties: P;
}

/**
 * GeoJSON FeatureCollection
 */
export interface GeoJSONFeatureCollection<
  P = Record<string, unknown>,
  G = GeoJSONGeometry
> {
  type: "FeatureCollection";
  features: GeoJSONFeature<P, G>[];
}

/**
 * 如果你想描述你提供的具体数据结构，可以基于通用类型扩展：
 */
export interface CityProperties {
  adcode: number;
  name: string;
  center: [number, number];
  centroid: [number, number];
  childrenNum: number;
  level: string;
  parent: { adcode: number };
  subFeatureIndex: number;
  acroutes: number[];
}

export type CityGeoJSON = GeoJSONFeatureCollection<
  CityProperties,
  { type: "MultiPolygon"; coordinates: number[][][][] }
>;
