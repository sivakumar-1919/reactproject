import React, { useEffect, useMemo, useState } from 'react'
import Home from './Home'
import Veg from './Veg'
import NonVeg from './NonVeg'
import "@fortawesome/fontawesome-free/css/all.min.css";
 import OAuthSuccess from "./OAuthSuccess";

import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import "./App.css";
import Milk from './Milk';
import Chocolates from './Chocolates';
import Cart from './Cart';
import AboutUs from "./AboutUs";
import ContactUs from './ContactUs';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Orders from './Orders';
import Register from './Register';
import Login from './Login';
import { clearCart } from './CartSlice';
import { clearOrders } from './OrderSlice';
import ErrorBoundary from './ErrorBoundary';




function App() {

  const dispatch = useDispatch();

    const [user, setUser] = useState(  // ✅ NEW
  JSON.parse(localStorage.getItem("currentUser"))
);

const [showDropdown, setShowDropdown] = useState(false); // ✅ NEW

useEffect(() => {
  const syncUser = () => {
    setUser(JSON.parse(localStorage.getItem("currentUser")));
  };

  window.addEventListener("storage", syncUser);

  return () => {
    window.removeEventListener("storage", syncUser);
  };
}, []);
   
   // ✅ Get cart items from Redux store
  const cartItems = useSelector(state => state.cart);

  // ✅ Calculate total quantity
  const totalQuantity = useMemo(() => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}, [cartItems]);

   const handleLogout = () => {
    dispatch(clearCart()); // clear cart
     dispatch(clearOrders());   // 🔥 clear orders 
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    setUser(null);

    window.dispatchEvent(new Event("storage")); // 🔥 important
  };

  const toggleDropdown = () => {
  setShowDropdown(!showDropdown); // ✅ NEW
};

  return (
    <>
      <BrowserRouter>

     
      <nav className="navbar">
  <Link className="nav-link" to="/">
  <i className="fa-solid fa-house"></i>
  <span>Home</span>
</Link>

<Link className="nav-link" to="/veg">
  <i className="fa-solid fa-carrot"></i>
  <span>Veg</span>
</Link>

<Link className="nav-link" to="/nonveg">
  <i className="fa-solid fa-drumstick-bite"></i>
  <span>NonVeg</span>
</Link>

<Link className="nav-link" to="/milk">
  <i className="fa-solid fa-glass-water"></i>
  <span>Milk</span>
</Link>

<Link className="nav-link" to="/chocolates">
  <i className="fa-solid fa-candy-cane"></i>
  <span>Chocolates</span>
</Link>

<Link className="nav-link" to="/cart">
  <i className="fa-solid fa-cart-shopping"></i>
  <span>Cart({totalQuantity})</span>
</Link>

<Link className="nav-link" to="/aboutus">
  <i className="fa-solid fa-circle-info"></i>
  <span>AboutUs</span>
</Link>

<Link className="nav-link" to="/contactus">
  <i className="fa-solid fa-address-book"></i>
  <span>ContactUs</span>
</Link>

<Link className="nav-link" to="/orders">
  <i className="fa-solid fa-box"></i>
  <span>Orders</span>
</Link>



<Link className="nav-link" to="/register">
  <i className="fa-solid fa-user-plus"></i>
  <span>Register</span>
</Link>
  
{user ? (
  <div className="user-section">

    <span className="nav-link user-name" onClick={toggleDropdown}>
      👤 {user.name} ⬇️
    </span>

    {showDropdown && (
      <div className="dropdown-menu">
        
        <p className="dropdown-item">Email: {user.email}</p>

        <button className="dropdown-item logout-btn" onClick={handleLogout}> 
          Logout
        </button>

      </div>
    )}

  </div>
) : (
  <Link className='nav-link' to="/login">  <i className="fa-solid fa-right-to-bracket"></i> <span>Login</span></Link>
)}

  <ToastContainer position="top-right" autoClose={2000}></ToastContainer>

</nav>


     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/veg" element={<ErrorBoundary><Veg /> </ErrorBoundary> } />

       <Route path="/nonveg" element={<ErrorBoundary><NonVeg /></ErrorBoundary> } />
        <Route path="/milk" element={<Milk />} />
        <Route path="/chocolates" element={<Chocolates />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
         <Route path="/Orders" element={<Orders />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
         


  <Route path="/oauth-success" element={<OAuthSuccess />} />

          

        

      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App;    


