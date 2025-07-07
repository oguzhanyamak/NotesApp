import React from 'react'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/signup'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';


const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" exact element={<Home />}/>
      <Route path="/login" exact element={<Login />}/>
      <Route path="/signup" exact element={<Signup />}/>
    </Routes>
  </Router>
);

export default function App() {
  return (
    <div>
      {routes}
    </div>
  )
}
