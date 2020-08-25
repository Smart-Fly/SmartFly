import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import client from "./config/config";
import { AnimatedSwitch } from "./animations/";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AnimatedSwitch />
      </Router>
    </ApolloProvider>
  );
}

export default App;
