import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import OwnerDashboard from './pages/OwnerDashboard';
import UserDashboard from './pages/UserDashboard';
import BusinessProfileForm from './pages/BusinessProfileForm';
import EditBusiness from './pages/EditBusiness';
function App() {
  return (
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/signup' element={<SignUp />} />
    <Route path='/signin' element={<SignIn />} />
    <Route path='/owner/:id' element={<OwnerDashboard/>} />
    <Route path='/user/:id' element={<UserDashboard />} />
    <Route path='/owner/:id/create-business' element={<BusinessProfileForm/>} />
    <Route path="/owner/edit-business/:businessId" element={<EditBusiness/>} />



  </Routes>
  );
}

export default App;
