import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Route, Switch, withRouter } from "react-router-dom";
import {
  RegisterPage,
  LoginPage,
  ProfilePage,
  Home,
  ListData,
} from "../../Pages";
import "./AnimatedSwitch.css";

const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="slide" timeout={1000}>
      <Switch location={location}>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/update" component={ProfilePage} />
        <Route path="/:slug" component={ListData} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

export default AnimatedSwitch;
