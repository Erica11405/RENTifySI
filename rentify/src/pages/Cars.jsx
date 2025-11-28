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

  const API_URL = window.location.hostname === "localhost" ? "http://127.0.0.1:8000" : "https://rentifysi.onrender.com";
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
        `${API_URL}/api/book_car/`,
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
      const response = await axios.get(`${API_URL}/api/cars/`);
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

      {/* About Section */}
      <section id="about" className="about">
        <h2>About Us</h2>
        <p>
          We provide a seamless car rental experience with a wide range of
          vehicles and flexible booking options. Whether you need a car for a
          day or a week, we got you covered.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>
          Email us at <strong>renify@gmail.com</strong> or call{" "}
          <strong>0912-345-6789</strong> for more questions
        </p>
      </section>

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
