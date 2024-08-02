import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import TodosList from './components/TodosList';
import Cookies from 'js-cookie';

class App extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token');

    return (
      <Router>
        <Routes>
          <Route
            path="/register"
            element={jwtToken ? <Navigate to="/" /> : <RegisterForm />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<ProtectedRoute redirectTo="/register"><TodosList /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
