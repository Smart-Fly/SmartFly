import React from "react";
// import Home from "./Pages/Home";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Navbar from "./components/Navbar";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import UpdatePage from "./Pages/UpdatePage";

import { client } from "./config/client";

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Router>
          {/* <Navbar /> */}
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/update" component={UpdatePage} />
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
