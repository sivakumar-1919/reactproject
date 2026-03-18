import React from "react";
import "./Milk.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Pagenation from "./Pagenation";
import "./Pagenation.css";

function Chocolates() {

  const dispatch = useDispatch();

  const chocolateItems = [
    {
      name: "Dark Chocolate Bar",
      price: 120,
      description: "Rich and intense dark chocolate made with high cocoa content.",
      image: "/chocolatesimages/darkchocolatebar.jpg",
    },
    {
      name: "Milk Chocolate Bar",
      price: 110,
      description: "Smooth and creamy milk chocolate loved by all age groups.",
      image: "/chocolatesimages/milkchocolatebar.jpg",
    },
    {
      name: "Chocolate Truffle",
      price: 150,
      description: "Soft chocolate balls coated with cocoa powder and cream filling.",
      image: "/chocolatesimages/chocolatetruffle.jpg",
    },
    {
      name: "Chocolate Brownie",
      price: 160,
      description: "Soft and fudgy chocolate brownie with rich cocoa flavor.",
      image: "/chocolatesimages/chocolatebrownie.jpg",
    },
    {
      name: "Chocolate Lava Cake",
      price: 180,
      description: "Warm chocolate cake with a delicious molten chocolate center.",
      image: "/chocolatesimages/chocolatelavacake.jpg",
    },
    {
      name: "Chocolate Ice Cream",
      price: 140,
      description: "Creamy chocolate flavored ice cream topped with chocolate syrup.",
      image: "/chocolatesimages/chocolateicecream.jpg",
    },
    {
      name: "Cadbury Dairy Milk Shake",
      price: 180,
      description: "creamy milk chocolate bar with rich cocoa flavor that melts in your mouth.",
      image: "/chocolatesimages/cadburydairymilkshake.jpg"
    },
    {
      name: "Chocolate Donut",
      price: 130,
      description: "Soft donut coated with rich chocolate glaze and sprinkles.",
      image: "/chocolatesimages/chocolatedonut.jpg",
    },
    {
      name: "Chocolate Cupcake",
      price: 140,
      description: "Fluffy chocolate cupcake topped with creamy chocolate frosting.",
      image: "/chocolatesimages/chocolatecupcake.jpg",
    },
    {
      name: "Chocolate Mousse",
      price: 170,
      description: "Light and airy chocolate dessert with smooth creamy texture.",
      image: "/chocolatesimages/chocolatemousse.jpg",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;

  const currentItems = chocolateItems.slice(firstItem, lastItem);

  const totalPages = Math.ceil(chocolateItems.length / itemsPerPage);

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
  );
}

export default Chocolates;