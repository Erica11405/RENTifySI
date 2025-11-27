import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  // Get stored user info (from login)
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("https://rentifysi.onrender.com/api/bookings/");
        const allBookings = response.data;

        // Filter bookings that belong to the logged-in user
        const myBookings = allBookings.filter(
          (b) => b.email === userEmail
        );

        setBookings(myBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="profile-page">
      
      <button className="back-btn" onClick={() => navigate("/")}>X</button>

      <h1>Your Profile</h1>

      {/* PROFILE  */}
      <div className="profile-info">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Profile"
          className="profile-avatar"
        />

        <div className="profile-details">
          <p><strong>Name:</strong> {userName || "Not Provided"}</p>
          <p><strong>Email:</strong> {userEmail || "Not Provided"}</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h2>Your Booking History</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h3>{booking.car_name}</h3>
              <p><strong>Full Name:</strong> {booking.fullName}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Pickup:</strong> {booking.pickup_date}</p>
              <p><strong>Return:</strong> {booking.return_date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;
