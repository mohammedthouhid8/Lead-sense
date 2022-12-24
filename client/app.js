import './App.css';
import React from 'react'
// 1. Import Bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
// 2. Import all the pages and components
import  Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Leads from "./Pages/Leads";
import Orgs from "./Pages/Orgs";
import Users from "./Pages/Users";
import Sidebar from "./Components/Sidebar";
// 4. Import Routes, Route from react-router-dom
import {Routes,Route} from "react-router-dom";

// 3. Show each of the components in the broser
// 5. Copy the routes and route tag and paste it
// 6. Show the Routes working without putting <sidebar>
// 7. Lets put a navigation bar <sidebar> and we will wrap
// all the routes inside the <sidebr> component
function App() {
  return (
    <>
     <Sidebar>
      <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orgs" element={<Orgs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/leads" element={<Leads />} />
        </Routes >
      </Sidebar>
    </>
  );
}

export default App;
