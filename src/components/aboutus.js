import React from 'react';

const AboutUs = () => {
  return (
    <div>
      <div className="container about-section">
        <h1>About Us</h1>
        <p>
          We are happy you’ve chosen Hungry-Hub as your go-to place for quick, delicious, and hassle-free meals. We are devoted to providing you with a memorable dining experience from the convenience of your home since we are enthusiastic about cuisine. Our goal at Hungry-Hub is to introduce you to the best nearby eateries and deliver their delectable cuisine straight to your door. We are devoted to bringing about the idea that everyone should have access to wholesome food.
        </p>
      </div>

      <h2 className="text-center mt-5">Our Team</h2>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2>Dev Shah</h2>
              <p className="title">CEO & Founder</p>
              <p>dev@gmail.com</p>
              <button className="btn btn-primary">Contact</button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2>Karan Jadav</h2>
              <p className="title">Developer</p>
              <p>karan@gmail.com</p>
              <button className="btn btn-primary">Contact</button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2>Priya Parikh</h2>
              <p className="title">Developer</p>
              <p>priya@gmail.com</p>
              <button className="btn btn-primary">Contact</button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2>Bhavika Patel</h2>
              <p className="title">Designer</p>
              <p>bhavika@gmail.com</p>
              <button className="btn btn-primary">Contact</button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2>Subham Subham</h2>
              <p className="title">Tester</p>
              <p>subham@gmail.com</p>
              <button className="btn btn-primary">Contact</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
