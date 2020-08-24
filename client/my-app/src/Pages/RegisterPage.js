import React, { useState } from "react";
import {
  Input,
  Button,
  InputLabel,
  FormControl,
  FormGroup,
} from "@material-ui/core";
import { styled, makeStyles } from "@material-ui/core/styles";
import { USER_REGISTER } from "../query/userQuery";
import { useMutation } from "@apollo/client";
import { Container, Row, Form } from "react-bootstrap";

const useStyle = makeStyles({
  formStyle: {
    marginTop: "10%",
    justifyContent: "center",
    height: 20,
    flex: 1,
  },
});

const RegisterPage = () => {
  const [userInput, setUserInput] = useState({
    userName: "",
    email: "",
    password: "",
    subsStatus: false,
  });

  const classes = useStyle();
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
      <div className={["col-md-5 justify-content-start"]}>
        {/* <Form onSubmit={(e) => handleSubmit(e)}> */}
        <FormGroup>
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
        </FormGroup>
        {/* </Form> */}
      </div>
    </>
  );
};

export default RegisterPage;
