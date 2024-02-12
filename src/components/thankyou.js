import React from 'react';
import reactLogo from './thank_you.jpg'
import { Link } from 'react-router-dom';
import './css/menu.css';

const ThankYou = () => {
    return(
        <div style={{marginBottom:'300px'}}>
        <div>
            <img src={reactLogo} alt="react logo" />
        <h2>Thank You for Your Order!</h2>
        <p>Your food is on its way....Enjoy your meal....!!!</p>
        </div>
        <div className="thankyou-btn-grp">
        <Link to={`/vieworder`}>
        <button className="view-order">View Order</button> </Link>
        <Link to={`/paypalpayment`}>
        <button className="order-logout">Payment</button> </Link>
        <Link to={`/logout`}>
        <button className="order-logout">Logout</button> </Link>
        </div>
        </div>
    );
};

export default ThankYou;