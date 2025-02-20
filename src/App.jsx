import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import ListaEmPDF from "./pages/ListaEmPDF";
import Passageiros from "./pages/Passageiros";
// import Sobre from "./Sobre";
// import Contato from "./Contato";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lista-passageiros" element={<Passageiros />} />
      <Route path="/lista-em-pdf" element={<ListaEmPDF/>} />

    </Routes>
  </Router>
  )
}

export default App
