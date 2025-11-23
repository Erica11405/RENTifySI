import React from "react";

function AdminBookings() {
  return (
    <div className="admin-content">
      <h1>Bookings</h1>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Car</th>
            <th>Pickup</th>
            <th>Return</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Juan Dela Cruz</td>
            <td>Hyundai Starex</td>
            <td>2025-02-12</td>
            <td>2025-02-15</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminBookings;