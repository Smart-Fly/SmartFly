import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import client from "./config/config";
import Navbar from "./components/Navbar";
import {
  Home,
  // ListData,
  RegisterPage,
  UserPage,
} from "./Pages";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={UserPage} />
          {/* <Route path="/:slug" component={ListData} /> */}
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
