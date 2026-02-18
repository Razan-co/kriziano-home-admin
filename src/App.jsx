import React, { useEffect } from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Admin from './pages/Admin'
import Login from './pages/Login'
import OrderItems from './pages/OrderItems'
import useStore from './store/useStore'
import './App.css'

function App() {
  const { user, checkAuth, isCheckingAuth } = useStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Loading...
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/admin" />} />
        <Route path="/admin" element={user ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/order/items" element={user ? <OrderItems /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/admin" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
