import { Routes, Route } from "react-router-dom";

import Layout from "./components/common/Layout";

import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import Jobs from "./pages/Jobs";
import UploadResume from "./pages/UploadResume";
import ATSResults from "./pages/ATSResults";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/ats" element={<ATSResults />} />
      </Routes>
    </Layout>
  );
}

export default App;