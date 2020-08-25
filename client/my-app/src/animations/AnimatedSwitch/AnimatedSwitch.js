import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./AnimatedSwitch.css";
import {
  Home,
  ListData,
  RegisterPage,
  LoginPage,
  ProfilePage,
} from "../../Pages";

const AnimatedSwitch = withRouter(({ location }) => {
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="slide" timeout={1000}>
        <Switch location={location}>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/update" component={ProfilePage} />
          <Route path="/:slug" component={ListData} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
});

export default AnimatedSwitch;
