/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { API_DUMMY } from "../utils/base_url";
import "../style/data.css";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

function SearchResults() {
  const [makanan, setMakanan] = useState([]);
  // Ambil query pencarian dari URL, misalnya: /hasil?query=nama-menu
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";
  // State untuk input pencarian (pre-filled dengan query)
  const [searchQuery, setSearchQuery] = useState(query);

  // Jika query kosong, alihkan ke halaman /menu
  useEffect(() => {
    if (query.trim() === "") {
      navigate("/menu");
      return;
    }
    // Jika query tidak kosong, ambil data pencarian berdasarkan query
    axios
      .get(`${API_DUMMY}/api/menus/menu/${query}`)
      .then((res) => {
        setMakanan(res.data);
      })
      .catch((error) => {
        alert("Terjadi kesalahan saat mencari data: " + error);
      });
  }, [query, navigate]);

  const deleteUser = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_DUMMY}/api/menus/${id}`)
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
          });
      }
    });
  };

  return (
    <div className="data-container">
      <div
        className="button-search-container"
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <a className="custom-button" href="/tambah" style={{ marginRight: "10px" }}>
          Tambah
        </a>
        <a className="custom-button-emerald" href="/makanan" style={{ marginRight: "10px" }}>
          Makanan
        </a>
        <a className="custom-button-emerald" href="/minuman" style={{ marginRight: "20px" }}>
          Minuman
        </a>

        <TextField
          placeholder="Cari menu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          style={{
            width: "300px",
            marginRight: "10px",
          }}
          InputProps={{
            style: {
              padding: "0px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            },
          }}
        />
        <Button
          onClick={() => (window.location.href = `/hasil?query=${searchQuery}`)}
          variant="contained"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cari
        </Button>
      </div>
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th style={{ width: "20px" }}>No</th>
            <th>Nama</th>
            <th>Type</th>
            <th>Price</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {makanan.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.name}</td>
              <td>{row.type}</td>
              <td>{row.price}</td>
              <td>
                <a href={"/edit/" + row.id} className="button edit">
                  Edit
                </a>
                <button
                  className="button delete"
                  onClick={() => deleteUser(row.id)}
                >
                  Hapus
                </button>
                <a href={"/detail/" + row.id} className="button detail">
                  Detail
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SearchResults;
