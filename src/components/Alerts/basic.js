import React, { useEffect, useState } from 'react';

const BasicAlert = ({type, message}) => {
  const [animation, setAnimation] = useState('animate__fadeInDown');

  useEffect(() => {
    setTimeout(() => {
      setAnimation('animate__fadeOutUp');
    }, 5000);
  }, []);

  return(
    <div className="alertPersonalized">
      <div className={`alert container alert-${type} animate__animated ${animation}`} role="alert">
        {message}
      </div>
    </div>
  );
};

export default BasicAlert;