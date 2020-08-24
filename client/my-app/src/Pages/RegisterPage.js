import React, { useState } from "react";
import {
  Input,
  Button,
  // FormGroup,
  // Checkbox,
  InputLabel,
  FormControl,
  // FormControlLabel,
} from "@material-ui/core";
import { USER_REGISTER } from "../query/userQuery";
import { useMutation } from "@apollo/client";

const RegisterPage = () => {
  const [userInput, setUserInput] = useState({
    userName: "",
    email: "",
    password: "",
    subsStatus: false,
  });

  const [register, { data: newUser, loading }] = useMutation(USER_REGISTER);

  const handleOnchance = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({
      variables: { newUserInput: userInput },
    });
  };

  if (newUser) {
    console.log(newUser, "SUCCESS BUAT USER");
  }

  if (loading) {
    // Tar cari buat loading nya
    return <p>Loading..</p>;
  }

  return (
    <>
      {/* <FormGroup className="container w-50"> */}
      {/* <FormControl onSubmit={(e) => handleSubmit(e)}> */}
      <div style={{ justifyContent: "center" }}>
        <form className="container w-50" onSubmit={(e) => handleSubmit(e)}>
          <h1>REGISTER PAGE</h1>
          <FormControl>
            <InputLabel>User name</InputLabel>
            <Input
              type="text"
              name="userName"
              aria-describedby="my-helper-text"
              onChange={(e) => handleOnchance(e)}
            />
          </FormControl>

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

          {/*  Nanti disini dikasi checkbox aja, gausah pake Switch, lebih cocok checkBox */}

          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
      </div>
      {/* </FormControl> */}
      {/* </FormGroup> */}
    </>
  );
};

export default RegisterPage;
