import { Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
export default function ThirdStepForm({ formik, getInputClasses }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" style={{ margin: "0px" }}>
          Other Details
        </Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <TextField
          fullWidth
          id="roleInCompany"
          name="roleInCompany"
          label="Your role in company"
          type="text"
          variant="outlined"
          value={formik.values.roleInCompany}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.roleInCompany && Boolean(formik.errors.roleInCompany)
          }
          helperText={
            formik.touched.roleInCompany && formik.errors.roleInCompany
          }
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          fullWidth
          id="businessEmail"
          name="businessEmail"
          label="Business Email"
          type="email"
          variant="outlined"
          value={formik.values.businessEmail}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.businessEmail && Boolean(formik.errors.businessEmail)
          }
          helperText={
            formik.touched.businessEmail && formik.errors.businessEmail
          }
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          fullWidth
          id="businessPhone"
          name="businessPhone"
          label="Business Phone"
          type="text"
          variant="outlined"
          value={formik.values.businessPhone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.businessPhone && Boolean(formik.errors.businessPhone)
          }
          helperText={
            formik.touched.businessPhone && formik.errors.businessPhone
          }
        />
      </Grid>
    </Grid>
  );
}
