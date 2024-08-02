import {Component} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import TodosList from './components/TodosList';

class App extends Component {
  render() {
    return(
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/*" element={<ProtectedRoute redirectTo="/register" />}></Route>
          <Route path='/' element={
            <>
              <TodosList />
            </>
          } />
        </Routes>
      </Router>
    )
  }
}

export default App