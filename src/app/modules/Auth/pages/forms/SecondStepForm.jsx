import {
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import React from "react";
export default function SecondStepForm({ formik, getInputClasses }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" style={{ margin: "0px" }}>
          Company Details
        </Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <TextField
          fullWidth
          id="companyName"
          name="companyName"
          label="Company Name"
          type="text"
          variant="outlined"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.companyName && Boolean(formik.errors.companyName)
          }
          helperText={formik.touched.companyName && formik.errors.companyName}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="industry-select">Industry</InputLabel>
          <Select
            error={formik.touched.cIndustry && Boolean(formik.errors.cIndustry)}
            helperText={formik.touched.cIndustry && formik.errors.cIndustry}
            name="cIndustry"
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={formik.values.cIndustry}
            onChange={formik.handleChange}
            label="Industry"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"IT"}>IT & software</MenuItem>
            <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
            <MenuItem value={"Marketing"}>Marketing</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          fullWidth
          id="cPhone"
          name="cPhone"
          label="Phone"
          type="text"
          variant="outlined"
          value={formik.values.cPhone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cPhone && Boolean(formik.errors.cPhone)}
          helperText={formik.touched.cPhone && formik.errors.cPhone}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" style={{ margin: "0px" }}>
          Company Headquarter address
        </Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <TextField
          fullWidth
          id="cAddress1"
          name="cAddress1"
          label="Address 1"
          type="text"
          variant="outlined"
          multiline
          rows={3}
          value={formik.values.cAddress1}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cAddress1 && Boolean(formik.errors.cAddress1)}
          helperText={formik.touched.cAddress1 && formik.errors.cAddress1}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <TextField
          fullWidth
          id="cAddress2"
          name="cAddress2"
          label="Address 1"
          type="text"
          variant="outlined"
          multiline
          rows={3}
          value={formik.values.cAddress2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cAddress2 && Boolean(formik.errors.cAddress2)}
          helperText={formik.touched.cAddress2 && formik.errors.cAddress2}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          fullWidth
          id="cCountry"
          name="cCountry"
          label="Country"
          type="text"
          variant="outlined"
          value={formik.values.cCountry}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cCountry && Boolean(formik.errors.cCountry)}
          helperText={formik.touched.cCountry && formik.errors.cCountry}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          fullWidth
          id="cState"
          name="cState"
          label="State / Provence / Region"
          type="text"
          variant="outlined"
          value={formik.values.cState}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cState && Boolean(formik.errors.cState)}
          helperText={formik.touched.cState && formik.errors.cState}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          fullWidth
          id="cCity"
          name="cCity"
          label="City"
          type="text"
          variant="outlined"
          value={formik.values.cCity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cCity && Boolean(formik.errors.cCity)}
          helperText={formik.touched.cCity && formik.errors.cCity}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <TextField
          fullWidth
          id="cPostCode"
          name="cPostCode"
          label="Zip / Postal code"
          type="number"
          variant="outlined"
          value={formik.values.cPostCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cPostCode && Boolean(formik.errors.cPostCode)}
          helperText={formik.touched.cPostCode && formik.errors.cPostCode}
        />
      </Grid>
    </Grid>
  );
}
