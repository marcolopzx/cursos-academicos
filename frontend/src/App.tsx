import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CursosPage from "./pages/CursosPage";
import CursoFormPage from "./pages/CursoFormPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CursosPage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/cursos/nuevo" element={<CursoFormPage />} />
        <Route path="/cursos/editar/:id" element={<CursoFormPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
