import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/book_car/");
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="admin-content">
        <h1>Bookings</h1>
        <p>Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="admin-content">
      <h1>Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Car</th>
              <th>Pickup</th>
              <th>Return</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.fullName}</td>
                <td>{booking.email}</td>
                <td>{booking.car}</td>
                <td>{booking.pickup_date}</td>
                <td>{booking.return_date}</td>
                <td>
                  {booking.image ? (
                    <a href={`http://127.0.0.1:8000${booking.image}`} target="_blank" rel="noopener noreferrer">
                      View Image
                    </a>
                  ) : (
                    "No image"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminBookings;