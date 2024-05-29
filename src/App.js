import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import PrivateRoute from './components/PrivateRoute'
const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/Dashboard' element={<PrivateRoute component={Dashboard} />} />
      <Route path='/orders' element={<PrivateRoute component={Orders} />} />
    </Routes>
  )
}

export default App