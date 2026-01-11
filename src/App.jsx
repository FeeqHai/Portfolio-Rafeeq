import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Academic from "./pages/Academic";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Experience from "./pages/Experience";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="academic" element={<Academic />} />
        <Route path="projects" element={<Projects />} />
        <Route path="resume" element={<Resume />} />
        <Route path="experience" element={<Experience />} />
      </Route>
    </Routes>
  );
}

export default App;
