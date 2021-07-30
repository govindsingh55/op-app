import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { register } from "../_redux/authCrud";

const initialValues = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  phone: "",
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

  roleInCompany: "",
  businessEmail: "",
  businessPhone: ""
};

const renderStep = (step, formik, getInputClasses) => {
  switch (step) {
    case 1:
      return (
        <FormFirstStep formik={formik} getInputClasses={getInputClasses} />
      );
    case 2:
      return (
        <FormSecondStep formik={formik} getInputClasses={getInputClasses} />
      );
    case 3:
      return (
        <FormThirdStep formik={formik} getInputClasses={getInputClasses} />
      );
    case 4:
      return <FormSuccess />;
    default:
      return (
        <FormFirstStep formik={formik} getInputClasses={getInputClasses} />
      );
  }
};

function Registration(props) {
  const [formStep, setFormStep] = useState(1);
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
    lastName: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
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
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    phone: Yup.number()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
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
    address1: Yup.string(),
    address2: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    postCode: Yup.number(),

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
    cPhone: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    roleInCompany: Yup.string().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    businessEmail: Yup.string().email().required(
      intl.formatMessage({
        id: "AUTH.VALIDATION.REQUIRED_FIELD",
      })
    ),
    businessPhone: Yup.number().required(
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

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setSubmitting(true);
      enableLoading();
      register(values.email, values.fullname, values.username, values.password)
        .then(({ data: { authToken } }) => {
          props.register(authToken);
          disableLoading();
          setSubmitting(false);
        })
        .catch(() => {
          setSubmitting(false);
          setStatus(
            intl.formatMessage({
              id: "AUTH.VALIDATION.INVALID_LOGIN",
            })
          );
          disableLoading();
        });
    },
  });

  function handleFormStepChannge(change) {
    if (change === "next") {
      setFormStep(formStep + 1);
      return;
    }
    setFormStep(formStep - 1);
  }
  console.log("formik data : ", formik.values);
  return (
    <div className="login-form login-signin" style={{ display: "block" }}>
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.REGISTER.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">
          Enter your details to create your account
        </p>
      </div>
      <form onSubmit={formik.handleSubmit} className="custom-form-scroll">
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
    </div>
  );
}

