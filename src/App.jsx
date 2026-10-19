import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
const About = lazy(() => import("./pages/About"));
const Academic = lazy(() => import("./pages/Academic"));
const Resume = lazy(() => import("./pages/Resume"));
const Experience = lazy(() => import("./pages/Experience"));

function Deferred({ children }) {
  return <Suspense fallback={<p className="page-width standalone-page" role="status">Loading page…</p>}>{children}</Suspense>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<Deferred><About /></Deferred>} />
        <Route path="academic" element={<Deferred><Academic /></Deferred>} />
        <Route path="projects" element={<Projects />} />
        <Route path="resume" element={<Deferred><Resume /></Deferred>} />
        <Route path="experience" element={<Deferred><Experience /></Deferred>} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
