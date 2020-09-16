import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";

// core components
import Button from "components/CustomButtons/Button";

import styles from "../../assets/jss/material-dashboard-pro-react/components/authNavbarStyle.js";
import labels from "../../variables/labels";
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import Cookies from 'universal-cookie';/////////////////////

const useStyles = makeStyles(styles);

export default function AuthNavbar(props) {
    const cookies = new Cookies();///////////////////
    const [open, setOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setOpen(!open);
    };
    // verifies if routeName is the one active (in browser input)
    const activeRoute = routeName => {
        return window.location.href.indexOf(routeName) > -1;
    };
    const classes = useStyles();
    const {color} = props;
    const appBarClasses = cx({
        [" " + classes[color]]: color
    });

    const list_pages=[////////////////
        {
            title:"Защищенная",
            url:"/workspace/patients",
            onlyAuth:true
        },
        {
            title:labels.REGISTRATION,
            url:"/auth/register-page",
            onlyAuth:false
        },
        {
            title:labels.LOGIN,
            url:"/auth/login-page",
            onlyAuth:false
        }
    ];
    const AUTH={
        LOGIN:cookies.get('LOGIN'),
        PASSWORD:cookies.get('PASSWORD'),
        isAUTH:cookies.get('LOGIN')&&cookies.get('PASSWORD')?true:false
    }

    const list=list_pages.map((OBJ)=>{
        if(!AUTH.isAUTH && OBJ.onlyAuth) 
            return null;
        else
            return <ListItem className={classes.listItem}>
                        <NavLink
                            to={OBJ.url}
                            className={cx(classes.navLink, {
                                [classes.navLinkActive]: activeRoute(OBJ.url)
                            })}
                        >
                            <ListItemText
                                primary={OBJ.title}
                                disableTypography={true}
                                className={classes.listItemText}
                            />
                        </NavLink>
                    </ListItem>
    })

 
    
    return (
        <AppBar position="static" className={classes.appBar + appBarClasses}>
            <Toolbar className={classes.container}>
                <Hidden smDown>
                    <div className={classes.flex}>
                    </div>
                </Hidden>
                <Hidden mdUp>
                    <div className={classes.flex}>
                    </div>
                </Hidden>
                <Hidden smDown>
                    <List className={classes.list}>
                        {list}
                    </List>
                </Hidden>
                <Hidden mdUp>
                    <Button
                        className={classes.sidebarButton}
                        color="transparent"
                        justIcon
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                    >
                        <Menu/>
                    </Button>
                </Hidden>
                <Hidden mdUp>
                    <Hidden mdUp>
                        <Drawer
                            variant="temporary"
                            anchor={"right"}
                            open={open}
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true // Better open performance on mobile.
                            }}
                        >
                            <List className={classes.list}>
                                {list}
                            </List>
                        </Drawer>
                    </Hidden>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}

AuthNavbar.propTypes = {
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
    brandText: PropTypes.string
};
