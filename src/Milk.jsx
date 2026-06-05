
import React, { useEffect } from "react";
import "./Milk.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./CartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Pagenation from "./Pagenation";
import "./Pagenation.css";
import TopControls from "./TopControls";
import axios from "axios";
import api from "./api";

function Milk() {
     const dispatch = useDispatch();

      const [milkItems, setMilkItems] = useState([]);
       const [loading, setLoading] = useState(true); // ✅ ADD THIS

     const { search, minPrice, maxPrice } = useSelector(
    (state) => state.filter
  );

  
  // FETCH FROM BACKEND
  useEffect(() => {
    setLoading(true); 
    api
      .get("http://54.227.32.25:8082/products/MILK")
      .then((response) => {
        console.log(response.data);
        setMilkItems(response.data);
         setLoading(false);
      })
      .catch((error) => {
        console.log(error);
         setLoading(false);
      });
  }, []);


const filteredItems = milkItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPrice =
      item.price >= minPrice &&
      item.price <= maxPrice;

    return matchesSearch && matchesPrice;
  });



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
      <h2>🥛Loading Milk Items...</h2>
    </div>
  );
}

  return (
    <>

    <TopControls />
      <div className="milk-container">

        {currentItems.map((item, index) => (
          <div className="card" key={index}>

            <img src={item.image} alt={item.name} />

            <div className="card-body">
              <h2>{item.name}</h2>
              <h3>₹{item.price}</h3>
              <p>{item.description}</p>

              <button
                onClick={() => {
                  dispatch(addToCart({
                   id: item.id,
                   name: item.name,
                   price: item.price,
                   image: item.image,
                   description: item.description
                 }));
                  toast.success(`Product ${item.name} added to cart successfully!`);
                }}
                className="cart-btn"
              >
                Add to Cart
              </button>

            </div>

          </div>
        ))}

      </div>

      <Pagenation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />

    </>
  )
}

export default Milk;
