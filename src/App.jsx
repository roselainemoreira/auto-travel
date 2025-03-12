import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import ListaEmPDF from "./pages/ListaEmPDF";
import ListaEmExcel from "./pages/ListaEmExcel";
import ListaEmFoto from "./pages/ListaEmFoto";
import ListaCopiaCola from "./pages/ListaCopiaCola";
// import Sobre from "./Sobre";
// import Contato from "./Contato";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lista-em-excel" element={<ListaEmExcel />} />
      <Route path="/lista-em-pdf" element={<ListaEmPDF/>} />
      <Route path="/lista-em-foto" element={<ListaEmFoto/>} />
      <Route path="/lista-copia-cola" element={<ListaCopiaCola/>} />

    </Routes>
  </Router>
  )
}

export default App
