import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Table } from "@mui/material";
import { API_DUMMY } from "../utils/base_url";
import "../style/data.css";

function Makanan() {
  const [makanan, setMakanan] = useState([]); 

  const getMakanan = () => {
    axios
      .get(`${API_DUMMY}/api/menus/type/makanan`) 
      .then((res) => {
        setMakanan(res.data);
      })
      .catch((error) => {
        alert("Terjadi kesalahan: " + error);
      });
  };

  useEffect(() => {
    getMakanan();
  }, []);

  return (
    <div className="data-container">
      <h1 className="font-semibold">Daftar Makanan</h1>
      <Table className="table" style={{ border: "1px solid #dee2e6" }}>
        <thead>
          <tr>
            <th style={{ width: "20px" }}>No</th>
            <th>Nama</th>
            <th>Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {makanan.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.name}</td>
              <td>{row.type}</td>
              <td>{row.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <a
        className="text-white bg-blue-500 font-semibold py-3 px-36 rounded-md transition duration-200 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        href="/menu"
      >
        Kembali
      </a>
    </div>
  );
}

export default Makanan;
