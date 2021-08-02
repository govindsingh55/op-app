/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link, Switch, Redirect } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ContentRoute } from "../../../../_metronic/layout";
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";

import MenuIcon from "@material-ui/icons/Menu";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Box,
  Grid,
} from "@material-ui/core";
import Home from "./Home";
import Verify from "./Verify";

const navList = [
  {
    title: "Login",
    href: "/auth/login",
  },
  {
    title: "Signup",
    href: "/auth/registration",
  },
  {
    title: "FAQs",
    href: "/faq",
  },
  {
    title: "About Us",
    href: "/about",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#fff",
    fontSize: "3.5rem",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    textShadow: "none",
  },
  navItem: {
    color: "white",
    textDecoration: "underline",
    textShadow: "none",
    marginRight: "15px",
    "&:hover": {
      color: "#468260",
    },
  },
  list: {
    width: 250,
    paddingTop: "63px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "56px",
    },
  },
  footerRoot: {
    minWidth: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    textAlign: "center",
    color: "#fff",
  },
}));

export function AuthPage() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (value) => setIsDrawerOpen(value);

  function BasicNavList() {
    return (
      <>
        {navList.map((item, index) => (
          <Link
            to={item.href}
            className={classes.navItem}
            key={`navlink-${index}`}
          >
            <Typography style={{ fontSize: "1.6rem" }}>{item.title}</Typography>
          </Link>
        ))}
      </>
    );
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            {isMobile && (
              <IconButton
                edge="start"
                className={classes.menuButton}
                onClick={() => toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" className={classes.title}>
              Our Planet
            </Typography>
            {!isMobile && <BasicNavList />}
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => toggleDrawer(false)}
        >
          <div className={classes.list}>
            {isMobile && (
              <>
                <Divider />
                <List>
                  {navList.map((item) => (
                    <Link to={item.href} className={classes.link}>
                      <ListItem
                        onClick={() => toggleDrawer(false)}
                        key={item.title}
                      >
                        {item.icon !== undefined ? (
                          <ListItemIcon>{item.icon}</ListItemIcon>
                        ) : null}
                        <ListItemText primary={item.title} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </>
            )}
          </div>
        </Drawer>
      </div>
      {/*begin::Content*/}
      <div className="d-flex flex-column flex-row-fluid">
        {/* begin::Content body */}
        <div className="d-flex   flex-column-fluid flex-center">
          <Switch>
            <ContentRoute path="/" exact component={Home} />
            <ContentRoute path="/auth/verify" component={Verify} />
            <ContentRoute path="/auth/login" component={Login} />
            <ContentRoute path="/auth/registration" component={Registration} />
            <ContentRoute
              path="/auth/forgot-password"
              component={ForgotPassword}
            />
            <Redirect from="/auth" exact={true} to="/auth/login" />
            <Redirect to="/auth/login" />
          </Switch>
        </div>
        {/*end::Content body*/}
      </div>
      {/*end::Content*/}
      <Footer />
    </>
  );
}

function Footer() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Box className={classes.footerRoot} style={{ padding: "10px 0px" }}>
          <Grid container>
            <Grid item xs={12} sm={4}>
              <div>
                <img
                  src={toAbsoluteUrl(
                    "/media/logos/Our-Planet-Logo-Icon-WHITE-SMALLER-150x150.png"
                  )}
                  alt="logo"
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  maxWidth: "fit-content",
                }}
              >
                <li
                  style={{
                    display: "flex",
                  }}
                >
                  <a
                    style={{
                      color: "#fff",
                      fontSize: "1.5rem",
                      textAlign: "left",
                    }}
                    href="/"
                  >
                    Home
                  </a>
                </li>
                <li
                  style={{
                    display: "flex",
                  }}
                >
                  <a
                    style={{
                      color: "#fff",
                      fontSize: "1.5rem",
                      textAlign: "left",
                    }}
                    href="https://www.our-planet.co.uk/why-us/"
                  >
                    Why us
                  </a>
                </li>
                <li
                  style={{
                    display: "flex",
                  }}
                >
                  <a
                    style={{
                      color: "#fff",
                      fontSize: "1.5rem",
                      textAlign: "left",
                    }}
                    href="https://www.our-planet.co.uk/team/"
                  >
                    Team
                  </a>
                </li>
                <li
                  style={{
                    display: "flex",
                  }}
                >
                  <a
                    style={{
                      color: "#fff",
                      fontSize: "1.5rem",
                      textAlign: "left",
                    }}
                    href="https://www.our-planet.co.uk/privacy-policy/"
                  >
                    Privacy policy
                  </a>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} sm={4} style={{ fontSize: "1.5rem" }}>
              <div>Our Planet Ltd</div>
              <div>Suit 143</div>
              <div>295 High Rd</div>
              <div>Chiswick</div>
              <div>London</div>
              <div>W4 4HH</div>
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
