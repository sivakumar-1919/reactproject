import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setPriceRange } from "./filterSlice";
import "./TopControls.css";

const priceRanges = [
  { label: "₹0–150", min: 0, max: 150 },
  { label: "₹151–250", min: 151, max: 250 },
  { label: "₹251–400", min: 251, max: 400 },
  { label: "₹401+", min: 401, max: Infinity },
];

const TopControls = () => {
  const dispatch = useDispatch();

  const search = useSelector((state) => state.filter.search);
  const { minPrice, maxPrice } = useSelector((state) => state.filter);

  const isAllSelected = minPrice === 0 && maxPrice === Infinity;

  return (
    <div className="top-controls">

      {/* ================= SEARCH BAR ================= */}
      <div className="filter-bar-container">
        <input
          type="text"
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          placeholder="Search Items..."
          className="filter-bar-input"
        />
      </div>

      {/* ================= PRICE FILTER ================= */}
      <div className="price-filter-container">
        <select
          className="price-dropdown"
          value={isAllSelected ? "all" : `${minPrice}-${maxPrice}`}
          onChange={(e) => {
            const value = e.target.value;

            if (value === "all") {
              dispatch(setPriceRange({ min: 0, max: Infinity }));
            } else {
              const [min, max] = value.split("-");

              dispatch(
                setPriceRange({
                  min: Number(min),
                  max: max === "Infinity" ? Infinity : Number(max),
                })
              );
            }
          }}
        >
          <option value="all">Filter by Price</option>

          {priceRanges.map((range) => (
            <option
              key={range.label}
              value={`${range.min}-${range.max}`}
            >
              {range.label}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
};

export default TopControls;