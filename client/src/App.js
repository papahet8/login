import React, { useContext } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import Home from "./components/screens/Home"
import Login from "./components/screens/Login"
import Register from "./components/screens/Register"
import Pnf from "./components/util/Pnf"

import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

import { GlobalContext } from './GlobalContext'
import CreateCustomer from './components/admin/CreateCustomer'
import UpdateCustomer from './components/admin/UpdateCustomer'
import Menu from './components/screens/Menu'
import AdminDashboard from './components/admin/AdminDashboard'

function App() {
  const state = useContext(GlobalContext);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  return (
    <Router>
      <Menu />
      <ToastContainer autoClose={5000} position={"top-right"} />
      <Routes>
        <Route excat path={`/`} element={isLogged ? (
          <React.Fragment>
            {
              isAdmin ? <Navigate to={`/admin`} /> : <Home />
            }
          </React.Fragment>
        ) : <Login />} />
        <Route excat path={`/login`} element={isLogged ? <Pnf /> : <Login />} />
        <Route excat path={`/register`} element={isLogged ? <Pnf /> : <Register />} />
        <Route excat path={`/admin`} element={isLogged && isAdmin ? <AdminDashboard /> : <Pnf />} />
        <Route excat path={`/admin/create-product`} element={isLogged && isAdmin ? <CreateCustomer /> : <Pnf />} />
        <Route excat path={`/admin/edit-product/:id`} element={isLogged && isAdmin ? <UpdateCustomer /> : <Pnf />} />
        <Route excat path={`/*`} element={<Pnf />} />
      </Routes>
    </Router>
  )
}

export default App