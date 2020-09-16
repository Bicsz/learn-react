import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";


import AuthNavbar from "../components/Navbars/AuthNavbar.js";

import routes from "../routes/routes.js";

import styles from "../assets/jss/material-dashboard-pro-react/layouts/authStyle.js";

import register from "../assets/img/register.jpeg";
import login from "../assets/img/login.jpeg";
import Cookies from 'universal-cookie';

const useStyles = makeStyles(styles);

export default function Pages(props) {
  const { ...rest } = props;

  const wrapper = React.createRef();

  const classes = useStyles();
  React.useEffect(() => {
    document.body.style.overflow = "unset";
    return function cleanup() {};
  });

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBgImage = () => {
    if (window.location.pathname.indexOf("/auth/register-page") !== -1) {
      return register;
    } else if (window.location.pathname.indexOf("/auth/login-page") !== -1) {
      return login;
    }
  };

  return (
    <div>
      <AuthNavbar {...rest} />
      <div className={classes.wrapper} ref={wrapper}>
        <div
          className={classes.fullPage}
          style={{ backgroundImage: "url(" + getBgImage() + ")" }}
        >
          <Switch>
            {getRoutes(routes)}
            <Redirect from="/auth" to="/auth/login-page" />
          </Switch>
        </div>
      </div>
    </div>
  );
}
