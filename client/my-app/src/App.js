import React from 'react';
import Home from './Pages/Home'
import Result from './Pages/ListData'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import client from './config/config'
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import UpdatePage from "./Pages/UpdatePage";

import { client } from "./config/client";

function App() {
  return (
    <div >
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:slug" component={Result} />
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
