import SCDataV from "./pages/SCDataV";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SCDataV />} />
    </Routes>
  );
}

export default App;
