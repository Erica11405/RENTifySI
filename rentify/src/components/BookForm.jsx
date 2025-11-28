import React, { useState } from "react";

function BookForm({ cars, selectedCar, onSubmit, onClose, message }) {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCarName, setSelectedCarName] = useState(selectedCar ? selectedCar.name : "");
  const [withDriver, setWithDriver] = useState("withoutDriver");
  const [pickup_date, setPickupDate] = useState('');
  const [return_date, setReturndate] = useState('');
  const [image, setImage] = useState(null);

  // add total price
  const calculatePrice = () => {
    if (!selectedCarName || !pickup_date || !return_date) return 0;

    const car = cars.find(c => c.name === selectedCarName);
    if (!car) return 0;

    const carPrice = Number(car.price);
    const driverFee = 800;

    const start = new Date(pickup_date);
    const end = new Date(return_date);

    const diff = end - start;
    const rentalDays = Math.max(1, diff / (1000 * 60 * 60 * 24));

    if (withDriver === "withDriver") {
      return (carPrice * rentalDays) + (driverFee * rentalDays);
    }
    return carPrice * rentalDays;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formSubmit = new FormData();
    formSubmit.append("fullName", fullName);
    formSubmit.append("email", email);
    formSubmit.append("car", selectedCarName);
    formSubmit.append("pickup_date", pickup_date);
    formSubmit.append("return_date", return_date);
    formSubmit.append("withDriver", withDriver);

    // total price
    formSubmit.append("total_price", calculatePrice());

    if (selectedCarName === "") {
      alert("Please select a car.");
      return;
    }

    if (image) formSubmit.append("image", image);

    onSubmit(formSubmit);
  };

  return (
    <div className="modalForm">
      <div className="modal">
        <button className="closeBtn" onClick={onClose}>
          X
        </button>

        <h2>Book Your Car Now!!</h2>

        {message && (
          <p style={{ textAlign: "center", color: "green" }}>{message}</p>
        )}

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
            <select 
              className="input" 
              required 
              value={selectedCarName} 
              onChange={(e)=> setSelectedCarName(e.target.value)}
            >
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

          <label>
            Driver Option:
            <select 
              className="input"
              required
              value={withDriver}
              onChange={(e) => setWithDriver(e.target.value)}
            >
              <option value="withoutDriver">Without Driver</option>
              <option value="withDriver">With Driver</option>
            </select>
          </label>

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
            <input className="input" type="file" onChange={(e)=> setImage(e.target.files[0])} required />
          </label>

          {/* total price */}
          <p style={{ fontWeight:"bold", marginTop:"10px" }}>
            Total Price: ₱{calculatePrice()}
          </p>

          <button type="submit" className="submitBtn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default BookForm;
