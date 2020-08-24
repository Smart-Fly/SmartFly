import React, { useState } from "react";
import {
  Input,
  Button,
  // Switch,
  // FormGroup,
  InputLabel,
  FormControl,
  // FormControlLabel,
} from "@material-ui/core";
import { USER_LOGIN } from "../query/userQuery";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const [userLogin, { data, loading }] = useMutation(USER_LOGIN);

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

  if (data) {
    const {
      userLogin: { access_token },
    } = data;
    localStorage.setItem("access_token", access_token);
    history.push("/update");
  }

  if (loading) {
    // Tar cari buat loading nya
    return <p>Loading..</p>;
  }

  return (
    <>
      <div style={{ justifyContent: "center" }}>
        <form className="container w-50" onSubmit={(e) => handleSubmit(e)}>
          <h1>login PAGE</h1>

          <FormControl>
            <InputLabel>Email</InputLabel>
            <Input
              type="text"
              name="email"
              aria-describedby="my-helper-text"
              onChange={(e) => handleOnchance(e)}
            />
          </FormControl>

          <FormControl>
            <InputLabel>Password</InputLabel>
            <Input
              type="password"
              name="password"
              aria-describedby="my-helper-text"
              onChange={(e) => handleOnchance(e)}
            />
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
