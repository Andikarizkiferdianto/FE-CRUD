/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_DUMMY } from "../utils/base_url";
import "../style/detail.css";
import { Box, Typography, Button } from "@mui/material";

function Detail() {
  const { id } = useParams();
  const [makanan, setMakanan] = useState({});

  useEffect(() => {
    axios
      .get(`${API_DUMMY}/api/menus/${id}`)
      .then((response) => setMakanan(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <Box className="detail-container">
      <Typography variant="h3" component="h3">
        {makanan.name}
      </Typography>
      <img src={makanan.link_gambar} alt="" />
      <Typography variant="body1" component="p" className="type">
        Type : {makanan.type}
      </Typography>
      <Typography variant="body1" component="p" className="price">
        Price : {makanan.price}
      </Typography>
      <Typography variant="body1" component="p" className="description">
        Description : {makanan.deskripsi}
      </Typography>
      <br />
      <Button
        component="a"
        href="/menu"
        sx={{
          color: "white",
          ml: "13rem",
          backgroundColor: "#3B82F6", 
          fontWeight: 600, 
          py: 1.5, 
          px: 6,   
          borderRadius: "0.375rem", 
          transition: "all 0.2s ease-in-out",
          textDecoration: "none",
          "&:hover": {
            backgroundColor: "#2563EB", 
            transform: "scale(1.05)",
          },
          "&:focus": {
            outline: "none",
            boxShadow: "0 0 0 2px #2563EB", 
          },
        }}
      >
        Kembali
      </Button>
    </Box>
  );
}

export default Detail;
