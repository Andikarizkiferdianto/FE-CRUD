import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../style/register.css"
import { API_DUMMY } from "../utils/base_url";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");                            
   
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    // try catch untuk memastikan trjdi kesalahan
    try {
      // library opensource yg digunkan untuk request data melalui http
      await axios.post(`${API_DUMMY}/api/user/login `,
        {
          email: email,
          password: password,
        }
        // headers berikut berfungsi untuk method yg hanya diakses oleh admin
      );
      // Sweet alert
      Swal.fire({
        icon: "success",
        title: "Berhasil Login!!",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/menu");
        window.location.href = ""
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <body className="body1 md:text-base lg:h-100vh sm:text-sm">
      <div className="container1">
        <pre><h3>     Login</h3></pre>
        <form onSubmit={register} method="POST">
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

          <button type="submit">Login</button>
          <p>
            {" "}
            Belum punya akun?
            <a href="/"> Register</a>
          </p>
        </form>
      </div>
    </body>
  );
}