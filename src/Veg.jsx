import React, { useEffect, useMemo, useState } from "react";
import "./Veg.css";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./CartSlice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Pagenation from "./Pagenation";
import "./Pagenation.css";

import TopControls from "./TopControls";
import axios from "axios";
import api from "./api";

function Veg() {

  const dispatch = useDispatch();

  // ✅ ADD THIS (MISSING PART FIX)
  const [vegItems, setVegItems] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ ADD THIS

  const { search, minPrice, maxPrice } = useSelector(
    (state) => state.filter
  );

  // FETCH FROM BACKEND
  useEffect(() => {
  setLoading(true); 

  api
    .get("https://food-service-s5lq.onrender.com/products/VEG")
    .then((response) => {
      console.log(response.data);
      setVegItems(response.data);
      setLoading(false); // ✅ STOP LOADING HERE
    })
    .catch((error) => {
      console.log(error);
      setLoading(false); // ✅ STOP LOADING EVEN IF ERROR
    });
}, []);

  // FILTER LOGIC
  const filteredItems = useMemo(() => {
  return vegItems.filter(item => {
    return item.name.toLowerCase().includes(search.toLowerCase()) &&
           item.price >= minPrice &&
           item.price <= maxPrice;
  });
}, [vegItems, search, minPrice, maxPrice]);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;

  const currentItems = filteredItems.slice(firstItem, lastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

//  Loading data 
  if (loading) {
  return (
    <div className="loading-container">
      <h2>🍽 Loading Veg Items...</h2>
    </div>
  );
}

  return (
    <>

      <TopControls />

      <div className="veg-container">

        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div className="card" key={item.id || item.name}>
              <img src={item.image} alt={item.name} />

              <div className="card-body">
                <h2>{item.name}</h2>
                <h3>₹{item.price}</h3>
                <p>{item.description}</p>

                <button
                  className="cart-btn"
                  onClick={() => {
                    dispatch(addToCart(item));
                    toast.success(`${item.name} added to cart successfully!`);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2 className="no-items">No items found</h2>
        )}

      </div>

      <Pagenation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
}
export default React.memo(Veg);

