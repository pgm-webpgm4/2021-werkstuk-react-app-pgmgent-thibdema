import React, { Fragment, useState } from 'react';

import {BGImage, Payment} from '../components';
import {Basket as BasketFunctions} from '../hooks';

const Basket = () => {
  const seconds = 10;
  const [payment, setPayment] = useState();
  const basket = new BasketFunctions();
  const [data, setData] = useState(JSON.parse(window.localStorage.getItem('basket')));


  const editQuantity = (key) => {
    const quantity = document.querySelector(`#quantity${key}`);
    basket.EditQuantity(key, quantity.value);
  };

  const getIMGHeight = () => {
    const screenWidth = window.innerWidth;
    
    if(screenWidth < 500) {
      return '18'
    } else if(screenWidth < 767) {
      return '20';
    } else if (screenWidth < 992) {
      return '24';
    } else {
      return '13';
    }
  };

  const calculateCheckoutPrice = () => {
    if(data.length > 1) {
      return data.reduce((a, b) => (a.price*a.quantity) + (b.price*b.quantity));
    } else {
      return data[0].price * data[0].quantity;
    }
  };

  return(
    <Fragment>
      {(!!payment) && <Payment seconds={seconds} />}
      <div className="basket container">
        <div className="col-12">
          <div className="col-xl-8 col-12">
            {
              (!!data && data.length > 0) && data.map((e, key) => 
              <div key={key} className="basket__item row">
                <div className="col-md-5 col-12"><BGImage url={e.images.length > 0 && e.images[0].url} height={`${getIMGHeight()}rem`} price={e.price} /></div>
                <div className="col-md-7 col-12 d-flex flex-column">
                  <span className="basket__item__title">{e.title}</span>
                  <div className="basket__item__colors">
                    {(e.color.length > 0) ? 
                      e.color.map((e, i) => <div key={i} className="color" style={{backgroundColor: e}}></div>)
                      : <p style={{margin: 0}}>No colors found.</p>}
                  </div>
                  <form className="align-items-end row">
                    <div className="form-group col-lg-4 col-12">
                      <label htmlFor={`quantity${key}`}>Amount</label>
                    <input id={`quantity${key}`} placeholder={e.quantity} min="1" className="form-control" type="number" /> 
                      <input className="form-control basket__item__size" type="text" value={e.size} disabled />
                    </div>
                    <div className="col-lg-4 col-12">
                      <button onClick={() => editQuantity(key)} type="submit" className="btn btn-primary">Edit quantity</button>
                      <button onClick={() => basket.RemoveProduct(key)} type="submit" className="btn btn-danger">Delete item</button>
                    </div>
                    <div className="col-lg-4 col-12 form-group">
                      <label htmlFor={`price${key}`}>Total Price</label>
                      <input className="form-control basket__item__totalprice" type="text" value={`€ ${(e.price * e.quantity).toFixed(2)}`} disabled />
                    </div>
                  </form>
                </div>
              </div>)
            }
            { (!data || data.length < 1) && <p className="row">No products found.</p> }
          </div>
          { (data && data.length > 0) && 
            <div className="basket__checkout d-flex align-items-end">
              <label htmlFor="checkoutPrice">Total price:</label>
              <input className="form-control basket__checkout__price" id="checkoutPrice" type="text" value={`€ ${calculateCheckoutPrice().toFixed(2)}`} disabled />
              <button onClick={() => {
                setPayment(true);
                setTimeout(() => {setData([])}, seconds * 1000)}} className="btn btn-primary">Check out</button>
            </div>
          }
        </div>
      </div>
    </Fragment>
  )
};

export default Basket;