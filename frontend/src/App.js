import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './component/user/Login';
import Register from './component/user/Signup';
import Dashboard from './component/things/Dashboard';
import Home from './component/home_screen/Home';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="thing" element={ <Login /> } exact />
          <Route path="register" element={ <Register /> } exact />
          <Route path="things" element= { <Dashboard />} exact />
        </Routes>
      </Router>
    </div>
  ); 
}

export default App;
