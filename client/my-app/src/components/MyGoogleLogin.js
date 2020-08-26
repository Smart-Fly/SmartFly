import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "../helpers/helpers";
import { GOOGLE_LOGIN } from "../query/userQuery";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const clientId =
  "693667960374-3ju9us80va9h2rhqg8lnjkj0k96nji7g.apps.googleusercontent.com";

const MyGoogleLogin = () => {
  const history = useHistory();
  const [googleLogin, { data }] = useMutation(GOOGLE_LOGIN);
  const onSuccess = (res) => {
    console.log(`login success`, res);
    if (res) {
      googleLogin({
        variables: {
          tokenFromGoogle: res.tokenId,
        },
      });
    }
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log(`login failed:`, res);
  };

  useEffect(() => {
    if (data) {
      const {
        googleLogin: { access_token },
      } = data;
      localStorage.setItem("access_token", access_token);
      history.push("/");
    }
  }, [data, history]);

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px", width: "70px" }}
      />
    </div>
  );
};

export default MyGoogleLogin;
