import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import React, { useEffect, useState } from 'react';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";

function App() {
  const [msg, setMsg] = useState("");

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "http://localhost:8000/expenses",
  //   })
  //     .then((response) => setMsg(response.data[0]['title']));
  // }, [])

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} /> {/* Redirect root path to /login */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
