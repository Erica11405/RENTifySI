import React from "react";

function CarDetails({ car, onClose, onRent }) {
  if (!car) return null;

  return (
    <div className="modalForm">
      <div className="modal">
        <button className="closeBtn" onClick={onClose}>
          X
        </button>

        <h2>{car.name}</h2>
        <img src={car.image} alt={car.name} />
        <p>Price: {car.price}</p>
        <p>Seat Capacity: {car.capacity}</p>

        <button className="hero-btn" onClick={onRent}>
          Rent This Car
        </button>
      </div>
    </div>
  );
}

export default CarDetails;