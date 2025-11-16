import React, { useState, useEffect } from "react";
import CarDetails from "../components/CarDetails";
import BookForm from "../components/BookForm";
import axios from 'axios';

function Cars() {

  const [cars, setCars ] = useState([])

  const [selectedCar, setSelectedCar] = useState(null);
  const [showCarDetails, setShowCarDetails] = useState(false);
  const [showBookForm, setShowBookForm] = useState(false);

  // const cars = [
  //   { id: 1, name: "Hyundai Starex", price: "₱50/day", seatNum: "12 people",  img: "/car/car1.png" },
  //   { id: 2, name: "Toyota Hilux", price: "₱60/day", seatNum: "5 people", img: "/car/car2.png" },
  //   { id: 3, name: "Toyota Innova", price: "₱120/day", seatNum: "7-8 people", img: "/car/car3.png" },
  //   { id: 4, name: "Toyota Hiace", price: "₱200/day", seatNum: "15 people",img: "/car/Hiace.png" },
  //   { id: 5, name: "car5", price: "₱/day", img: "/car/samplepic.png" },
  //   { id: 6, name: "car6", price: "₱/day", img: "/car/samplepic.png" },
  //   { id: 8, name: "car8", price: "₱/day", img: "/car/samplepic.png" },
  //   { id: 9, name: "car8", price: "₱/day", img: "/car/samplepic.png" },
  //   { id: 10, name: "car8", price: "₱/day", img: "/car/samplepic.png" },
  //   { id: 11, name: "car8", price: "₱/day", img: "/car/samplepic.png" },
  //   { id: 12, name: "car8", price: "₱/day", img: "/car/samplepic.png" }
  // ];

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
      "http://127.0.0.1:8000/api/book_car/",
      formData
    );

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }

    handleCloseModals();
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
      <div className="cars-page">
        <h1> Available Cars</h1>

        <div className="car-list">
          {cars.map((car) => (
            <div key={car.id} className="car-card">
              <img src={car.image} alt={car.name} />
              <h3>{car.name}</h3>
              <p>{car.price}</p>
              <p>{car.seatNum}</p>
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
        />
      )}
    </>
  );
}

export default Cars;
