import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminHome() {
  const [bookingCount, setBookingCount] = useState(0);
  const [carCount, setCarCount] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const API_URL =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:8000"
      : "https://rentifysi.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsResponse = await axios.get(`${API_URL}/api/book_car/`);
        const carsResponse = await axios.get(`${API_URL}/api/cars/`);

        const bookings = bookingsResponse.data;

        // Compute total earnings
        const earnings = bookings.reduce(
          (sum, booking) => sum + Number(booking.total_price || 0),
          0
        );

        setBookingCount(bookings.length);
        setCarCount(carsResponse.data.length);
        setTotalEarnings(earnings);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-content">
      <h1>Welcome Admin</h1>
      <p>Overview of system analytics goes here.</p>

      <div style={{ marginTop: "20px" }}>
        <h2>Statistics</h2>

        <p><strong>Total Bookings:</strong> {bookingCount}</p>
        <p><strong>Total Cars:</strong> {carCount}</p>
        <p><strong>Total Earnings:</strong> ₱{totalEarnings.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default AdminHome;
