import React, {useState} from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, Redirect } from 'react-router-dom';

import {IoMdAddCircle} from 'react-icons/io';
import {FaRegEdit} from 'react-icons/fa';
import {RiDeleteBack2Fill} from 'react-icons/ri';

import { Pagination } from '../components';

const GET_ALL_PRODUCTS = gql`
  query getAllProducts($filters: FilterInput) {
    getAllProducts(filters: $filters) {
      id,title, price
    }
  }
`;

const AdminPanel = () => {
  const [redirecter, setRedirecter] = useState();
  const [page, setPage] = useState(1);
  const itemsperpage = 10;
  const {errors, data} = useQuery(GET_ALL_PRODUCTS, {
    variables: {
      filters: {
        audience: "All",
        category: "All",
    }}
  });

  if(!!errors) console.log(errors);

  return(
    <div className="adminpanel container">
      {!!redirecter && <Redirect to={redirecter} />}
      <Link to={`/admin/product/add`}>
        <button style={{marginBottom: '2rem', padding: '0.5rem 1rem'}} className="btn btn-primary d-flex align-items-center">
          <IoMdAddCircle style={{fontSize: '1.5rem', marginRight: '0.5rem'}} />
          Add product
        </button>
      </Link>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
        {
          (!!data && data.getAllProducts.length > 0) ?
            data.getAllProducts.slice(((page-1)*itemsperpage), (page*itemsperpage)).map((e, key) => 
              <tr onClick={() => setRedirecter(`/product/${e.id}`)} key={key}>
                <th scope="row">{(page-1)*10 + key + 1}</th>
                <td>{e.title}</td>
                <td>&euro; {e.price.toFixed(2)}</td>
                <td>
                  <Link to={`/admin/product/edit/${e.id}`}>
                    <button style={{padding: '0.5rem 1rem'}} className="btn btn-primary d-flex align-items-center">
                      <FaRegEdit style={{fontSize: '1.1rem', marginRight: '0.5rem'}} />
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <Link to={`/admin/product/delete/${e.id}`}>
                    <button style={{padding: '0.5rem 1rem'}} className="btn btn-danger d-flex align-items-center">
                      <RiDeleteBack2Fill style={{fontSize: '1.1rem', marginRight: '0.5rem'}} />
                      Delete
                    </button>
                  </Link>
                </td>
              </tr>
            )
            : <tr><td colSpan="5">No products found</td></tr>
        }
        </tbody>
      </table>
      {(data && data.getAllProducts.length > 0) && <Pagination page={page} setPage={setPage} itemsperpage={itemsperpage} totalitems={data.getAllProducts.length} />}
    </div>
  );
};

export default AdminPanel;