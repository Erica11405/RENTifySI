import { Routes, Route } from "react-router-dom";

// Layouts
import UserLayout from "./components/UserLayout.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import AuthLayout from "./components/AuthLayout.jsx";

// USER pages
import Home from "./pages/Home.jsx";
import Cars from "./pages/Cars.jsx";
import Profile from "./pages/Profile.jsx";
// import LogIn from "./pages/LogIn";
import LogIn from "./pages/Login.jsx"
import Notif from "./pages/Notif.jsx";

// ADMIN pages
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminHome from "./admin/AdminHome.jsx";
import AdminCars from "./admin/AdminCars.jsx";
import AdminBookings from "./admin/AdminBookings.jsx";

// Protected Routes
import UserProtectRoute from "./components/UserProtectRoute.jsx";
import AdminProtectRoute from "./components/AdminProtectRoute.jsx";

function App() {
  return (
    <Routes>

      {/* USER LOGIN */}
      <Route
        path="/"
        element={
          <AuthLayout>
            <LogIn />
          </AuthLayout>
        }
      />

      {/* ADMIN LOGIN */}
      <Route
        path="/admin/login"
        element={
          <AuthLayout>
            <AdminLogin />
          </AuthLayout>
        }
      />

      {/* PUBLIC USER PAGES */}
      <Route
        path="/dashboard"
        element={
          <UserLayout>
            <Home />
          </UserLayout>
        }
      />

      <Route
        path="/cars"
        element={
          <UserLayout>
            <Cars />
          </UserLayout>
        }
      />

      {/* PROTECTED USER PAGE */}
      <Route
        path="/profile"
        element={
          <UserProtectRoute>           
              <Profile />
          </UserProtectRoute>
        }
      />

      <Route 
        path="/notif" 
        element={
        <UserProtectRoute>           
              <Notif/>
        </UserProtectRoute> 
        } 
        
      />


      {/* ADMIN PAGES (PROTECTED) */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectRoute>
            <AdminLayout>
              <AdminHome />
            </AdminLayout>
          </AdminProtectRoute>
        }
      />

      <Route
        path="/admin/cars"
        element={
          <AdminProtectRoute>
            <AdminLayout>
              <AdminCars />
            </AdminLayout>
          </AdminProtectRoute>
        }
      />

      <Route
        path="/admin/bookings"
        element={
          <AdminProtectRoute>
            <AdminLayout>
              <AdminBookings />
            </AdminLayout>
          </AdminProtectRoute>
        }
      />
      
    </Routes>
  );
}

export default App;
