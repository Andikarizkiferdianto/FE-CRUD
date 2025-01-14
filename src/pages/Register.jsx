import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../style/register.css"
import { API_DUMMY } from "../utils/base_url";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");                              
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    // try catch untuk memastikan trjdi kesalahan
    try {
      // library opensource yg digunkan untuk request data melalui http
      await axios.post(`${API_DUMMY}/api/user/register `,
        {
          email: email,
          password: password,
          username: username,
        }
      );
      // Sweet alert
      Swal.fire({
        icon: "success",
        title: "Berhasil Register!!",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <body className="body1 md:text-base lg:h-100vh sm:text-sm">
      <div className="container1">
        <h3>Registrasi</h3>
        <form onSubmit={register} method="POST">
          <label>Username</label>
          <br />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            type="text"
          />
          <br />
          <label>Email</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          <br />
          <label>Password</label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
          />
          <br />

          <button type="submit">Register</button>
          <p>
            {" "}
            Sudah punya akun?
            <a href="/login"> Login</a>
          </p>
        </form>
      </div>
    </body>
  );
}