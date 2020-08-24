import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import client from "./config/config";
import { AnimatedSwitch } from "./animations/";

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Router>
          <Navbar />
          <AnimatedSwitch />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
