import React from 'react';

const Pagination = ({itemsperpage, totalitems, page, setPage}) => {
  const maxPage = Math.ceil(totalitems/itemsperpage);

  return(
    <nav className="d-flex justify-content-center" aria-label="...">
      <ul className="pagination">
        {/* First page */}
        <li onClick={() => page > 1 && setPage(1)} className={(`page-item ${(page === 1) && 'disabled'}`)}>
          <button className="page-link" >First</button>
        </li>

        {(page > 1) &&   
          <li onClick={() => setPage(page-1)} className="page-item">
            <button className="page-link">{page-1}</button>
          </li>
        }

        <li className="page-item active" aria-current="page">
          <button className="page-link">{page}</button>
        </li>
        {(page < maxPage) &&
          <li onClick={() => setPage(page+1)} className="page-item">
            <button className="page-link">{page+1}</button>
          </li>
        }

        {/* Last page */}
        <li onClick={() => page < maxPage && setPage(maxPage)} className={(`page-item ${(page === maxPage) && 'disabled'}`)}>
          <button className="page-link" >Last</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;