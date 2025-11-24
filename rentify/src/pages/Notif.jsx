import React, { useEffect, useState } from "react";
import axios from "axios";

function Notif() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/book_car/");
        const allBookings = response.data;


        const myBookings = allBookings.filter(
          (b) => b.email === userEmail
        );

        setNotifications(myBookings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userEmail]);

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  return (
    <div className="notifications-page">
      <h1>Your Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <div className="notification-list">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notification-card ${
                notif.status === "Accepted"
                  ? "notif-accepted"
                  : notif.status === "Declined"
                  ? "notif-declined"
                  : "notif-pending"
              }`}
            >
              <h3>{notif.car_name}</h3>

              <p><strong>Booking ID:</strong> {notif.id}</p>
              <p><strong>Pickup:</strong> {notif.pickup_date}</p>
              <p><strong>Return:</strong> {notif.return_date}</p>

              {notif.status === "Pending" && (
                <p className="pending-text">Status: Pending — Waiting for admin approval.</p>
              )}

              {notif.status === "Accepted" && (
                <p className="accepted-text">🎉 Your booking has been accepted!</p>
              )}

              {notif.status === "Declined" && (
                <p className="declined-text">❌ Your booking has been declined.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notif;
