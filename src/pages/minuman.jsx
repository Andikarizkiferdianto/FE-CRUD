import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { API_DUMMY } from "../utils/base_url";
import "../style/data.css";

function Minuman() {
  const [minuman, setMinuman] = useState([]); // State untuk menyimpan data minuman

  const getMinuman = () => {
    axios
      .get(`${API_DUMMY}/api/menus/type/minuman`) // Filter berdasarkan "type" minuman
      .then((res) => {
        setMinuman(res.data);
      })
      .catch((error) => {
        alert("Terjadi kesalahan: " + error);
      });
  };

  useEffect(() => {
    getMinuman();
  }, []);

  return (
    <div className="data-container">
      <h1>Daftar Minuman</h1>
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th style={{ width: "20px" }}>No</th>
            <th>Nama</th>
            <th>Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {minuman.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.name}</td>
              <td>{row.type}</td>
              <td>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <a className="text-white bg-blue-500 font-semibold py-3 px-36 rounded-md transition duration-200 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
       href="/menu">Kembali</a>
    </div>
  );
}

export default Minuman;
