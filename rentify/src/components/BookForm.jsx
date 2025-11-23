import React, { useState } from "react";

function BookForm({ cars, selectedCar, onSubmit, onClose, setMessage, message }) {

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [pickup_date, setPickupDate] = useState('')
  const [return_date, setReturndate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      fullName,
      email,
      car: selectedCar?.name,
      pickup_date,
      return_date,
    });
  };

  return (
    <div className="modalForm">
      <div className="modal">
        <button className="closeBtn" onClick={onClose}>
          X
        </button>

        <h2>Book Your Car Now!!</h2>
        {
          message && (
            <p style={{
              textAlign: "center",
              color: "green"
            }}>{message}</p>
          )
        }
        <form onSubmit={handleSubmit}>
          
          <label>
            Full Name:
            <input className="input" type="text" value={fullName} onChange={(e)=> setFullName(e.target.value)} required />
          </label>

          <label>
            Email:
            <input className="input" type="email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
          </label>

          <label>
            Car:
            <select className="input" required defaultValue="">
              <option value="" disabled>
                {selectedCar ? selectedCar.name : "Select your preferred car"}
              </option>
              {cars.map((car) => (
                <option key={car.id} value={car.name}>
                  {car.name}
                </option>
              ))}
            </select>
          </label>

          {/* add rent with driver/ without driver */}

          <label>
            Pickup date:
            <input className="input" type="date" value={pickup_date} onChange={(e)=> setPickupDate(e.target.value)} required />
          </label>

          <label>
            Return date:
            <input className="input" type="date" value={return_date} onChange={(e)=> setReturndate(e.target.value)} required />
          </label>

          <label>
            Attach Image:
            <input className="input" type="file" onChange={(e)=> setImage(e.emage)} required />
          </label>

          

          <button type="submit" className="submitBtn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookForm;