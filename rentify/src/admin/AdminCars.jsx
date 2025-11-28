import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    capacity: "",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const API_URL =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:8000"
      : "https://rentifysi.onrender.com";

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/cars/`);

      setCars(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const openAddModal = () => {
    setEditMode(false);
    setCurrentCar(null);
    setFormData({
      name: "",
      price: "",
      capacity: "",
      image: null
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const openEditModal = (car) => {
    setEditMode(true);
    setCurrentCar(car);
    setFormData({
      name: car.name,
      price: car.price,
      capacity: car.capacity,
      image: null
    });
    setImagePreview(`${API_URL}${car.image}`);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      price: "",
      capacity: "",
      image: null
    });
    setImagePreview(null);
    setCurrentCar(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("capacity", formData.capacity);
    
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      if (editMode) {
        await axios.put(`${API_URL}${currentCar.id}/`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        // Replaced alert with console.log for compliance
        console.log("Car updated successfully!");
      } else {
        await axios.post(API_URL, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        // Replaced alert with console.log for compliance
        console.log("Car added successfully!");
      }
      
      fetchCars();
      closeModal();
    } catch (error) {
      console.error("Error saving car:", error);
      // Replaced alert with console.log for compliance
      console.log("Error saving car. Please try again.");
    }
  };

  const handleDelete = async (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axios.delete(`${API_URL}/${carId}/`);
        // Replaced alert with console.log for compliance
        console.log("Car deleted successfully!");
        fetchCars();
      } catch (error) {
        console.error("Error deleting car:", error);
        // Replaced alert with console.log for compliance
        console.log("Error deleting car. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <h1>Manage Cars</h1>
        <p>Loading cars...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1>Manage Cars</h1>
      <button onClick={openAddModal} className="car-add-button">Add New Car</button>
      
      {cars.length === 0 ? (
        <p>No cars available.</p>
      ) : (
        <table className="car-management-table">
          <thead>
            <tr>
              <th className="car-table-header">ID</th>
              <th className="car-table-header">Image</th>
              <th className="car-table-header">Car</th>
              <th className="car-table-header">Price</th>
              <th className="car-table-header">Capacity</th>
              <th className="car-table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td className="car-table-data">{car.id}</td>
                <td className="car-table-data">
                  <img 
                    src={`${API_URL}${car.image}`} 
                    alt={car.name}
                    className="car-thumbnail"
                  />
                </td>
                <td className="car-table-data">{car.name}</td>
                <td className="car-table-data">₱{car.price}/day</td>
                <td className="car-table-data">{car.capacity} seats</td>
                <td className="car-table-data">
                  <button onClick={() => openEditModal(car)} className="car-edit-button">Edit</button>
                  <button onClick={() => handleDelete(car.id)} className="car-delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="car-modal-overlay">
          <div className="car-modal-content">
            <h2>{editMode ? "Edit Car" : "Add New Car"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="car-form-group">
                <label className="car-label">Car Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="car-input"
                />
              </div>

              <div className="car-form-group">
                <label className="car-label">Price (per day):</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  className="car-input"
                />
              </div>

              <div className="car-form-group">
                <label className="car-label">Capacity (seats):</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  required
                  className="car-input"
                />
              </div>

              <div className="car-form-group">
                <label className="car-label">Car Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!editMode}
                  className="car-input"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="car-image-preview" />
                )}
              </div>

              <div className="car-button-group">
                <button type="submit" className="car-submit-button">
                  {editMode ? "Update Car" : "Add Car"}
                </button>
                <button type="button" onClick={closeModal} className="car-cancel-button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCars;