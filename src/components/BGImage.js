import React from 'react';

const BGImage = ({url, height='20rem', classnames='', price=false}) => {
  return(
    <div className={`parent ${classnames}`} style={{height: `${height}`}}>
      {!!price && <span className="parent__price">&euro; {price.toFixed(2)}</span>}
      <div className="child" style={{backgroundImage: `url(${url})`}}></div>
    </div>
  );
};

export default BGImage;