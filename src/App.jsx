import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Menu from "./pages/Barang"
import Edit from "./pages/edit";
import Detail from "./pages/detail";
import Tambah from "./pages/tambah";
import Makanan from "./pages/makanan";
import Minuman from "./pages/minuman";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          {/* <Route path="/add" element={<AddEditMenu />} /> */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/tambah" element={<Tambah />} />
          <Route path="/makanan" element={<Makanan />} />
          <Route path="/minuman" element={<Minuman />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
