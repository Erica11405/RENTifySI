import React from "react";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Ride</h1>
          <p>Rent the best cars at affordable prices — anytime, anywhere.</p>
          <button className="hero-btn">Book Now</button>
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
    </div>
  );
}

export default Home;
