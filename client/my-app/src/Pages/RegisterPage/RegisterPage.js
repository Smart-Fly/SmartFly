import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  InputLabel,
  FormControl,
  FormGroup,
} from "@material-ui/core";
import { Form } from "react-bootstrap";
import { USER_REGISTER } from "../../query/userQuery";
import { useMutation } from "@apollo/client";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const RegisterPage = () => {
  const history = useHistory();
  const [userInput, setUserInput] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [updateSubs, setUpdateSubs] = useState(false);

  const [register, { data: newUser, loading }] = useMutation(USER_REGISTER);

  const handleOnchance = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setUpdateSubs({ ...updateSubs, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({
      variables: {
        newUserInput: { ...userInput, subsStatus: updateSubs.subsStatus },
      },
    });
  };

  useEffect(() => {
    if (newUser) {
      history.push("/login");
    }
  }, [newUser]);

  if (loading) {
    // Tar cari buat loading nya
    return <p>Loading..</p>;
  }

  return (
    <>
      <div className={["col-md-5 justify-content-start"]}>
        <Form onSubmit={(e) => handleSubmit(e)}>
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

            <FormControlLabel
              control={
                <Checkbox
                  checked={userInput.subsStatus}
                  onChange={handleChange}
                  name="subsStatus"
                  color="primary"
                />
              }
              label="Primary"
            />

            {/*  Nanti disini dikasi checkbox aja, gausah pake Switch, lebih cocok checkBox */}

            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </FormGroup>
        </Form>
      </div>
    </>
  );
};

export default RegisterPage;
