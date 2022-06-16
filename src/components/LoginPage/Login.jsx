import { useEffect, useState } from "react";
import "./Login.scss";
import { loginApi } from "../../services/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("EMail / Password is required");
      return;
    }
    setLoadingApi(true);
    let res = await loginApi(email, password);
    console.log("check res", res);
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingApi(false);
  };
  return (
    <>
      <div className="login-container col-12 col-sm-4">
        <div className="title">Log in</div>
        <div className="text">Email or username</div>
        <div>
          eve.holt@reqres.in <br />
        </div>
        <input
          type="text"
          placeholder="Email or username..."
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <div className="input-2">
          <input
            type={isShowPassword === true ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <i
            className={
              isShowPassword === true
                ? "fa-solid fa-eye"
                : "fa-solid fa-eye-slash"
            }
            onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
        </div>

        <button
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
          onClick={() => handleLogin()}
        >
          {loadingApi && <i class="fas fa-spinner fa-spin"></i>}
          &nbsp;Login
        </button>
        <div className="back">
          {" "}
          <i className="fa-solid fa-angles-left"></i> Go back
        </div>
      </div>
    </>
  );
}

export default Login;
