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
              <span className="login100-form-title p-t-20 p-b-40 m-t-35">
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
                  }}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-user"></i>
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
                  }}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <div>
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </div>
              <div className="text-center p-t-46 p-b-20">
                <a className="txt2" href="/register">
                  sign up
                </a>
                <span className="txt2"> or login using</span>
              </div>
              <div className="flex-c-m">
                <MyGoogleLogin />
              </div>
            </form>

            {/* <Form className="login100-form" onSubmit={(e) => handleSubmit(e)}>
              <Form.Group>
                <FormControl>
                  <InputLabel>Email</InputLabel>
                  <Input
                    type="text"
                    name="email"
                    aria-describedby="my-helper-text"
                    onChange={(e) => handleOnchance(e)}
                    className="input100"
                  />
                </FormControl>

                <FormControl>
                  <InputLabel>Password</InputLabel>
                  <Input
                    type="password"
                    name="password"
                    aria-describedby="my-helper-text"
                    onChange={(e) => handleOnchance(e)}
                    className="input100"
                  />
                </FormControl>

                <div>
                  <Button type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                </div>

                <div className="text-center p-t-46 p-b-20">
                  <a className="txt2" href="/register">
                    sign up
                  </a>
                  <span className="txt2"> or login using</span>
                </div>

                <div className="flex-c-m">
                  <MyGoogleLogin />
                </div>
              </Form.Group>
            </Form> */}
          </div>
        </div>
      </div>

      {/* <div className="container-login100">
        <div className="wrap-login100"> */}
      {/** [======== SACRED LINE ==========] */}
      {/* <Form className="login100-form" onSubmit={(e) => handleSubmit(e)}>
            <span className="login100-form-title mb-4">
              Login to start Exploring
            </span>
            <Form.Group>
              <FormControl className="wrap-input100">
                <InputLabel className="label-input100">Email</InputLabel>
                <span className="focus-input100"></span>
                <Input
                  type="text"
                  name="email"
                  aria-describedby="my-helper-text"
                  onChange={(e) => handleOnchance(e)}
                  className="input100"
                />
              </FormControl>

              <FormControl className="wrap-input100">
                <InputLabel className="label-input100">Password</InputLabel>
                <span className="focus-input100"></span>
                <Input
                  type="password"
                  name="password"
                  aria-describedby="my-helper-text"
                  onChange={(e) => handleOnchance(e)}
                  className="input100"
                />
              </FormControl>

              <div className="container-login100-form-btn ">
                <Button
                  className="login100-form-btn"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </div>

              <div className="text-center p-t-46 p-b-20">
                <a className="txt2" href="/register">
                  sign up
                </a>
                <span className="txt2"> or login using</span>
              </div>

              <div className="flex-c-m">
                <MyGoogleLogin />
              </div>
            </Form.Group>
          </Form>
          <div className="login-100-more">
            <p>haahahah</p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default LoginPage;
