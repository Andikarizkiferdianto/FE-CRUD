/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { API_DUMMY } from "../utils/base_url";
import "../style/edit.css";
import { Box, TextField, Button, Typography } from "@mui/material";

function Edit() {
  const history = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [link_gambar, setGambar] = useState("");

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/menus/${id}`)
      .then((response) => {
        const drink = response.data;
        setName(drink.name);
        setType(drink.type);
        setPrice(drink.price);
        setDeskripsi(drink.deskripsi);
        setGambar(drink.link_gambar);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan",
          text: `Error: ${error.message}`,
        });
      });
  }, [id]);

  const edit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_DUMMY}/api/menus/${id}`, {
        name,
        type,
        price,
        deskripsi,
        link_gambar,
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil diubah!",
      }).then(() => {
        history("/menu");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: `Terjadi kesalahan: ${error.message}`,
      });
    }
  };

  return (
    <Box className="edit-container" sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Form Edit Data
      </Typography>

      <form onSubmit={edit}>
        <TextField
          fullWidth
          label="Nama Produk"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Tipe Produk"
          variant="outlined"
          value={type}
          onChange={(e) => setType(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          type="number"
          label="Harga"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Deskripsi"
          variant="outlined"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Link Gambar"
          variant="outlined"
          value={link_gambar}
          onChange={(e) => setGambar(e.target.value)}
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default Edit;
