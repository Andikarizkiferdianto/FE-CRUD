import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { API_DUMMY } from "../utils/base_url";
import "../style/data.css";

function Data() {
  const [makanan, setMakanan] = useState([]); // State berfungsi untuk menyimpan data sementara

  const getAll = () => {
    axios // axios berfungsi untuk request data melalui http
      .get(`${API_DUMMY}/api/menus`) // mengambil data dari link tersebut
      .then((res) => {
        setMakanan(res.data);
      })
      .catch((error) => {
        alert("Terjadi kesalahan: " + error);
      });
  };

  const deleteUser = async (id) => {
    axios
      .delete(`${API_DUMMY}/api/menus/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="data-container">
      <a
        className="text-white bg-blue-500 font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        href="/tambah"
      >
        Tambah
      </a>
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

export default Data;
