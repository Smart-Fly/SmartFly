import React from 'react';
import Home from './Pages/Home'
import Result from './Pages/Result'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import  client  from './config'


function App() {
  return (
    <ApolloProvider client={client}>
    <div >
      {/* <ApolloProvider client={client}>
      </ApolloProvider> */}
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/res/:departure/:arrival" component={Result} />
        </Switch>
      </Router>
    </div>
    </ApolloProvider>
  );
}

export default App;
