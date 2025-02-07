import React, { useState } from "react";
import { TextField, Button, Box, Typography, Stack } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { API_DUMMY } from "../utils/base_url";
import { uploadImageToS3 } from "../utils/uploadImageToS3";

function Add() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [link_gambar, setGambar] = useState(null);

  const navigate = useNavigate();

  const addData = async (e) => {
    e.preventDefault();

    if (!name || !type || !price || !deskripsi) {
      Swal.fire({
        icon: "warning",
        title: "Harap isi semua field!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      let imageUrl = "";

      if (link_gambar) {
        try {
          imageUrl = await uploadImageToS3(link_gambar);
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Gagal mengunggah gambar!",
            text: err.message || "Terjadi kesalahan saat upload gambar.",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
      }

      const response = await axios.post(
        `${API_DUMMY}/api/menus`,
        {
          name,
          price,
          type,
          deskripsi,
          link_gambar: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Data berhasil ditambahkan!",
          showConfirmButton: true, 
        }).then(() => {
          navigate("/menu"); 
        });
      }
      
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal menambahkan barang",
          text: error.response?.data?.message || "Terjadi kesalahan",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <Box
      sx={{
        padding: "50px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.66)",
        width: { xs: "90%", md: "50%" },
        margin: "auto",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Form Tambah Data
      </Typography>

      <form onSubmit={addData}>
        <Stack spacing={2}>
          <TextField
            label="Nama Produk"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Tipe Produk"
            variant="outlined"
            fullWidth
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <TextField
            label="Harga"
            variant="outlined"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            label="Deskripsi"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setGambar(e.target.files[0])}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#fff",
            }}
          />
          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              sx={{
                backgroundColor: "#007bff",
                borderColor: "#007bff",
                borderRadius: "5px",
                padding: "10px 30px",
                fontWeight: "bold",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              Submit
            </Button>
            <a
              className="text-white ml-72 bg-blue-500 font-semibold py-3 px-12 rounded-md transition duration-200 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              href="/menu"
            >
              Kembali
            </a>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}

export default Add;
