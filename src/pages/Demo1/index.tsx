import { lazy, Suspense } from "react";
import Loading from "./loading";

const Demo = lazy(() => import("./demo"));

export default function Index() {
  return (
    <Suspense fallback={<Loading />}>
      <Demo />
    </Suspense>
  );
}
