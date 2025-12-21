import { lazy } from "react";
import { Route, Routes } from "react-router";
import Demo0 from "@/pages/Demo0";
import Demo1 from "@/pages/Demo1";

const Index = lazy(() => import("./pages/Index/index"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/demo0" element={<Demo0 />} />
      <Route path="/demo1" element={<Demo1 />} />
    </Routes>
  );
}

export default App;
