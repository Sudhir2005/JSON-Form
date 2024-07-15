import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Paper } from '@mui/material';
import './AdminDashboard.css';

const employeeDetails = {
  name: 'Sudhir Raja',
  position: 'Software Engineer',
  department: 'IT',
  email: 'Sudhirraja2005@gmail.com',
  phone: '9042162169',
  address: 'Chennai, Tamilnadu',
  photo: 'data:image/jpeg;base64,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' // Replace with actual photo URL
};

const AdminDashboard = () => (
  <div className="admin-container">
    <Paper className="employee-card">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <CardMedia
            component="img"
            height="150"
            image={employeeDetails.photo}
            alt={employeeDetails.name}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <CardContent>
            <Typography variant="h5" component="div">
              {employeeDetails.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {employeeDetails.position} - {employeeDetails.department}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: {employeeDetails.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: {employeeDetails.phone}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: {employeeDetails.address}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Paper>
  </div>
);

export default AdminDashboard;
