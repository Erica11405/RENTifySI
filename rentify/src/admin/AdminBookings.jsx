import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("https://rentifysi.onrender.com/api/book_car/");
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Update status (accept or decline)
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`https://rentifysi.onrender.com/api/book_car/${id}/`, {
        status: status,
      });

      // Update UI instantly without reload
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, status: status } : b
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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
        <table className="bookingTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Car</th>
              <th>With Driver?</th>
              <th>Pickup</th>
              <th>Return</th>
              <th>Image</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.fullName}</td>
                <td>{booking.email}</td>
                <td>{booking.car_name}</td>

                {/* With Driver */}
                <td>{booking.withDriver ? "Yes" : "No"}</td>

                <td>{booking.pickup_date}</td>
                <td>{booking.return_date}</td>

                {/* Image link */}
                <td>
                  {booking.image ? (
                    <a href={booking.image} target="_blank" rel="noopener noreferrer">
                      View Image
                    </a>
                  ) : (
                    "No image"
                  )}
                </td>

                {/* Status */}
                <td className={
                  booking.status === "Accepted"
                    ? "status-accepted"
                    : booking.status === "Declined"
                    ? "status-declined"
                    : "status-pending"
                }>
                  {booking.status || "Pending"}
                </td>

                {/* Actions */}
                <td>
                  <button
                    className="accept-btn"
                    onClick={() => updateStatus(booking.id, "Accepted")}
                  >
                    Accept
                  </button>

                  <button
                    className="decline-btn"
                    onClick={() => updateStatus(booking.id, "Declined")}
                  >
                    Decline
                  </button>
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