function FormFirstStep({ formik, getInputClasses }) {
  return (
    <>
      {/* begin: firstName */}
      <div className="form-group fv-plugins-icon-container">
        <input
          placeholder="First Name"
          type="text"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "firstName"
          )}`}
          name="firstName"
          {...formik.getFieldProps("firstName")}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.firstName}</div>
          </div>
        ) : null}
      </div>
      {/* end: firstName */}

      {/* begin: lastName */}
      <div className="form-group fv-plugins-icon-container">
        <input
          placeholder="Last Name"
          type="text"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "lastName"
          )}`}
          name="lastName"
          {...formik.getFieldProps("lastName")}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.lastName}</div>
          </div>
        ) : null}
      </div>
      {/* end: lastName */}

      {/* begin: userName */}
      <div className="form-group fv-plugins-icon-container">
        <input
          placeholder="User Name"
          type="text"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "userName"
          )}`}
          name="userName"
          {...formik.getFieldProps("userName")}
        />
        {formik.touched.userName && formik.errors.userName ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.userName}</div>
          </div>
        ) : null}
      </div>
      {/* end: userName */}

      {/* begin: Email */}
      <div className="form-group fv-plugins-icon-container">
        <input
          placeholder="Email"
          type="email"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "email"
          )}`}
          name="email"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.email}</div>
          </div>
        ) : null}
      </div>
      {/* end: Email */}

      {/* begin: Password */}
      <div className="form-group fv-plugins-icon-container">
        <input
          placeholder="Password"
          type="password"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "password"
          )}`}
          name="password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.password}</div>
          </div>
        ) : null}
      </div>
      {/* end: Password */}

      {/* begin: Confirm Password */}
      <div className="form-group fv-plugins-icon-container">
        <input
          placeholder="Confirm Password"
          type="password"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "confirmPassword"
          )}`}
          name="confirmPassword"
          {...formik.getFieldProps("confirmPassword")}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.confirmPassword}</div>
          </div>
        ) : null}
      </div>
      {/* end: Confirm Password */}

      {/* begin: phone */}
      <div className="form-group fv-plugins-icon-container">
        <input
          pattern="[0-9]{6,10}"
          placeholder="Phone Number"
          type="tel"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "phone"
          )}`}
          name="phone"
          {...formik.getFieldProps("phone")}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.phone}</div>
          </div>
        ) : null}
      </div>
      {/* end: phone */}

      {/* begin: address 1 */}
      <div className="form-group fv-plugins-icon-container">
        <textarea
          placeholder="Primary Address"
          type="text"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "address1"
          )}`}
          name="address1"
          {...formik.getFieldProps("address1")}
        />
        {formik.touched.address1 && formik.errors.address1 ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.address1}</div>
          </div>
        ) : null}
      </div>
      {/* end: address 1 */}

      {/* begin: address 2 */}
      <div className="form-group fv-plugins-icon-container">
        <textarea
          placeholder="Address"
          type="text"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "address2"
          )}`}
          name="address2"
          {...formik.getFieldProps("address1")}
        />
        {formik.touched.address2 && formik.errors.address2 ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.address2}</div>
          </div>
        ) : null}
      </div>
      {/* end: address 2 */}

      {/* begin: City */}
      <div className="form-group fv-plugins-icon-container">
        <input
          placeholder="City"
          type="text"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "city"
          )}`}
          name="city"
          {...formik.getFieldProps("city")}
        />
        {formik.touched.city && formik.errors.city ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.city}</div>
          </div>
        ) : null}
      </div>
      {/* end: City */}

      {/* begin: State */}
      <div className="form-group fv-plugins-icon-container">
        <input
          placeholder="State / Region / Provence"
          type="text"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "state"
          )}`}
          name="state"
          {...formik.getFieldProps("state")}
        />
        {formik.touched.state && formik.errors.state ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.state}</div>
          </div>
        ) : null}
      </div>
      {/* end: State */}

      {/* begin: Pin code */}
      <div className="form-group fv-plugins-icon-container">
        <input
          placeholder="Zip / Postal code"
          type="number"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "postCode"
          )}`}
          name="postCode"
          {...formik.getFieldProps("postCode")}
        />
        {formik.touched.postCode && formik.errors.postCode ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.postCode}</div>
          </div>
        ) : null}
      </div>
      {/* end: Pin code */}

      <div style={{ display: "flex" }}>
        {/* begin: communicationPref phone  */}
        <div className="form-group">
          <label className="checkbox">
            <div>phone</div>
            <input
              type="checkbox"
              name="['communicationPref.phone']"
              checked={formik.values["communicationPref.phone"]}
              className="m-2"
              {...formik.getFieldProps("['communicationPref.phone']")}
            />
            <span />
          </label>
        </div>
        {/* end: communicationPref phone */}
        {/* begin: communicationPref email */}
        <div className="form-group" style={{ marginLeft: "10px" }}>
          <label className="checkbox">
            <div>Email</div>
            <input
              type="checkbox"
              name="['communicationPref.email']"
              className="m-2"
              checked={formik.values["communicationPref.email"]}
              {...formik.getFieldProps("['communicationPref.email']")}
            />
            <span />
          </label>
        </div>
        {/* end: communicationPref email */}
      </div>
      {/* begin: communicationPref newsLetter */}
      <div className="form-group">
        <label className="checkbox">
          <div>Receive weekly/monthly news letter</div>
          <input
            type="checkbox"
            name="['communicationPref.newsLetter']"
            className="m-2"
            checked={formik.values["communicationPref.newsLetter"]}
            {...formik.getFieldProps("['communicationPref.newsLetter']")}
          />
          <span />
        </label>
      </div>
      {/* end: communicationPref newsLetter */}
      {/* begin: communicationPref importantUpdates */}
      <div className="form-group">
        <label className="checkbox">
          <div>Receive regular important communications</div>
          <input
            type="checkbox"
            name="['communicationPref.importantUpdates']"
            className="m-2"
            checked={formik.values["communicationPref.importantUpdates"]}
            {...formik.getFieldProps("['communicationPref.importantUpdates']")}
          />
          <span />
        </label>
      </div>
      {/* end: communicationPref importantUpdates */}
      {/* begin: communicationPref marketingUpdates */}
      <div className="form-group">
        <label className="checkbox">
          <div>Receive marketing communications</div>
          <input
            type="checkbox"
            name="['communicationPref.marketingUpdates']"
            className="m-1"
            checked={formik.values["communicationPref.marketingUpdates"]}
            {...formik.getFieldProps("['communicationPref.marketingUpdates']")}
          />
          <span />
        </label>
      </div>
      {/* end: communicationPref marketingUpdates */}
    </>
  );
}
function FormSecondStep({ formik, getInputClasses }) {
  return (
    <>
      <div>Company Details</div>
      {/* begin: companyName */}
      <div className="form-group fv-plugins-icon-container">
        <input
          placeholder="Company Name"
          type="text"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "companyName"
          )}`}
          name="companyName"
          {...formik.getFieldProps("companyName")}
        />
        {formik.touched.companyName && formik.errors.companyName ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.companyName}</div>
          </div>
        ) : null}
      </div>
      {/* end: companyName */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* begin: cIndustry */}
        <div
          className="form-group fv-plugins-icon-container"
          style={{ width: "100%" }}
        >
          <select
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "cIndustry"
            )}`}
            name="cIndustry"
            {...formik.getFieldProps("cIndustry")}
          >
            <option disabled selected hidden>
              Select Industry
            </option>
            <option value="IT">IT & software</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Marketing">Marketing</option>
          </select>
          {formik.touched.cIndustry && formik.errors.cIndustry ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.cIndustry}</div>
            </div>
          ) : null}
        </div>
        {/* end: cIndustry */}
        <div id="spacer" style={{ width: "10px" }}></div>
        {/* begin: cPhone */}
        <div
          className="form-group fv-plugins-icon-container"
          style={{ width: "100%" }}
        >
          <input
            pattern="[0-9]{6,10}"
            placeholder="Phone number"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "cPhone"
            )}`}
            name="cPhone"
            {...formik.getFieldProps("cPhone")}
          />
          {formik.touched.cPhone && formik.errors.cPhone ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.cPhone}</div>
            </div>
          ) : null}
        </div>
        {/* end: cPhone */}
      </div>

      <div>Company Headquarter address</div>
      {/* begin: caddress 1 */}
      <div className="form-group fv-plugins-icon-container">
        <textarea
          placeholder="Primary Address"
          type="text"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "caddress1"
          )}`}
          name="caddress1"
          {...formik.getFieldProps("caddress1")}
        />
        {formik.touched.caddress1 && formik.errors.caddress1 ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.caddress1}</div>
          </div>
        ) : null}
      </div>
      {/* end: caddress 1 */}

      {/* begin: caddress 2 */}
      <div className="form-group fv-plugins-icon-container">
        <textarea
          placeholder="Address"
          type="text"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "caddress2"
          )}`}
          name="caddress2"
          {...formik.getFieldProps("address1")}
        />
        {formik.touched.caddress2 && formik.errors.caddress2 ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.caddress2}</div>
          </div>
        ) : null}
      </div>
      {/* end: caddress 2 */}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* begin: ccity */}
        <div
          className="form-group fv-plugins-icon-container"
          style={{ width: "100%" }}
        >
          <input
            placeholder="City"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "ccity"
            )}`}
            name="ccity"
            {...formik.getFieldProps("ccity")}
          />
          {formik.touched.ccity && formik.errors.ccity ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.ccity}</div>
            </div>
          ) : null}
        </div>
        {/* end: ccity */}
        <div id="spacer" style={{ width: "10px" }}></div>
        {/* begin: cstate */}
        <div
          className="form-group fv-plugins-icon-container"
          style={{ width: "100%" }}
        >
          <input
            placeholder="State / Province / Region"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "cstate"
            )}`}
            name="cstate"
            {...formik.getFieldProps("cstate")}
          />
          {formik.touched.cstate && formik.errors.cstate ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.cstate}</div>
            </div>
          ) : null}
        </div>
        {/* end: cstate */}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* begin: cPostCode */}
        <div
          className="form-group fv-plugins-icon-container"
          style={{ width: "100%" }}
        >
          <input
            placeholder="Zip / Postal code"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "cPostCode"
            )}`}
            name="cPostCode"
            {...formik.getFieldProps("cPostCode")}
          />
          {formik.touched.cPostCode && formik.errors.cPostCode ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.cPostCode}</div>
            </div>
          ) : null}
        </div>
        {/* end: cPostCode */}
        <div id="spacer" style={{ width: "10px" }}></div>
        {/* begin: cCountry */}
        <div
          className="form-group fv-plugins-icon-container"
          style={{ width: "100%" }}
        >
          <input
            placeholder="Country"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "cCountry"
            )}`}
            name="cCountry"
            {...formik.getFieldProps("cCountry")}
          />
          {formik.touched.cCountry && formik.errors.cCountry ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.cCountry}</div>
            </div>
          ) : null}
        </div>
        {/* end: cCountry */}
      </div>
    </>
  );
}
function FormThirdStep({ formik, getInputClasses }) {
  return (
    <>
      <div>Other Details</div>
      {/* begin: roleInCompany */}
      <div
        className="form-group fv-plugins-icon-container"
        style={{ width: "100%" }}
      >
        {/* <select
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "roleInCompany"
          )}`}
          name="roleInCompany"
          {...formik.getFieldProps("roleInCompany")}
        >
          <option disabled selected hidden>
            Select Role
          </option>
          <option value="IT">IT & software</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Marketing">Marketing</option>
        </select> */}
        <input
          placeholder="Role in company"
          type="text"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "roleInCompany"
          )}`}
          name="roleInCompany"
          {...formik.getFieldProps("roleInCompany")}
        />
        {formik.touched.roleInCompany && formik.errors.roleInCompany ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.roleInCompany}</div>
          </div>
        ) : null}
      </div>
      {/* end: roleInCompany */}
      {/* begin: businessEmail */}
      <div
        className="form-group fv-plugins-icon-container"
        style={{ width: "100%" }}
      >
        <input
          placeholder="Business Email"
          type="email"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "businessEmail"
          )}`}
          name="businessEmail"
          {...formik.getFieldProps("businessEmail")}
        />
        {formik.touched.businessEmail && formik.errors.businessEmail ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.businessEmail}</div>
          </div>
        ) : null}
      </div>
      {/* end: businessEmail */}
      {/* begin: businessPhone */}
      <div
        className="form-group fv-plugins-icon-container"
        style={{ width: "100%" }}
      >
        <input
          placeholder="Business Phone"
          type="text"
          className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
            "businessPhone"
          )}`}
          name="businessPhone"
          {...formik.getFieldProps("businessPhone")}
        />
        {formik.touched.businessPhone && formik.errors.businessPhone ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{formik.errors.businessPhone}</div>
          </div>
        ) : null}
      </div>
      {/* end: businessPhone */}
    </>
  );
}
function FormSuccess() {
  return <div>form success step</div>;
}

export const StepButton = (props) => {
  const { step, formStepChange, formik, loading } = props;
  return (
    <>
      {step !== 1 && (
        <button
          className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
          onClick={() => formStepChange("prev")}
        >
          prev
        </button>
      )}

      {step !== 3 && (
        <button
          className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
          onClick={() => formStepChange("next")}
        >
          next
        </button>
      )}

      {step === 3 && (
        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
          className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
        >
          <span>Submit</span>
          {loading && <span className="ml-3 spinner spinner-white"></span>}
        </button>
      )}
    </>
  );
};

export default injectIntl(connect(null, auth.actions)(Registration));
