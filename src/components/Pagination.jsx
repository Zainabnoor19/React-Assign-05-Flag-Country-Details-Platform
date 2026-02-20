import React from "react";

const Pagination = ({ total, perPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(total / perPage);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="pagination">
      <button onClick={() => setCurrentPage(prev => Math.max(prev-1, 1))} disabled={currentPage===1}>Prev</button>
      {pages.map(page => (
        <button
          key={page}
          className={page===currentPage ? "active" : ""}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button onClick={() => setCurrentPage(prev => Math.min(prev+1, totalPages))} disabled={currentPage===totalPages}>Next</button>
    </div>
  );
};

export default Pagination;