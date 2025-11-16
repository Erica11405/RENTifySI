import React, { useState } from "react";
import CarDetails from "../components/CarDetails";
import BookForm from "../components/BookForm";
import { useNavigate } from "react-router-dom";

function Home() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showCarDetails, setShowCarDetails] = useState(false);
  const [showBookForm, setShowBookForm] = useState(false);

  const cars = [
    { id: 1, name: "Hyundai Starex", price: "₱50/day", seatNum: "12 people",  img: "/car/car1.png" },
    { id: 2, name: "Toyota Hilux", price: "₱60/day", seatNum: "5 people", img: "/car/car2.png" },
    { id: 3, name: "Toyota Innova", price: "₱120/day", seatNum: "7-8 people", img: "/car/car3.png" },
    { id: 4, name: "Toyota Hiace", price: "₱200/day", seatNum: "15 people",img: "/car/Hiace.png" },
  ];

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

  // Handle booking form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking Sent");
    handleCloseModals();
  };

  return (
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
          {cars.map((car) => (
            <div key={car.id} className="car-card">
              <img src={car.img} alt={car.name} />
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
        />
      )}
    </div>
  );
}

export default Home;