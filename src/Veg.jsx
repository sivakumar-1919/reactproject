import React, { useState } from "react";
import "./Veg.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagenation from "./Pagenation";
import "./Pagenation.css";

function Veg() {

  let dispatch = useDispatch();

  const vegItems = [
    {
      name: "Paneer Butter Masala",
      price: 240,
      description: "Soft paneer cubes cooked in rich creamy tomato gravy.",
      image: "/vegimages/paneer-butter-masala.jpg",
    },
    {
      name: "Veg Biryani",
      price: 180,
      description: "basmati rice cooked with fresh vegetables and spices.",
      image: "/vegimages/vegbiryani.jpg",
    },
    {
      name: "Masala Dosa",
      price: 120,
      description: "Crispy dosa filled with spiced potato masala.",
      image: "/vegimages/masaladosa.jpg",
    },
    {
      name: "Veg Manchurian",
      price: 200,
      description: "Deep-fried veggie balls tossed in spicy Indo-Chinese sauce.",
      image: "/vegimages/vegmanchurian.jpg",
    },
    {
      name: "Palak Paneer",
      price: 230,
      description: "Paneer cubes cooked in smooth spinach gravy.",
      image: "/vegimages/palakpaneer.jpg",
    },
    {
      name: "Chole Bhature",
      price: 160,
      description: "Spicy chickpea curry served with fluffy fried bhature.",
      image: "/vegimages/cholebhature.jpg"
    },
    {
      name: "Veg Fried Rice",
      price: 150,
      description: "Stir-fried rice with vegetables and soy sauce.",
      image: "/vegimages/vegfriedrice.jpg"
    },
    {
      name: "Aloo Gobi",
      price: 140,
      description: "Dry curry made with potatoes and cauliflower.",
      image: "/vegimages/aloogobi.jpg"
    },
    {
      name: "Matar Paneer",
      price: 220,
      description: "Paneer and green peas cooked in rich tomato gravy.",
      image: "/vegimages/Matarpaneer.jpg"
    },
    {
      name: "Veg Noodles",
      price: 130,
      description: "Stir-fried noodles with fresh vegetables.",
      image: "/vegimages/vegnoodles.jpg"
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;

  const currentItems = vegItems.slice(firstItem, lastItem);

  const totalPages = Math.ceil(vegItems.length / itemsPerPage);

  return (
    <>

      <div className="veg-container">

        {currentItems.map((item, index) => (
          <div className="card" key={index}>

            <img src={item.image} alt={item.name} />

            <div className="card-body">
              <h2>{item.name}</h2>
              <h3>₹{item.price}</h3>
              <p>{item.description}</p>

              <button
                onClick={() => {
                  dispatch(addToCart(item));
                  toast.success(`product ${item.name} added to cart successfully!`);
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
  );
}

export default Veg;

