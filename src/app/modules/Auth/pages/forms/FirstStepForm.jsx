import {
  Grid,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import React from "react";
export default function FirstStepForm({ formik, getInputClasses }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" style={{ margin: "0px" }}>
          Personal Details
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          type="text"
          variant="outlined"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          variant="outlined"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
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
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          fullWidth
          id="phoneNumber"
          name="phoneNumber"
          label="Phone"
          type="text"
          variant="outlined"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
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
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          variant="outlined"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Address
        </Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <TextField
          fullWidth
          id="address1"
          name="address1"
          label="Address 1"
          type="text"
          variant="outlined"
          multiline
          rows={3}
          value={formik.values.address1}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address1 && Boolean(formik.errors.address1)}
          helperText={formik.touched.address1 && formik.errors.address1}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <TextField
          fullWidth
          id="address2"
          name="address2"
          label="Address 1"
          type="text"
          variant="outlined"
          multiline
          rows={3}
          value={formik.values.address2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address2 && Boolean(formik.errors.address2)}
          helperText={formik.touched.address2 && formik.errors.address2}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          fullWidth
          id="country"
          name="country"
          label="Country"
          type="text"
          variant="outlined"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          fullWidth
          id="state"
          name="state"
          label="State / Provence / Region"
          type="text"
          variant="outlined"
          value={formik.values.state}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.state && Boolean(formik.errors.state)}
          helperText={formik.touched.state && formik.errors.state}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          fullWidth
          id="city"
          name="city"
          label="City"
          type="text"
          variant="outlined"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          fullWidth
          id="postCode"
          name="postCode"
          label="Zip / Postal code"
          type="number"
          variant="outlined"
          value={formik.values.postCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.postCode && Boolean(formik.errors.postCode)}
          helperText={formik.touched.postCode && formik.errors.postCode}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Communication Preference
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values["communicationPref.phone"]}
                onChange={formik.handleChange}
                name="['communicationPref.phone']"
                color="primary"
              />
            }
            label="Phone"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values["communicationPref.email"]}
                onChange={formik.handleChange}
                name="['communicationPref.email']"
                color="primary"
              />
            }
            label="Email"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values["communicationPref.newsLetter"]}
                onChange={formik.handleChange}
                name="['communicationPref.newsLetter']"
                color="primary"
              />
            }
            label="Receive weekly/monthly news letter"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values["communicationPref.importantUpdates"]}
                onChange={formik.handleChange}
                name="['communicationPref.importantUpdates']"
                color="primary"
              />
            }
            label="Receive regular important communications"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values["communicationPref.marketingUpdates"]}
                onChange={formik.handleChange}
                name="['communicationPref.marketingUpdates']"
                color="primary"
              />
            }
            label="Receive marketing communications"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
