import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import Jobs from "./pages/Jobs";
import UploadResume from "./pages/UploadResume";
import ATSResults from "./pages/ATSResults";


function App() {
  return (
    <Routes>

      <Route path="/" element={<Dashboard />} />

      <Route path="/candidates" element={<Candidates />} />

      <Route path="/jobs" element={<Jobs />} />

      <Route path="/upload" element={<UploadResume />} />

      <Route path="/ats" element={<ATSResults />} />

    </Routes>
  );
}

export default App;