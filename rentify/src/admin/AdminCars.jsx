import React from "react";

function AdminCars() {
  return (
    <div className="admin-content">
      <h1>Manage Cars</h1>
      <button>Add New Car</button>
      <table>
        <thead>
          <tr>
            <th>Car</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hyundai Starex</td>
            <td>₱50/day</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminCars;