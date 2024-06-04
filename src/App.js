import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import PrivateRoute from './components/PrivateRoute'
import Selection from './pages/Selection'
import ProDashboard from './pages/ProDashboard'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Selection />} />
      <Route path='/login' element={<Login />} />
      <Route path='/Dashboard' element={<PrivateRoute component={Dashboard} />} />
      <Route path='/dash-board' element={<PrivateRoute component={ProDashboard} />} />
      <Route path='/orders' element={<PrivateRoute component={Orders} />} />
    </Routes>
  )
}

export default App