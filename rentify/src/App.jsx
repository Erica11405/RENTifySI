import { Routes, Route } from "react-router-dom";

// Layouts
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import AuthLayout from "./components/AuthLayout";

// USER 
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn";

// ADMIN 
import AdminLogin from "./admin/AdminLogin";
import AdminHome from "./admin/AdminHome";
import AdminCars from "./admin/AdminCars";
import AdminBookings from "./admin/AdminBookings";

function App() {
  return (
    <Routes>
      {/* ========== AUTH ROUTES (NO navbar/footer) ========== */}
      <Route path="/login" element={
        <AuthLayout>
          <LogIn />
        </AuthLayout>
      } />
      
      <Route path="/admin/login" element={
        <AuthLayout>
          <AdminLogin />
        </AuthLayout>
      } />

      {/* ========== USER ROUTES (WITH Navbar + Footer) ========== */}
      <Route path="/" element={
        <UserLayout>
          <Home />
        </UserLayout>
      } />
      
      <Route path="/cars" element={
        <UserLayout>
          <Cars />
        </UserLayout>
      } />
      
      <Route path="/profile" element={
        <UserLayout>
          <Profile />
        </UserLayout>
      } />

      {/* ========== ADMIN ROUTES (WITH AdminSidebar) ========== */}
      <Route path="/admin/dashboard" element={
        <AdminLayout>
          <AdminHome />
        </AdminLayout>
      } />
      
      <Route path="/admin/cars" element={
        <AdminLayout>
          <AdminCars />
        </AdminLayout>
      } />
      
      <Route path="/admin/bookings" element={
        <AdminLayout>
          <AdminBookings />
        </AdminLayout>
      } />
    </Routes>
  );
}

export default App;