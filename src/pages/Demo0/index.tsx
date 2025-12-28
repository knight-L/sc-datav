import { lazy } from "react";

const Demo = lazy(() => import("./demo"));

export default function Index() {
  return <Demo />;
}
