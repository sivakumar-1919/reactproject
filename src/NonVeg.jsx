import React, { useState } from 'react'
import "./NonVeg.css";
import { useDispatch } from 'react-redux';
import { addToCart } from './CartSlice';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Pagenation from "./Pagenation";
import "./Pagenation.css";

function NonVeg() {
  let dispatch=useDispatch();
  

  const nonVegItems = [
  {
    name: "Chicken Biryani",
    price: 280,
    description: "Aromatic basmati rice cooked with spicy chicken pieces.",
    image: "/nonvegimages/chickenbiryani.jpg",
  },
  {
    name: "Butter Chicken",
    price: 320,
    description: "Tender chicken cooked in rich creamy tomato gravy.",
    image: "/nonvegimages/butterchicken.jpg",
  },
  {
    name: "Chicken Tandoori",
    price: 350,
    description: "Juicy chicken marinated with spices and roasted in tandoor.",
    image: "/nonvegimages/chickentandoori.jpg",
  },
  {
    name: "Chicken Fried Rice",
    price: 220,
    description: "Stir-fried rice tossed with chicken and vegetables.",
    image: "/nonvegimages/chickenfriedrice.jpg",
  },
  {
    name: "Mutton Curry",
    price: 420,
    description: "Slow cooked mutton in traditional spicy masala gravy.",
    image: "/nonvegimages/muttoncurry.jpg",
    
  },
  {
    name: "Chicken Lollipop",
    price: 260,
    description: "Crispy deep-fried chicken wings with spicy coating.",
    image: "/nonvegimages/chickenlollipop.jpg",
  },
  {
    name: "Fish Fry",
    price: 300,
    description: "Fresh fish marinated with spices and shallow fried.",
    image: "/nonvegimages/fishfry.jpg",
  },
  {
    name: "Mutton Biryani",
    price: 210,
    description: "Mutton Biryani is a fragrant and spicy rice dish",
    image: "/nonvegimages/muttonbiryani.jpg",
  },
  {
    name: "Prawn Masala",
    price: 380,
    description: "Juicy prawns cooked in spicy onion tomato masala.",
    image: "/nonvegimages/prawnsmasala.jpg",
  },
  {
    name: "Egg Curry",
    price: 180,
    description: "Boiled eggs cooked in flavorful spicy gravy.",
    image: "/nonvegimages/eggcurry.jpg",
  },
];

const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;

  const currentItems = nonVegItems.slice(firstItem, lastItem);

  const totalPages = Math.ceil(nonVegItems.length / itemsPerPage);

  return (
    <>
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

export default NonVeg;
