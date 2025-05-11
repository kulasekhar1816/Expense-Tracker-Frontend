import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css';
import React, {useEffect, useState} from 'react';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";

function App() {
  const [msg, setMsg] = useState("");
  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "http://localhost:8000/expenses",
  //     // data: {
  //     //   response: {
  //     //     name: 'kulasekhar',
  //     //   }
  //     // },
  //   })
  //   .then((response) => setMsg(response.data[0]['title']))

  // },[])
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
