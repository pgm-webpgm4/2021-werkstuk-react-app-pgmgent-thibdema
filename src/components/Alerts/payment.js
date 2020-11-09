import React, { useEffect, useState } from 'react';

import {ContentLoader} from '../';
import {Basket} from '../../hooks';

const Payment = ({seconds}) => {
  const [visible, setVisible] = useState('animate__fadeInDown');
  const [zIndex, setZIndex] = useState('2000');
  const [opacity, setOpacity] = useState('1');
  const [paymentStatus, setPaymentStatus] = useState();

  useEffect(() => {
    setTimeout(() => {
      const basket = new Basket();
      basket.ClearBasket();
      setPaymentStatus(true);
    }, seconds*1000);
  }, [seconds]);

  return(
    <div style={{position: 'fixed', width: '90vw', height: '90vh', bottom: '5vh', right: '5vw', zIndex: zIndex, opacity: opacity}}>
      <div style={{maxWidth: '100vw', maxHeight: '100vh', width: '100%', height: '100%', zIndex: zIndex, opacity: '1', backgroundColor: 'white'}} className={`toast show animate__animated ${visible}`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <svg className="bd-placeholder-img rounded mr-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
            <rect width="100%" height="100%" fill="#007aff" />
          </svg>
          <strong className="mr-auto">Payment</strong>
          <small className="text-muted" style={{marginLeft: '1rem'}}>just now</small>
          <button type="button" onClick={() => {
            setVisible('animate__fadeOutDown');
            setZIndex('-5');
            setOpacity('0');
          }} className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">
          { (!paymentStatus) ? 
              <ContentLoader />
            :
              <div style={{margin: '5rem 0rem'}} className="d-flex flex-column align-items-center justify-content-center">
                <h1 className="text-center">Payment was succesfull.</h1>
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Payment;