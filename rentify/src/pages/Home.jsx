import React, {useState} from "react";

function Home() {
  const [showModal, setShowModal] = useState (false);
  const handleOpen=()=> setShowModal(true);
  const handleClose=()=> setShowModal(false);

  const handleSubmit = (e) =>{
    e.preventDefault();
    alert("Booking Sent");
    setShowModal(false);
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Ride</h1>
          <p>Rent the best cars at affordable prices — anytime, anywhere.</p>
          <button className="hero-btn" onClick={handleOpen}>Book Now</button>
        </div>
      </section>

      <section className="popular">
        <h2>Popular Cars</h2>
        <div className="car-list">
          <div className="car-card">
            <img src="/car/car1.png" />
            <h3>Hyundai Starex</h3>
            <p>₱50/day</p>
          </div>

          <div className="car-card">
            <img src="/car/car2.png" />
            <h3>Toyota Hilux</h3>
            <p>₱60/day</p>
          </div>

          <div className="car-card">
            <img src="/car/car3.png"  />
            <h3>Toyota Innova</h3>
            <p>₱120/day</p>
          </div>

          <div className="car-card">
            <img src="/car/Hiace.png" />
            <h3>Toyota Hiace</h3>
            <p>₱200/day</p>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>
          We provide a seamless car rental experience with a wide range of
          vehicles and flexible booking options. Whether you need a car for a
          day or a week, we got you covered.
        </p>
      </section>


  {/*modal form*/}
  {showModal && (
    <div className="modalForm">
      <div className="modal">
        <button className="closeBtn" onClick={handleClose}>X</button>
        <h2>Book Your Car Now!!</h2>
        <form onSubmit={handleSubmit}>
          <label>
            FullName:
            <input type="text" required/></label>

          <label>
            Email:
            <input type="email" required/>
            </label>

          <label>
            Car
            <select required>
              <option value="">Select your prefered Car</option>
              <option>option 1</option>
              <option>option 2</option>
              <option>option 3</option>
            </select>
          </label>

          <label>
            Pickup date
            <input type="date" required/>
          </label>

          <label>
            Return date 
            <input type="date" required/>
          </label>

          <button type="submit" className="submitBtn">Submit</button>
        </form>
      </div>
    </div>
  )}
  </div>
  );
}

export default Home;
