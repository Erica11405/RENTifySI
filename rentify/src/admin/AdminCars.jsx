import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/cars/");
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="admin-content">
        <h1>Manage Cars</h1>
        <p>Loading cars...</p>
      </div>
    );
  }

  return (
    <div className="admin-content">
      <h1>Manage Cars</h1>
      <button>Add New Car</button>
      {cars.length === 0 ? (
        <p>No cars available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Car</th>
              <th>Price</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.name}</td>
                <td>₱{car.price}/day</td>
                <td>{car.capacity} seats</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminCars;