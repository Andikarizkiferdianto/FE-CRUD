import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Menu from "./pages/Barang";
import Edit from "./pages/edit";
import Detail from "./pages/detail";
import Tambah from "./pages/tambah";
import Makanan from "./pages/makanan";
import Minuman from "./pages/minuman";

function App() {
  return (
    <Router>
      <Box sx={{ backgroundColor: "grey.100", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/tambah" element={<Tambah />} />
          <Route path="/makanan" element={<Makanan />} />
          <Route path="/minuman" element={<Minuman />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
