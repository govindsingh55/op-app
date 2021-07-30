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
            <ContentRoute path="/auth/login" component={Login} />
            <ContentRoute path="/" component={Home} />
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
        <Box className={classes.footerRoot}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Our Planet
              </Typography>
              <Typography variant="body2" style={{ fontStyle: "italic" }}>
                Qui repudiandae et eum dolores alias sed ea. Qui suscipit veniam
                excepturi quod.
              </Typography>
              <br />
              <Typography className={classes.pos} variant="body2">
                A108 Adam Street
                <br />
                NY 535022, USA
              </Typography>
              <br />
              <Typography variant="body2" component="p">
                <strong>Phone:</strong> +1 5589 55488 55
                <br />
                <strong>Email:</strong> info@example.com
              </Typography>
              <Box style={{ margin: "20px 0px" }}>
                © Copyright{" "}
                <strong>
                  <span>Our Planet</span>
                </strong>
                . All Rights Reserved
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Links
              </Typography>
              <br />
              <Link
                style={{ color: "inherit", fontSize: "1.2rem" }}
                href="https://www.our-planet.co.uk"
              >
                About Our Planet
              </Link>
              <br />
              <br />
              <Link
                style={{ color: "inherit", fontSize: "1.2rem" }}
                href="https://www.our-planet.co.uk/privacy-policy/"
              >
                Privacy Policy
              </Link>
              <br />
              <br />
              <Link
                style={{ color: "inherit", fontSize: "1.2rem" }}
                href="/terms"
              >
                Terms &amp; Conditions
              </Link>
              <br />
              <br />
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
