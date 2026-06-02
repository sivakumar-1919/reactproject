import React, {  useEffect, useMemo, useState } from 'react'
import "./NonVeg.css";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './CartSlice';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagenation from "./Pagenation";
import "./Pagenation.css";
import TopControls from "./TopControls";
import axios from 'axios';
import api from './api';

function NonVeg() {
  let dispatch=useDispatch();

  
    // ✅ ADD THIS (MISSING PART FIX)
    const [nonvegItems, setNonvegItems] = useState([]);
    const [loading, setLoading] = useState(true); // ✅ ADD THIS


  const { search, minPrice, maxPrice } = useSelector(
    (state) => state.filter
  );
   
  // FETCH FROM BACKEND
  useEffect(() => {
    setLoading(true); 
    api
      .get("https://food-service-s5lq.onrender.com/products/NONVEG")
      .then((response) => {
        console.log(response.data);
        setNonvegItems(response.data);
         setLoading(false);
      })
      .catch((error) => {
        console.log(error);
         setLoading(false);
      });
  }, []);

  
const filteredItems = useMemo(() => {
  return nonvegItems.filter(item => {
    return item.name.toLowerCase().includes(search.toLowerCase()) &&
           item.price >= minPrice &&
           item.price <= maxPrice;
  });
}, [nonvegItems, search, minPrice, maxPrice]);

 

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
      <h2>🍗Loading NonVeg Items...</h2>
    </div>
  );
}

  return (
    <>


=======
   

   
     <TopControls />
    <div className="nonveg-container">
      {currentItems.map((item, index) => (
        <div className="card" key={index}>
          <img src={item.image} alt={item.name} />
          
          <div className="card-body">
            <h2>{item.name}</h2>
            <h3>₹{item.price}</h3>
            <p>{item.description}</p>

            <button onClick={()=>{dispatch(addToCart(item));toast.success(`product ${item.name} added to cart successfully!`);}} className="cart-btn">
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

export default React.memo(NonVeg);
