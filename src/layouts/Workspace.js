import React from "react";
import cx from "classnames";
import {Switch, Route, Redirect} from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";

// core components
import WorkspaceNavbar from "../components/Navbars/WorkspaceNavbar";

import Sidebar from "../components/Sidebar/Sidebar.js";

import routes from "../routes/routes.js";

import styles from "../assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";
import labels from "../variables/labels";

let ps;

const useStyles = makeStyles(styles);

export default function Workspace(props) {
    const {...rest} = props;
    // states and functions
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [miniActive, setMiniActive] = React.useState(false);
    const image = require("assets/img/sidebar-2.jpg");
    const color = "green";
    const bgColor = "black";
    const logo = require("../assets/img/logo-white.svg");
    // styles
    const classes = useStyles();
    const mainPanelClasses =
        classes.mainPanel +
        " " +
        cx({
            [classes.mainPanelSidebarMini]: miniActive,
            [classes.mainPanelWithPerfectScrollbar]:
            navigator.platform.indexOf("Win") > -1
        });
    // ref for main panel div
    const mainPanel = React.createRef();
    // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
            document.body.style.overflow = "hidden";
        }
        window.addEventListener("resize", resizeFunction);

        // Specify how to clean up after this effect:
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
            }
            window.removeEventListener("resize", resizeFunction);
        };
    });
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const getActiveRoute = routes => {
        let activeRoute = "";
        for (let i = 0; i < routes.length; i++) {
            if (routes[i].collapse) {
                let collapseActiveRoute = getActiveRoute(routes[i].views);
                if (collapseActiveRoute !== activeRoute) {
                    return collapseActiveRoute;
                }
            } else {
                if (
                    window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
                ) {
                    return routes[i].name;
                }
            }
        }
        return activeRoute;
    };
    const getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.collapse) {
                return getRoutes(prop.views);
            }
            if (prop.layout === "/workspace") {
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
    const sidebarMinimize = () => {
        setMiniActive(!miniActive);
    };
    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false);
        }
    };
    const sidebarRoutes = routes.filter(element => element.layout === "/workspace")

    return (
        <div className={classes.wrapper}>
            <Sidebar
                routes={sidebarRoutes}
                logoText={labels.SERVICE_NAME}
                logo={logo}
                image={image}
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
                color={color}
                bgColor={bgColor}
                miniActive={miniActive}
                {...rest}
            />
            <div className={mainPanelClasses} ref={mainPanel}>
                <WorkspaceNavbar
                    sidebarMinimize={sidebarMinimize.bind(this)}
                    miniActive={miniActive}
                    brandText={getActiveRoute(routes)}
                    handleDrawerToggle={handleDrawerToggle}
                    {...rest}
                />
                <div className={classes.content}>
                    <div className={classes.container}>
                        <Switch>
                            {getRoutes(routes)}
                            <Redirect from="/workspace" to="/workspace/patients"/>
                        </Switch>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
