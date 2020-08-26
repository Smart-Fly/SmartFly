import "./LoginPage.css";
import "./LoginPageUtil.css";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { USER_LOGIN } from "../../query/userQuery";
import MyGoogleLogin from "../../components/MyGoogleLogin";
const loginBG = require("../../asset/LoginBG.jpeg");
const logo = require("../../asset/LogoWithoutBg.png");

const LoginPage = () => {
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const [userLogin, { data: userLoginInfo, loading }] = useMutation(USER_LOGIN);
  const handleOnchance = (e) => {
    const { name, value } = e.target;
    setUserLoginData({ ...userLoginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin({
      variables: {
        loginInfo: userLoginData,
      },
    });
  };

  useEffect(() => {
    if (userLoginInfo) {
      const {
        userLogin: { access_token, subsStatus, userName },
      } = userLoginInfo;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("subsStatus", subsStatus);
      localStorage.setItem("userName", userName);
      history.push("/");
    }
  }, [userLoginInfo, history]);

  if (loading) {
    // Tar cari buat loading nya
    return <p>Loading..</p>;
  }

  return (
    <>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: `url(${loginBG})` }}
        >
          <div className="wrap-login100 p-t-20 p-b-30">
            <form className="login100-form" onSubmit={(e) => handleSubmit(e)}>
              <div className="login100-form-logo">
                <img src={logo} alt="Logo" />
              </div>
              <span className="login100-form-title p-t-20 p-b-30 m-t-35">
                Login Here
              </span>
              {/** =========== Email ============ */}

              <div className="wrap-input100 m-b-10">
                <input
                  className="input100"
                  placeholder="Email"
                  type="text"
                  name="email"
                  aria-describedby="my-helper-text"
                  onChange={(e) => handleOnchance(e)}
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "25px",
                    padding: "0px 30px 0px 70px",
                  }}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-user" style={{ marginTop: "10px" }}></i>
                </span>
              </div>

              {/** =========== Password ============ */}

              <div className="wrap-input100">
                <input
                  className="input100"
                  placeholder="Password"
                  type="password"
                  name="password"
                  aria-describedby="my-helper-text"
                  onChange={(e) => handleOnchance(e)}
                  style={{
                    width: "100%",
                    height: "50px",
                    borderRadius: "25px",
                    padding: "0px 30px 0px 70px",
                    outline: "none",
                  }}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" style={{ marginTop: "10px" }}></i>
                </span>
              </div>
              {/** ========= Button ======= */}
              <div className="container-login100-form-btn p-t-17">
                <Button
                  className="login100-form-btn"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </div>
              <div className="p-t-15 p-b-20" style={{ display: "inherit" }}>
                <div className="p-l-8">
                  <MyGoogleLogin />
                </div>
                <span
                  className="p-r-13 p-l-15 p-t-7"
                  style={{ color: "white", fontSize: "20px" }}
                >
                  Or{" "}
                </span>
                <a
                  className="txt1 p-r-20 p-t-7 "
                  href="/register"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "20px",
                  }}
                >
                  Create new Account
                  <i className="fa fa-long-arrow-right p-l-10"></i>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
