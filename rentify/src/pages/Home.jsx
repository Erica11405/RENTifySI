import React, { useState, useEffect} from "react";
import CarDetails from "../components/CarDetails";
import BookForm from "../components/BookForm";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {

  const [cars, setCars] = useState([])
  const [selectedCar, setSelectedCar] = useState(null);
  const [showCarDetails, setShowCarDetails] = useState(false);
  const [showBookForm, setShowBookForm] = useState(false);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCars = cars.filter((car) => car.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const navigate = useNavigate();

  // Open booking form from hero button (no car pre-selected)
  const handleBookNow = () => {
    setSelectedCar(null);
    setShowBookForm(true);
    setShowCarDetails(false);
  };

  // Open car details modal when clicking "View" on a car card
  const handleViewCar = (car) => {
    setSelectedCar(car);
    setShowCarDetails(true);
    setShowBookForm(false);
  };

  // Close all modals
  const handleCloseModals = () => {
    setShowCarDetails(false);
    setShowBookForm(false);
    setSelectedCar(null);
  };

  // Switch from car details to booking form
  const handleRentFromDetails = () => {
    setShowCarDetails(false);
    setShowBookForm(true);
  };


  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/book_car/",
        formData
      );

      console.log(response.data);
      setMessage("Booking Sent");
      
      handleCloseModals(); // Close modals after successful submission

      const timer = setTimeout(() => {
        setMessage('');
      }, 2000)

      return () => clearTimeout(timer);
    } catch (error) {

      console.error("Booking submission failed:", error.response ? error.response.data : error.message);
      

      const errorMessage = error.response?.data?.car ? `Error: ${error.response.data.car}` : "Booking failed. Please check your inputs.";
      setMessage(errorMessage);
      
      const timer = setTimeout(() => {
        setMessage('');
      }, 5000) 

      return () => clearTimeout(timer);
    }
  };

    useEffect(() => {
    const fetchCar = async () => {
      const response = await axios.get("http://127.0.0.1:8000/api/cars/");
      setCars (response.data)
    }
    fetchCar()
  }, [])

  return (
    <>
    <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Ride</h1>
          <p>Rent the best cars at affordable prices — anytime, anywhere.</p>
          <button className="hero-btn" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </section>

      {/* Cars Section */}
      <section id="cars" className="popular">
        <h2>Popular Cars</h2>
        <div className="car-list">
          {filteredCars.slice(0,4).map((car) => (
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
        <button className="hero-btn" onClick={() => navigate("/cars")}>
          View all available cars
        </button>
      </section>

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

      {/* Modals */}
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

        />
      )}
    </div>
    </>
    
  );
}

export default Home;