
import React, { useEffect, useState } from "react";/////////////////////////
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";

// core components
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardFooter from "../../components/Card/CardFooter.js";
import Cookies from 'universal-cookie';
import styles from "../../assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

import labels from "../../variables/labels";

const useStyles = makeStyles(styles);

export default function LoginPage() {
  const cookies = new Cookies();///////////////////
  const classes = useStyles();
  const [login, setLogin] = useState(null);/////////////
  const [password, setPassword] = useState(null);////////////////////


 const SignIn=()=>{
  //Тут запрос к бэку и проверка валидности данных, и если они валидны, то запомнить куки
  cookies.set('LOGIN', login, { path: '/' });
  cookies.set('PASSWORD', password, { path: '/' });
  window.location.reload();
 }

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form>
            <Card login>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="primary"
              >
                <h4 className={classes.cardTitle}>{labels.LOGIN}</h4>

              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText={labels.EMAIL}
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    onChange:event => setLogin(event.target.value)////////////////
                  }}
                />
                <CustomInput
                  labelText={labels.PASSWORD}
                  id="password"
                  formControlProps={{
                    fullWidth: true
                  }}
                 
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    type: "password",
                    autoComplete: "off",
                    onChange:event => setPassword(event.target.value)////////////////
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="primary" simple onClick={SignIn} size="lg" block>
                  {labels.ENTER}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
