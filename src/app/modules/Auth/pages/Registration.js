import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import "yup-phone-lite";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { register } from "../_redux/authCrud";
import FirstStepForm from "./forms/FirstStepForm";
import SecondStepForm from "./forms/SecondStepForm";
import ThirdStepForm from "./forms/ThirdStepForm";
import SuccessStepForm from "./forms/SuccessStepForm";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  makeStyles,
  Button,
  CircularProgress,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const initialValues = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postCode: "",
  "communicationPref.phone": false,
  "communicationPref.email": false,
  "communicationPref.newsLetter": false,
  "communicationPref.importantUpdates": false,
  "communicationPref.marketingUpdates": false,

  companyName: "",
  cIndustry: "",
  cPhone: "",
  cAddress1: "",
  cAddress2: "",
  cCountry: "",
  cState: "",
  cCity: "",
  cPostCode: "",

  roleInCompany: "",
  businessEmail: "",
  businessPhone: "",

  // TODO: country code for phone number
  countryCode: "+91",
  cCountryCode: "+91",
};

const steps = ["Personal Details", "Company Details", "Other Details"];

const renderStep = (step, formik, getInputClasses) => {
  switch (step) {
    case 0:
      return (
        <FirstStepForm formik={formik} getInputClasses={getInputClasses} />
      );
    case 1:
      return (
        <SecondStepForm formik={formik} getInputClasses={getInputClasses} />
      );
    case 2:
      return (
        <ThirdStepForm formik={formik} getInputClasses={getInputClasses} />
      );
    case 3:
      return <SuccessStepForm />;
    default:
      return (
        <FirstStepForm formik={formik} getInputClasses={getInputClasses} />
      );
  }
};

function Registration(props) {
  const classes = useStyles();
  const [formStep, setFormStep] = useState(0);
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    lastName: Yup.string(),
    userName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(40, "Maximum 40 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    phoneNumber: Yup.string()
      .phone("Not a valid phone number")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(25, "Maximum 25 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    confirmPassword: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password and Confirm Password didn't match"
        ),
      }),
    address1: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    address2: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    state: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    city: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    postCode: Yup.number().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    cAddress1: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    cAddress2: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    cState: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    cCity: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    cPostCode: Yup.number().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),

    companyName: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    cIndustry: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    cPhone: Yup.string()
      .phone("Not a valid phone number")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    roleInCompany: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    businessEmail: Yup.string()
      .email()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    businessPhone: Yup.string()
      .phone("Not a valid phone number")
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

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };
  function handleFormStepChannge(change) {
    if (change === "next") {
      setFormStep(formStep + 1);
      return;
    }
    setFormStep(formStep - 1);
  }
  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setSubmitting(true);
      enableLoading();
      let cpref = [];
      if (values["communicationPref.phone"]) cpref.push("phone");
      if (values["communicationPref.email"]) cpref.push("email");
      if (values["communicationPref.newsLetter"]) cpref.push("newsLetter");
      if (values["communicationPref.importantUpdates"])
        cpref.push("importantUpdates");
      if (values["communicationPref.marketingUpdates"])
        cpref.push("marketingUpdates");
      const data = {
        userName: values.userName,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        state: values.state,
        postCode: values.postCode,
        phoneNumber: values.phoneNumber,
        country: values.country,
        countryCode: values.countryCode,
        cCountryCode: values.cCountryCode,
        companyName: values.companyName,
        cIndustry: values.cIndustry,
        cAddress1: values.cAddress1,
        cAddress2: values.cAddress2,
        cCity: values.cCity,
        cCountry: values.cCountry,
        cState: values.cState,
        cPostCode: values.cPostCode,
        cPhone: values.cPhone,
        roleInCompany: values.roleInCompany,
        businessPhone: values.businessPhone,
        businessEmail: values.businessEmail,
        communicationPref: cpref.join(","),
      };
      register(data)
        .then(() => {
          // console.log("register success!");
          handleFormStepChannge("next");
          disableLoading();
          setSubmitting(false);
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            setStatus("Registration details are incorrect!");
          } else if (err.request) {
            setStatus("Network issues!");
          } else {
            setStatus("Something went wrong!");
          }
          // console.log("register error : ", err.toJSON());
          // console.log("register error : ", err);
          setSubmitting(false);
          disableLoading();
        });
    },
  });
  // console.log("formik status", formik.status);

  return (
    <div className="login-form login-signin" style={{ margin: "1vh 0px" }}>
      <Paper variant="outlined" className="form-card">
        <div className="text-center mb-10 mb-lg-10">
          <h3 className="font-size-h1">
            <FormattedMessage id="AUTH.REGISTER.TITLE" />
          </h3>
          <p className="text-muted font-weight-bold">
            Enter your details to create your account
          </p>
        </div>

        <Stepper activeStep={formStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={formik.handleSubmit}>
          {/* begin: Alert */}
          {formik.status && (
            <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
              <div className="alert-text font-weight-bold">{formik.status}</div>
            </div>
          )}
          {/* end: Alert */}

          {renderStep(formStep, formik, getInputClasses)}

          <div className="form-group d-flex flex-wrap flex-center">
            <StepButton
              formik={formik}
              formStepChange={handleFormStepChannge}
              step={formStep}
              loading={loading}
            />
          </div>
        </form>
      </Paper>
    </div>
  );
}

export const StepButton = (props) => {
  const { step, formStepChange, formik, loading } = props;
  return (
    <Grid container spacing={3} style={{ marginTop: "2vh" }}>
      {step !== 0 && (
        <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => formStepChange("prev")}
            variant="contained"
            color="primary"
            // disabled={!formik.isValid}
            style={{
              color: "#fff",
              fontSize: "1.2rem",
              padding: "5px 40px",
              margin: "0px auto",
            }}
          >
            Prev
          </Button>
        </Grid>
      )}

      {step !== 2 && (
        <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => formStepChange("next")}
            variant="contained"
            color="primary"
            // disabled={!formik.isValid}
            style={{
              color: "#fff",
              fontSize: "1.2rem",
              padding: "5px 40px",
            }}
          >
            Next
          </Button>
        </Grid>
      )}

      {step === 2 && (
        <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
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
            {loading ? <CircularProgress color="primary" /> : "Register"}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default injectIntl(connect(null, auth.actions)(Registration));
