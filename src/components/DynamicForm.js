import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Select, MenuItem, FormControl, InputLabel, TextareaAutosize } from '@mui/material';
import './DynamicForm.css';

const formSchema = {
  title: 'Registration Form',
  fields: [
    { name: 'firstName', label: 'First Name', type: 'text', validation: Yup.string().required('Required') },
    { name: 'lastName', label: 'Last Name', type: 'text', validation: Yup.string().required('Required') },
    { name: 'email', label: 'Email', type: 'email', validation: Yup.string().email('Invalid email address').required('Required') },
    { name: 'password', label: 'Password', type: 'password', validation: Yup.string().min(8, 'Password must be at least 8 characters').required('Required') },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', validation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required') },
    { name: 'phone', label: 'Phone Number', type: 'tel', validation: Yup.string().matches(/^[0-9]{10}$/, 'Phone number is not valid').required('Required') },
    { name: 'address', label: 'Address', type: 'textarea', validation: Yup.string().required('Required') },
    { name: 'city', label: 'City', type: 'select', options: [
        { label: 'Chennai', value: 'chennai' },
        { label: 'Madurai', value: 'madurai' },
        { label: 'Coimbatore', value: 'coimbatore' },
        { label: 'Thenkasi', value: 'thenkasi' },
        { label: 'Dindugul', value: 'dindugul' }
      ], validation: Yup.string().required('Required') },
    { name: 'state', label: 'State', type: 'text', validation: Yup.string().required('Required') },
    { name: 'zipCode', label: 'Zip Code', type: 'text', validation: Yup.string().matches(/^[1-9][0-9]{5}$/, 'Zip Code is not valid').required('Required') },
    { name: 'bio', label: 'Bio', type: 'textarea', validation: Yup.string().required('Required') },
    {
      name: 'gender', label: 'Gender', type: 'radio', options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' }
      ], validation: Yup.string().required('Required')
    },
    {
      name: 'country', label: 'Country', type: 'select', options: [
        { label: 'India', value: 'US' },
        { label: 'Other', value: 'Other' }
      ], validation: Yup.string().required('Required') }
  ],
};

const DynamicForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const initialValues = formSchema.fields.reduce((acc, field) => {
    acc[field.name] = field.type === 'radio' ? field.options[0].value : '';
    return acc;
  }, {});

  const validationSchema = Yup.object().shape(
    formSchema.fields.reduce((acc, field) => {
      acc[field.name] = field.validation;
      return acc;
    }, {})
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (submitted) {
        alert('Form already submitted.');
        return;
      }
      console.log(JSON.stringify(values, null, 2));
      setSubmitted(true);
      
      window.location.href = '/admin-dashboard';
    },
  });

  return (
    <div className="container form-container">
      <h1>{formSchema.title}</h1>
      <form onSubmit={formik.handleSubmit}>
        {formSchema.fields.map((field) => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === 'textarea' ? (
              <TextareaAutosize
                id={field.name}
                name={field.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.name]}
                className={`form-control ${formik.touched[field.name] && formik.errors[field.name] ? 'is-invalid' : ''}`}
                disabled={submitted}
                minRows={3}
              />
            ) : field.type === 'radio' ? (
              <RadioGroup
                id={field.name}
                name={field.name}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                row
                className="form-control"
              >
                {field.options.map(option => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio disabled={submitted} />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            ) : field.type === 'select' ? (
              <FormControl fullWidth>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  id={field.name}
                  name={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={submitted}
                  className={`form-control ${formik.touched[field.name] && formik.errors[field.name] ? 'is-invalid' : ''}`}
                >
                  {field.options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                fullWidth
                id={field.name}
                name={field.name}
                type={field.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field.name]}
                className={`form-control ${formik.touched[field.name] && formik.errors[field.name] ? 'is-invalid' : ''}`}
                disabled={submitted}
              />
            )}
            {formik.touched[field.name] && formik.errors[field.name] ? (
              <div className="invalid-feedback">{formik.errors[field.name]}</div>
            ) : null}
          </div>
        ))}
        <Button variant="contained" color="primary" type="submit" disabled={submitted}>
          Submit
        </Button>
      </form>
      {submitted && <div className="alert alert-success">Form submitted successfully!</div>}
    </div>
  );
};

export default DynamicForm;
