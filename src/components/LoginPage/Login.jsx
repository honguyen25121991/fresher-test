import { useContext, useEffect, useState } from "react";
import "./Login.scss";
import { loginApi } from "../../services/UserService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
function Login() {
  let navigate = useNavigate();
  const { loginContext } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("EMail / Password is required");
      return;
    }
    setLoadingApi(true);

    let res = await loginApi(email.trim(), password);
    if (res && res.token) {
      loginContext(email, res.token);
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingApi(false);
  };
  const handleGoBack = () => {
    navigate("/");
  };
  const handlePressEnter = (event) => {
    if (event && event.keyCode === 13) {
      loginContext(email);
      navigate("/");
    }
  };
  return (
    <>
      <div className="login-container col-sm-12 col-12 col-sm-4">
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
            onKeyDown={(event) => handlePressEnter(event)}
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
          {loadingApi && <i className="fas fa-spinner fa-spin"></i>}
          &nbsp;Login
        </button>
        <div className="back">
          <i className="fa-solid fa-angles-left"></i>
          <span onClick={() => handleGoBack()}>&nbsp;Go Back</span>
        </div>
      </div>
    </>
  );
}

export default Login;
