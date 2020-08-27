import "./UserPage.css";
import "./UserPageUtils.css";
import ReactCardFlip from "react-card-flip";
import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { USER_LOGIN, USER_REGISTER } from "../../query/userQuery";
import MyGoogleLogin from "../../components/MyGoogleLogin";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Swal from "sweetalert2";
const loginBG = require("../../asset/LoginBG.jpeg");
const logo = require("../../asset/LogoWithoutBg.png");

const UserPage = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  /** =============== START State FOR Login Card ================ */
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const [userLogin, { data: userLoginInfo, loading, error }] = useMutation(
    USER_LOGIN
  );
  /** =============== End State FOR Login Card ================ */

  /** =============== START State FOR register Card ================ */

  const [userRegisterInfo, setUserRegisterInfo] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [updateSubs, setUpdateSubs] = useState(false);
  const [register, { data: dataUserRegistered }] = useMutation(USER_REGISTER);
  const handleLoginOnchance = (e) => {
    const { name, value } = e.target;
    setUserLoginData({ ...userLoginData, [name]: value });
  };
  /** =============== End State FOR register Card ================ */

  const handleSubmitLogin = (e) => {
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
  /** =============== END FUNCTION FOR Login Card ================ */

  /**==================== Start function Register for Register Card =================== */

  const handleRegisterOnChange = (e) => {
    const { name, value } = e.target;
    setUserRegisterInfo({ ...userRegisterInfo, [name]: value });
  };
  const handleCheckOnChange = (e) => {
    const { name, checked } = e.target;
    setUpdateSubs({ ...updateSubs, [name]: checked });
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    register({
      variables: {
        newUserInput: {
          ...userRegisterInfo,
          subsStatus: updateSubs.subsStatus,
        },
      },
    });
  };

  /**==================== End function Register for Register Card =================== */

  return (
    <>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: `url(${loginBG})` }}
        >
          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            {/** =============== START LOGIN CARD ============= */}
            <Card
              className="wrap-login100 p-t-20 p-b-30"
              style={{ border: "none", alignItems: "center" }}
            >
              <form
                className="login100-form"
                onSubmit={(e) => handleSubmitLogin(e)}
              >
                <div className="login100-form-logo m-t-30">
                  <img src={logo} alt="Logo" />
                </div>
                <span className="login100-form-title p-t-20 p-b-20 m-t-20">
                  Login Here
                </span>
                {/* * =========== Start Email Login ============ */}
                <div className="wrap-input100 m-b-10">
                  <input
                    className="input100"
                    placeholder="Email"
                    type="text"
                    name="email"
                    aria-describedby="my-helper-text"
                    onChange={(e) => handleLoginOnchance(e)}
                    style={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "25px",
                      padding: "0px 30px 0px 70px",
                      outline: "none",
                      boxShadow: "none",
                      border: "none",
                    }}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i
                      className="fas fa-envelope"
                      style={{ marginTop: "10px" }}
                    ></i>
                  </span>
                </div>
                {/* * =========== End Email Login ============ */}

                {/* * =========== Start Password Login ============ */}
                <div className="wrap-input100">
                  <input
                    className="input100"
                    placeholder="Password"
                    type="password"
                    name="password"
                    aria-describedby="my-helper-text"
                    onChange={(e) => handleLoginOnchance(e)}
                    style={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "25px",
                      padding: "0px 30px 0px 70px",
                      outline: "none",
                      boxShadow: "none",
                      border: "none",
                    }}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-lock" style={{ marginTop: "10px" }}></i>
                  </span>
                </div>
                {/* * =========== End Password Login ============ */}

                {/* * ========= Start Button Login ======= */}
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
                {/* * ========= end Button Login ======= */}

                {/* * ========= miscellanious Button Login ======= */}
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
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontSize: "20px",
                    }}
                    onClick={handleFlipCard}
                  >
                    Create new Account
                    <i className="fa fa-long-arrow-right p-l-10"></i>
                  </a>
                </div>
                {/* * ========= miscellanious Button Login ======= */}
              </form>
            </Card>
            {/** =============== END LOGIN CARD ============= */}

            {/** =============== START REGISTER CARD ============= */}
            <Card
              className="wrap-login100 p-t-20 p-b-30"
              style={{ border: "none", alignItems: "center" }}
            >
              <form
                className="login100-form"
                onSubmit={(e) => handleRegisterSubmit(e)}
              >
                <div className="login100-form-logo m-t-30">
                  <img src={logo} alt="Logo" />
                </div>
                <span className="login100-form-title p-t-20 p-b-20 m-t-20">
                  Register Here
                </span>
                {/** =============== START Username REGISTER CARD ============= */}
                <div className="wrap-input100 ">
                  <input
                    className="input100"
                    placeholder="Email"
                    type="text"
                    name="userName"
                    aria-describedby="my-helper-text"
                    onChange={(e) => handleRegisterOnChange(e)}
                    style={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "25px",
                      padding: "0px 30px 0px 70px",
                      outline: "none",
                      boxShadow: "none",
                      border: "none",
                    }}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i
                      className="fas fa-user"
                      style={{ marginTop: "10px" }}
                    ></i>
                  </span>
                </div>
                {/** =============== end Username REGISTER CARD ============= */}

                {/* * =========== Start Email Register ============ */}
                <div className="wrap-input100 ">
                  <input
                    className="input100"
                    placeholder="Email"
                    type="text"
                    name="email"
                    aria-describedby="my-helper-text"
                    onChange={(e) => handleRegisterOnChange(e)}
                    style={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "25px",
                      padding: "0px 30px 0px 70px",
                      outline: "none",
                      boxShadow: "none",
                      border: "none",
                    }}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i
                      className="fas fa-envelope"
                      style={{ marginTop: "10px" }}
                    ></i>
                  </span>
                </div>
                {/* * =========== End Email Register ============ */}

                {/* * =========== Start Password Register ============ */}
                <div className="wrap-input100 ">
                  <input
                    className="input100"
                    placeholder="Password"
                    type="password"
                    name="password"
                    aria-describedby="my-helper-text"
                    onChange={(e) => handleRegisterOnChange(e)}
                    style={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "25px",
                      padding: "0px 30px 0px 70px",
                      outline: "none",
                      boxShadow: "none",
                      border: "none",
                    }}
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i
                      className="fas fa-lock"
                      style={{ marginTop: "10px" }}
                    ></i>
                  </span>
                </div>
                {/* * =========== End Password Register ============ */}

                {/* * ========= Start Subscription Register ======= */}

                <div className="wrap-input100 m-t-8">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={userRegisterInfo.subsStatus}
                        onChange={handleCheckOnChange}
                        name="subsStatus"
                        style={{
                          color: "white",
                          paddingLeft: "90px",
                        }}
                        icon={<CheckBoxOutlineBlankIcon fontSize="large" />}
                        checkedIcon={<CheckBoxIcon fontSize="large" />}
                      />
                    }
                    label="You want to start subscription?"
                    labelPlacement="start"
                    style={{
                      color: "white",
                      textDecoration: "none",
                    }}
                  />
                </div>

                {/* * ========= End Subscription Register ======= */}

                {/* * ========= Start Button Register ======= */}
                <div className="container-login100-form-btn p-t-5">
                  <Button
                    className="login100-form-btn"
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleFlipCard}
                  >
                    Register
                  </Button>
                </div>
                {/* * ========= end Button Register ======= */}
              </form>
            </Card>
            {/** =============== END REGISTER CARD ============= */}
          </ReactCardFlip>
        </div>
      </div>
    </>
  );
};

export default UserPage;
