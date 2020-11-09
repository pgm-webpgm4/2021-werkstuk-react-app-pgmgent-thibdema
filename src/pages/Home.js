import React, {useState} from 'react';
import { gql, useQuery } from '@apollo/client';

import { ContentLoader, Pagination, ProductCard } from '../components';

const GET_ALL_FILTERED_PRODUCTS = gql`
  query getAllProducts($filters: FilterInput) {
    getAllProducts(filters: $filters) {
      id,title,description, images{url,alt}, price
    }
  }
`;

const Home = () => {
  const [category, setCategory] = useState('All');
  const [audience, setAudience] = useState('All');
  const [page, setPage] = useState(1);
  const itemsperpage = 9;
  const {loading, errors, data} = useQuery(GET_ALL_FILTERED_PRODUCTS, {
    variables: {
      filters: {
        audience: audience,
        category: category,
    }}
  });

  if(!!errors) console.log(errors);

  return(
    <div className="home">
      <div className="container">
        <form onSubmit={(e) => e.preventDefault()} className="row">
          <div className="form-group col-md-4 col-12">
            <label htmlFor="audience">Audience</label>
            <select onChange={(e) => setAudience(e.target.value)} className="custom-select" id="audience">
              <option value="All">Show All</option>
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>
          </div>
          <div className="form-group col-md-4 col-12">
            <label htmlFor="category">Category</label>
            <select onChange={(e) => setCategory(e.target.value)} className="custom-select" id="category">
              <option value="All">Show All</option>
              <option>Tshirts</option>
              <option>Shirts</option>
              <option>Sweaters</option>
              <option>Pants</option>
              <option>Underpants</option>
              <option>Socks</option>
              <option>Hats</option>
              <option>Bags</option>
              <option>Shoes</option>
            </select>
          </div>
        </form>
        {(loading) ? 
          <ContentLoader />
        :
          <div className="row">
            {(data && data.getAllProducts.length > 0) ? 
              data.getAllProducts.slice(((page-1)*itemsperpage), (page*itemsperpage)).map((e, key) => <div key={key} className="col-md-4 col-12"><ProductCard {...e} /></div> )
              :
              <p className="col-12">No products yet.</p>
            }
          </div> 
        }
      </div>
      {(data && data.getAllProducts.length > 0) && <Pagination page={page} setPage={setPage} itemsperpage={itemsperpage} totalitems={data.getAllProducts.length} />}
    </div>
  );
};

export default Home;