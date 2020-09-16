/*!

=========================================================
* Material Dashboard PRO React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import Cookies from 'universal-cookie';


import AuthLayout from "layouts/Auth.js";
import Workspace from "./layouts/Workspace.js";

import "./assets/scss/material-dashboard-pro-react.scss?v=1.9.0";
const cookies = new Cookies();///////////////////
const hist = createBrowserHistory();

    var LOGIN = cookies.get("LOGIN")!=""?cookies.get("LOGIN"):null;
    var PASSWORD= cookies.get("PASSWORD")!=""?cookies.get("PASSWORD"):null;
    if(LOGIN!=null && PASSWORD!=null){
        debugger;
        //Отправка на бэк запроса с кукисами логина и пароля
        getServerResult(true);//будто бы авторизация прошла успешно
    }else getServerResult(false);

function getServerResult(result){
    if(result)
        var Routs=<Switch>
                
                <Route path="/workspace" component={Workspace}/>
                <Redirect from="/" to="/workspace"/>
            </Switch>
        else
            var Routs=<Switch>
                <Route path="/auth" component={AuthLayout}/>
                
                <Redirect from="/" to="/auth/login-page"/>
            </Switch>
    

    ReactDOM.render(
        <Router history={hist}>
            {Routs}
        </Router>,
        document.getElementById("root")
    );
}


