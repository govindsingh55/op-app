import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { login } from "../_redux/authCrud";
import {
  Paper,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    userName: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      console.log("submit form : ", values);
      enableLoading();
      login(values.userName, values.password)
        .then(
          ({
            data: {
              data: { accessToken, role },
            },
          }) => {
            console.log("login page : ", accessToken, role);
            props.login(accessToken, role);
            disableLoading();
          }
        )
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setStatus("Registration details are incorrect!");
          } else if (err.request) {
            setStatus("Network issues!");
          } else {
            setStatus("Something went wrong!");
          }
        })
        .finally(() => {
          disableLoading();
          setSubmitting(false);
        });
    },
  });

  console.log("formik : ", formik.errors);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignContent="center"
      alignItems="center"
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={4}
        container
        style={{ justifyContent: "center" }}
      >
        <Paper style={{ padding: "3vw", overflow: "hidden" }}>
          <div>
            {/* begin::Head */}
            <div className="text-center mb-10 mb-lg-10">
              <h3 className="font-size-h1">
                <FormattedMessage id="AUTH.LOGIN.TITLE" />
              </h3>
              <p className="text-muted font-weight-bold">
                Enter your Username and password
              </p>
            </div>
            {/* end::Head */}

            {/*begin::Form*/}
            <form
              onSubmit={formik.handleSubmit}
              className="form fv-plugins-bootstrap fv-plugins-framework"
            >
              {formik.status && (
                <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                  <div className="alert-text font-weight-bold">
                    {formik.status}
                  </div>
                </div>
              )}
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="userName"
                    name="userName"
                    label="Username"
                    type="text"
                    variant="outlined"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.userName && Boolean(formik.errors.userName)
                    }
                    helperText={
                      formik.touched.userName && formik.errors.userName
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
                <Grid item cs={12}>
                  <Link
                    to="/auth/forgot-password"
                    className="text-dark-50 text-hover-primary my-3 mr-2"
                  >
                    <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
                  </Link>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading || !formik.isValid}
                    style={{
                      color: "#fff",
                      fontSize: "1.2rem",
                      padding: "5px 40px",
                    }}
                  >
                    {loading ? <CircularProgress color="primary" /> : "Login"}
                  </Button>
                </Grid>
              </Grid>
            </form>
            {/*end::Form*/}
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));
