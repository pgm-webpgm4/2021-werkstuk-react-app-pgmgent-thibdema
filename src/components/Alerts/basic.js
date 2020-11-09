import React, { useEffect, useState } from 'react';

const BasicAlert = ({type, message}) => {
  const [animation, setAnimation] = useState('animate__fadeInDown');

  useEffect(() => {
    setTimeout(() => {
      setAnimation('animate__fadeOutUp');
    }, 5000);
  }, []);

  return(
    <div className={`alertPersonalized animate__animated ${animation}`}>
      <div className={`alert container alert-${type} alert-dismissable`} role="alert">
        {message}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default BasicAlert;