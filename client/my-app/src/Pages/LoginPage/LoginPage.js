import "./LoginPage.css";
import "./LoginPageUtil.css";
import { Form } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { USER_LOGIN } from "../../query/userQuery";
import MyGoogleLogin from "../../components/MyGoogleLogin";
import { Input, Button, InputLabel, FormControl } from "@material-ui/core";
import client, { userCache } from "../../config/config";
import { GET_CACHE_USER } from "../../query/cacheQuery";

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

  const addToCache = (userLoginInfo) => {
    const { cacheUser } = client.readQuery({
      query: GET_CACHE_USER,
    });

    if (userLoginInfo) {
      const {
        userLogin: { subsStatus, userName },
      } = userLoginInfo;
      client.writeQuery({
        query: GET_CACHE_USER,
        data: {
          cacheUser: {
            userNameCache: userName,
            subsStatusCache: subsStatus,
          },
        },
      });
    }
    return cacheUser;
  };

  useEffect(() => {
    if (userLoginInfo) {
      addToCache(userLoginInfo);
    }
  }, [addToCache, userLoginInfo]);

  useEffect(() => {
    if (userLoginInfo) {
      const {
        userLogin: { access_token, subsStatus, userName },
      } = userLoginInfo;
      let generateUserCache = {
        cacheUsername: userName,
        cacheSubstatus: subsStatus,
      };
      userCache(generateUserCache);
      localStorage.setItem("access_token", access_token);
      history.push("/");
    }
  }, [userLoginInfo, history]);

  if (loading) {
    // Tar cari buat loading nya
    return <p>Loading..</p>;
  }

  return (
    <>
      <div className="container-login100">
        <div className="wrap-login100">
          {/** [======== SACRED LINE ==========] */}
          <Form className="login100-form" onSubmit={(e) => handleSubmit(e)}>
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
          <div
            className="login-100-more"
            style={{
              backgroundImage: `url(https://miro.medium.com/max/5778/1*ne8pqysxw4k1EJ_asfwS5w.jpeg)`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
