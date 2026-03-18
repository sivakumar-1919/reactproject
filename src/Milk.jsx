
import React from "react";
import "./Milk.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Pagenation from "./Pagenation";
import "./Pagenation.css";


function Milk() {
     const dispatch = useDispatch();
  const milkItems = [
  {
    name: "Rasmalai",
    price: 180,
    description: "Soft paneer balls soaked in creamy saffron flavored milk.",
    image: "/milkimages/rasmalai.jpg",
  },
  {
    name: "Rabri",
    price: 160,
    description: "Thick sweet condensed milk dessert topped with dry fruits.",
    image: "/milkimages/rabri.jpg",
  },
  {
    name: "Kaju Milkshake",
    price: 140,
    description: "Rich and creamy milkshake made with cashews and milk.",
    image: "/milkimages/kajumilkshake.jpg",
  },
  {
    name: "Badam Milk",
    price: 130,
    description: "Traditional almond flavored milk served hot or cold.",
    image: "/milkimages/badammilk.jpg",
  },
  {
    name: "Kulfi",
    price: 120,
    description: "Indian traditional frozen milk dessert with nuts.",
    image: "/milkimages/kulfi.jpg",
  },
  {
    name: "Basundi",
    price: 170,
    description: "Sweet thickened milk dessert flavored with cardamom and nuts.",
    image: "/milkimages/basundi.jpeg",
  },
  {
    name: "Pista Milkshake",
    price: 150,
    description: "Refreshing milkshake made with pistachios and creamy milk.",
    image: "/milkimages/pistabadammilk.jpg",
  },
  {
    name: "Chocolate Milkshake",
    price: 140,
    description: "Cold chocolate flavored milkshake topped with cream.",
    image: "/milkimages/chocolatemilkshake.jpg",
  },
  {
    name: "Strawberry Milkshake",
    price: 140,
    description: "Sweet and refreshing flavoured strawberry milk drink.",
    image: "/milkimages/strawberrymilkshake.jpg",
  },
  {
    name: "Falooda",
    price: 160,
    description: "Popular milk dessert with vermicelli, ice cream and nuts.",
    image: "/milkimages/falooda.jpg",
  },
];

const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;

  const currentItems = milkItems.slice(firstItem, lastItem);

  const totalPages = Math.ceil(milkItems.length / itemsPerPage);

  return (
    <>
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
                  dispatch(addToCart(item));
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
