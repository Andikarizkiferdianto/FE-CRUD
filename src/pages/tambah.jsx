// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { API_DUMMY } from "../utils/base_url";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Add() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [link_gambar, setGambar] = useState("");
  const navigate = useNavigate();

  const addData = async (e) => {
    e.preventDefault(); // Menghindari reload halaman

    try {
      await axios.post(`${API_DUMMY}/api/menus`, {
        name: name, // Properti sebelah kiri dari API, sebelah kanan dari state
        price: price,
        type: type,
        deskripsi: deskripsi,
        link_gambar: link_gambar,
      });
      Swal.fire({
        icon: "success",
        title: "Data berhasil ditambahkan!!",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/menu");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "50px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.66)", width: "50%", margin: "auto" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Form Tambah Data</h1>

      <Form onSubmit={addData}>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Nama Produk</Form.Label>
          <Form.Control
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nama Produk"
            style={{ borderRadius: "4px", padding: "6px", margin: "7px", boxShadow: "0 3px 8px rgba(0, 0, 0, 0.19)" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Tipe Produk</Form.Label>
          <Form.Control
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Tipe Produk"
            style={{ borderRadius: "4px", padding: "6px", margin: "7px", boxShadow: "0 3px 8px rgba(0, 0, 0, 0.19)" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Harga</Form.Label>
          <Form.Control
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Harga"
            style={{ borderRadius: "4px", padding: "6px", margin: "7px", boxShadow: "0 3px 8px rgba(0, 0, 0, 0.19)" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Deskripsi</Form.Label>
          <Form.Control
            type="text"
            name="deskripsi"
            id="deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Deskripsi"
            style={{ borderRadius: "4px", padding: "6px", margin: "7px", boxShadow: "0 3px 8px rgba(0, 0, 0, 0.19)" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Link Gambar</Form.Label>
          <Form.Control
            type="text"
            name="link_gambar"
            id="link_gambar"
            value={link_gambar}
            onChange={(e) => setGambar(e.target.value)}
            placeholder="Link Gambar"
            style={{ borderRadius: "4px", padding: "6px", margin: "7px", boxShadow: "0 3px 8px rgba(0, 0, 0, 0.19)" }}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          style={{
            backgroundColor: "#007bff",
            borderColor: "#007bff",
            borderRadius: "5px",
            padding: "10px 30px",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Submit
        </Button>
        <a className="text-white ml-72 bg-blue-500 font-semibold py-3 px-12 rounded-md transition duration-200 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
       href="/menu">Kembali</a>
      </Form>
    </div>
  );
}

export default Add;
