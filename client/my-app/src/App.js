import React from 'react';
import Home from './Pages/Home'
import Result from './Pages/Result'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import client from './config/config'


function App() {
  return (
    <div >
      <ApolloProvider client={client}>
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:slug" component={Result} />
        </Switch>
      </Router>
    </ApolloProvider>
    </div>
  );
}

export default App;
