import React from 'react';
import Home from './Pages/Home'
import Result from './Pages/Result'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'


function App() {
  return (
    <div >
      {/* <ApolloProvider client={client}>
      </ApolloProvider> */}
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/res" component={Result} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
