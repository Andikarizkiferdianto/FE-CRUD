import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../style/register.css";
import { API_DUMMY } from "../utils/base_url";
import { TextField, Button } from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_DUMMY}/api/user/login`, {
        email: email,
        password: password,
      });
      Swal.fire({
        icon: "success",
        title: "Berhasil Login!!",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.href = "/landingpage";
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <body className="body1 md:text-base lg:h-100vh sm:text-sm">
      <div className="container1">
        <pre>
          <h3>      Login</h3>
        </pre>
        <form onSubmit={login} method="POST">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="textfield" 
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="textfield"
          />

          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
          <p>
            Belum punya akun?
            <a href="/"> Register</a>
          </p>
        </form>
      </div>
    </body>
  );
}
