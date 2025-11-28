import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Paypal from "../components/Paypal";

function Notif() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  const API_URL =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:8000"
      : "https://rentifysi.onrender.com";

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/book_car/`);
        const allBookings = response.data;


        const myBookings = allBookings.filter((b) => b.email === userEmail);

        setNotifications(myBookings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [userEmail]);

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="notifications-page">
      <button className="notif-back-btn" onClick={() => navigate("/dashboard")}>
        Back
      </button>

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

              {notif.status === "Pending" && (
                <p className="pending-text">Status: Pending — Waiting for admin approval.</p>
              )}

              {notif.status === "Accepted" && (
                <>
                  <p className="accepted-text">🎉 Your booking has been accepted!</p>
                  
                </>
              )}

              {notif.status === "Declined" && (
                <p className="declined-text">❌ Your booking has been declined.</p>
              )}

              <h3>{notif.car || "Car not found"}</h3>
              <p><strong>Name:</strong> {notif.fullName}</p>
              <p><strong>Booking ID:</strong> {notif.id}</p>
              <p><strong>Pickup:</strong> {notif.pickup_date}</p>
              <p><strong>Return:</strong> {notif.return_date}</p>
              <p><strong>Total Price:</strong> ₱{notif.total_price}</p>

                {notif.payment_mode === "cashless" && Number(notif.total_price) > 0 && (
                  <Paypal amount={Number(notif.total_price)} />
                )}
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notif;
