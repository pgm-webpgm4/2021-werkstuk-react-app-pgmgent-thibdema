import React from 'react';

const BGImage = ({url, height='20rem'}) => {
  return(
    <div className="parent" style={{height: `${height}`}}>
      <div className="child" style={{backgroundImage: `url(${url})`}}></div>
    </div>
  );
};

export default BGImage;