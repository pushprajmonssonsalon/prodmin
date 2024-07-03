import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import PrivateRoute from './components/PrivateRoute'
import Selection from './pages/Selection'
import ProDashboard from './pages/ProDashboard'
import Reports from './pages/Reports'
import Products from './pages/Products'
import SingleProduct from './pages/SingleProduct'
import EditOrder from './pages/EditOrder'
import Settelment from './pages/Settlement'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Selection />} />
      <Route path='/login' element={<Login />} />
      <Route path='/Dashboard' element={<PrivateRoute component={Dashboard} />} />
      <Route path='/dash-board' element={<PrivateRoute component={ProDashboard} />} />
      <Route path='/reports' element={<PrivateRoute component={Reports} />} />
      <Route path='/settelment' element={<PrivateRoute component={Settelment} />} />
      <Route path='/orders' element={<PrivateRoute component={Orders} />} />
      <Route path='/products' element={<PrivateRoute component={Products} />} />
      <Route path='/edit' element={<PrivateRoute component={EditOrder} />} />
      <Route path='/product/:shortUrl' element={<PrivateRoute component={SingleProduct} />} />
    </Routes>
  )
}

export default App