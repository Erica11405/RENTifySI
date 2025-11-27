import React, { useState, useEffect } from "react";
import CarDetails from "../components/CarDetails";
import BookForm from "../components/BookForm";
import Navbar from "../components/Navbar";
import axios from 'axios';

function Cars() {

  const [cars, setCars ] = useState([])

  const [selectedCar, setSelectedCar] = useState(null);
  const [showCarDetails, setShowCarDetails] = useState(false);
  const [showBookForm, setShowBookForm] = useState(false);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCars = cars.filter((car) => car.name.toLowerCase().includes(searchQuery.toLowerCase()));


  const handleViewCar = (car) => {
    setSelectedCar(car);
    setShowCarDetails(true);
    setShowBookForm(false);
  };

  const handleCloseModals = () => {
    setShowCarDetails(false);
    setShowBookForm(false);
    setSelectedCar(null);
  };

  const handleRentFromDetails = () => {
    setShowCarDetails(false);
    setShowBookForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "https://rentifysi.onrender.com/api/book_car/",
        formData
      );

      console.log(response.data);

      setMessage("Booking Sent");

      const timer = setTimeout(() => {
        setMessage('');
      }, 2000)

      return () => clearTimeout(timer);
      
    } catch (error) {
      console.log(error);
    }

    handleCloseModals();
  };


  useEffect(() => {
    const fetchCar = async () => {
      const response = await axios.get("https://rentifysi.onrender.com/api/cars/");
      setCars (response.data)
    }
    fetchCar()
  }, [])

  return (
    <>
    <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <div className="cars-page">
        <h1> Available Cars</h1>

        <div className="car-list">
          {filteredCars.map((car) => (
            <div key={car.id} className="car-card">
              <img src={car.image} alt={car.name} />
              <h3>{car.name}</h3>
              <p>{car.price}</p>
              <button className="hero-btn" onClick={() => handleViewCar(car)}>
                View
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showCarDetails && (
        <CarDetails
          car={selectedCar}
          onClose={handleCloseModals}
          onRent={handleRentFromDetails}
        />
      )}
      
      {showBookForm && (
        <BookForm
          cars={cars}
          selectedCar={selectedCar}
          onSubmit={handleSubmit}
          onClose={handleCloseModals}
          message={message}
          setMessage={setMessage}
        />
      )}
    </>
  );
}

export default Cars;
