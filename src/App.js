import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DynamicForm from './components/DynamicForm';
import AdminDashboard from './components/AdminDashboard';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<DynamicForm />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  </Router>
);

export default App;
