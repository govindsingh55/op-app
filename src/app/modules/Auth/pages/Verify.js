import React, { useState, useEffect } from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { verifyUser } from "../_redux/authCrud";

const useStyles = makeStyles((_theme) => ({
  centerRoot: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  homeLink: {
    textDecoration: "underline",
  },
}));

export default function Verify() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function() {
      try {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        // const response = await postRequest({
        //   url: "/auth/verify-company",
        //   data: {
        //     token: params.token,
        //   },
        // });
        // if (!response.ok) {
        //   console.log(response.message);
        //   setError({ message: response.message });
        // }

        verifyUser(params.token)
          .then((response) => {
            console.log("verify-success", response);
          })
          .catch((err) => {
            console.log("verify error 1", err);
            setError(err);
            setLoading(false);
          });
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    })();
  }, []);
  console.log("loading : ", loading, error);

  if (error && !loading) {
    return (
      <Box className={classes.centerRoot}>
        <Typography variant="h5">An error occured</Typography>
        {error.message ? <Typography>{error.message}</Typography> : null}
      </Box>
    );
  }
  if (!error && !loading) {
    console.log("loading 2: ", loading, error);

    return (
      <Box className={classes.centerRoot}>
        <Typography variant="h5">Account verified successfully</Typography>
        <Typography>
          <Link className={classes.link} to="/app/login">
            Go to Login
          </Link>
        </Typography>
      </Box>
    );
  }
  return (
    <Box className={classes.centerRoot}>
      <Typography variant="h6">Verifying.... please wait</Typography>
    </Box>
  );
}
