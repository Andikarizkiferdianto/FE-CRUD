import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_DUMMY } from "../utils/base_url";
import "../style/detail.css";


function Detail() {
  const { id } = useParams();
  const [makanan, setMakanan] = useState([]);

  useEffect(() => {
    const getData = () => {
      axios
        .get(`${API_DUMMY}/api/menus/${id}`)
        .then((data) => setMakanan(data.data))
        .catch((error) => console.log(error));
    };
    getData();
  }, [id]);

  return (
    <div className="detail-container">
      <h3>
        {makanan.name}
      </h3>
      <img src={makanan.link_gambar} alt="" />
      <p className="type">Type : {makanan.type}</p>
      <p className="price">Price : {makanan.price}</p>
      <p className="description">Description : {makanan.deskripsi}</p>
      <br />
      <a className="text-white ml-52 bg-blue-500 font-semibold py-3 px-12 rounded-md transition duration-200 ease-in-out transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
       href="/menu">Kembali</a>
    </div>
  );
}

export default Detail;

