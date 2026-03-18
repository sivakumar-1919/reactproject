import React from "react";

function Pagenation({ currentPage, setCurrentPage, totalPages }) {
  return (
    <div className="pagenation">

      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

    </div>
  );
}

export default Pagenation;