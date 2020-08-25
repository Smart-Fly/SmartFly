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
import "./RegisterPage.css";
import MyGoogleLogin from "../../components/MyGoogleLogin";

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
  }, [newUser, history]);

  if (loading) {
    // Tar cari buat loading nya
    return <p>Loading..</p>;
  }

  return (
    <>
      <div className="testbox">
        <h2 className="textHead">Register here</h2>
        <div>
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
                label="You want to start subscription?"
              />
              <div className="termContainer">
                <span className="termStyle" style={{ display: "inline" }}>
                  By clicking Register, you agree on our
                  <span color="blue"> terms and condition</span>.
                </span>
              </div>

              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
              <div className="googleSignIn">
                <span>Or you can sign in with</span>
              </div>
              <div className="googleSignIn-btn">
                <MyGoogleLogin />
              </div>
            </FormGroup>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
