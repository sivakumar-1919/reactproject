// import React, { useState } from 'react'
// import Home from './Home'
// import Veg from './Veg'
// import NonVeg from './NonVeg'
// import "@fortawesome/fontawesome-free/css/all.min.css";


// import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';

// import "./App.css";
// import Milk from './Milk';
// import Chocolates from './Chocolates';
// import Cart from './Cart';
// import AboutUs from "./AboutUs";
// import ContactUs from './ContactUs';
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Orders from './Orders';
// import Register from './Register';
// import Login from './Login';
// import { clearCart } from './CartSlice';



// function App() {

//   const dispatch = useDispatch();

//     const [user, setUser] = useState(  // ✅ NEW
//   JSON.parse(localStorage.getItem("currentUser"))
// );

// const [showDropdown, setShowDropdown] = useState(false); // ✅ NEW
   
//    // ✅ Get cart items from Redux store
//   const cartItems = useSelector(state => state.cart);

//   // ✅ Calculate total quantity
//   const totalQuantity = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );

//    const handleLogout = () => {
//     dispatch(clearCart()); // clear cart
//     localStorage.removeItem("currentUser");
//     localStorage.removeItem("isLoggedIn");
//     setUser(null);
//   };

//   const toggleDropdown = () => {
//   setShowDropdown(!showDropdown); // ✅ NEW
// };

//   return (
//     <>
//       <BrowserRouter>

     
//       <nav className="navbar">
//   <Link className="nav-link" to="/"><i className="fa-solid fa-house"></i>Home</Link> 
//   <Link className="nav-link" to="/veg"> <i className="fa-solid fa-apple-whole"></i>Veg</Link> 
//   <Link className="nav-link" to="/nonveg"><i className="fa-solid fa-drumstick-bite"></i>NonVeg</Link>
//   <Link className="nav-link" to="/milk">Milk</Link>
//   <Link className="nav-link" to="/chocolates">Chocolates</Link>
   
  

//   <Link className='nav-link' to="/cart"><i className="fa-solid fa-cart-arrow-down"></i>Cart({totalQuantity})</Link>
//   <Link className='nav-link' to="/aboutus">AboutUs</Link>
//   <Link className='nav-link' to="/contactus">ContactUs</Link>
//   <Link className='nav-link' to="/Orders">Orders</Link>
//   <Link className='nav-link' to="/Register">Register</Link>
  
// {user ? (
//   <div className="user-section">

//     <span className="nav-link user-name" onClick={toggleDropdown}>
//       👤 {user.name} ⬇️
//     </span>

//     {showDropdown && (
//       <div className="dropdown-menu">
        
//         <p className="dropdown-item">Email: {user.email}</p>

//         <button className="dropdown-item logout-btn" onClick={handleLogout}> 
//           Logout
//         </button>

//       </div>
//     )}

//   </div>
// ) : (
//   <Link className='nav-link' to="/login">Login</Link>
// )}

//   <ToastContainer position="top-right" autoClose={2000}></ToastContainer>

// </nav>


     
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/veg" element={<Veg />} />
//         <Route path="/nonveg" element={<NonVeg />} />
//         <Route path="/milk" element={<Milk />} />
//         <Route path="/chocolates" element={<Chocolates />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/aboutus" element={<AboutUs />} />
//         <Route path="/contactus" element={<ContactUs />} />
//          <Route path="/Orders" element={<Orders />} />
//           <Route path="/Register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
          

        

//       </Routes>

//     </BrowserRouter>
//     </>
//   )
// }

// export default App;    


import React, { useState, useEffect } from 'react';
import Home from './Home';
import Veg from './Veg';
import NonVeg from './NonVeg';
import Milk from './Milk';
import Chocolates from './Chocolates';
import Cart from './Cart';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Orders from './Orders';
import Register from './Register';
import Login from './Login';

import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from './CartSlice';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  // Current user
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")));

  // Dropdown state
  const [showDropdown, setShowDropdown] = useState(false);

  // Track mobile screen
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cart items
  const cartItems = useSelector(state => state.cart);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Logout function
  const handleLogout = () => {
    dispatch(clearCart());
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    setShowDropdown(false); // close dropdown
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector(".dropdown-menu");
      const username = document.querySelector(".user-name");
      if (
        dropdown &&
        username &&
        !dropdown.contains(event.target) &&
        !username.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link className="nav-link" to="/"><i className="fa-solid fa-house"></i> Home</Link>
        <Link className="nav-link" to="/veg"><i className="fa-solid fa-apple-whole"></i> Veg</Link>
        <Link className="nav-link" to="/nonveg"><i className="fa-solid fa-drumstick-bite"></i> NonVeg</Link>
        <Link className="nav-link" to="/milk">Milk</Link>
        <Link className="nav-link" to="/chocolates">Chocolates</Link>
        <Link className="nav-link" to="/cart"><i className="fa-solid fa-cart-arrow-down"></i> Cart({totalQuantity})</Link>
        <Link className="nav-link" to="/aboutus">AboutUs</Link>
        <Link className="nav-link" to="/contactus">ContactUs</Link>
        <Link className="nav-link" to="/orders">Orders</Link>
        <Link className="nav-link" to="/register">Register</Link>

        {user ? (
          <div className="user-section">
            {/* Username button */}
            <span
              className="nav-link user-name"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              👤 {user.name} ⬇️
            </span>

            {/* Dropdown menu */}
            {showDropdown && (
              <div className="dropdown-menu">
                <p className="dropdown-item">Email: {user.email}</p>
                <button
                  className="dropdown-item logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link className="nav-link" to="/login">Login</Link>
        )}

        <ToastContainer position="top-right" autoClose={2000} />
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<NonVeg />} />
        <Route path="/milk" element={<Milk />} />
        <Route path="/chocolates" element={<Chocolates />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;