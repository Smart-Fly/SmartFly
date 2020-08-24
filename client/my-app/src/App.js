import React from 'react';
import Home from './Pages/home/Home'
import ListData from './Pages/ListData'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import client from './config/config'
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import UpdatePage from "./Pages/UpdatePage";

function App() {
  return (
    <ApolloProvider client={client}>
      <div >
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/update" component={UpdatePage} />
            <Route path="/:slug" component={ListData} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
