import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminHome() {
  const [bookingCount, setBookingCount] = useState(0);
  const [carCount, setCarCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsResponse = await axios.get("http://127.0.0.1:8000/api/book_car/");
        const carsResponse = await axios.get("http://127.0.0.1:8000/api/cars/");
        
        setBookingCount(bookingsResponse.data.length);
        setCarCount(carsResponse.data.length);
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
      </div>
    </div>
  );
}

export default AdminHome;