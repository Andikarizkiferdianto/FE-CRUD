import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import { API_DUMMY } from "../utils/base_url";
import "../style/edit.css";

function Edit() {
  const history = useNavigate();
  const { id } = useParams(); // mengambil nilai parameter yg ada di URL browser
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [link_gambar, setGambar] = useState("");

  // function get Id
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
    <div className="edit-container">
      <h1>Form Edit Data</h1>

      <Form onSubmit={edit}>
        <Form.Group className="mb-3">
          <Form.Label>Nama Produk</Form.Label>
          <Form.Control
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nama Produk"
            style={{ borderRadius: "4px", padding: "6px", margin: "7px" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tipe Produk</Form.Label>
          <Form.Control
            name="type"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            type="text"
            placeholder="nama Produk"
            style={{ borderRadius: "4px", padding: "6px", margin: "7px" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Harga</Form.Label>
          <Form.Control
            type="number"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Harga"
            style={{ borderRadius: "4px", padding: "6px", margin: "7px" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control
            type="text"
            name="text"
            id="deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Deskripsi"
            style={{ borderRadius: "4px", padding: "6px", margin: "7px" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Link Gambar</Form.Label>
          <Form.Control
            type="text"
            name="link_gambar"
            id="link_gambar"
            value={link_gambar}
            onChange={(e) => setGambar(e.target.value)}
            placeholder="Link Gambar"
            style={{ borderRadius: "4px", padding: "6px", margin: "7px" }}
          />
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default Edit;
