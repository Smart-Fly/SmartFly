import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import client from "./config/config";
import { AnimatedSwitch } from "./animations/";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
         <Navbar /> 
        <AnimatedSwitch />
      </Router>
    </ApolloProvider>
  );
}

export default App;
