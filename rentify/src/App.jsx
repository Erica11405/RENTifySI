import { Routes, Route } from "react-router-dom";

// Layouts
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import AuthLayout from "./components/AuthLayout";

// USER pages
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn";

// ADMIN pages
import AdminLogin from "./admin/AdminLogin";
import AdminHome from "./admin/AdminHome";
import AdminCars from "./admin/AdminCars";
import AdminBookings from "./admin/AdminBookings";

// Protected Routes
import UserProtectRoute from "./components/UserProtectRoute";
import AdminProtectRoute from "./components/AdminProtectRoute";

function App() {
  return (
    <Routes>

      {/* USER LOGIN */}
      <Route
        path="/login"
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
        path="/"
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
            <UserLayout>
              <Profile />
            </UserLayout>
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
