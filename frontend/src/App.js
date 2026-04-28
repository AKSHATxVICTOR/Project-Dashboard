import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { getCurrentUser } from './services/api';
import './App.css';

const PrivateRoute = ({ children }) => {
  const user = getCurrentUser();
  return user ? children : <Navigate to='/login' />;
};

const PublicRoute = ({ children }) => {
  const user = getCurrentUser();
  return !user ? children : <Navigate to='/dashboard' />;
};

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={<Navigate to='/dashboard' replace />}
          />
          <Route
            path='/login'
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path='/register'
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<Navigate to='/dashboard' replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
