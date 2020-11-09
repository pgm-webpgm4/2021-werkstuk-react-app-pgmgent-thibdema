import React from 'react';

const BGImage = ({url, height='20rem', classnames = ''}) => {
  return(
    <div className={`parent ${classnames}`} style={{height: `${height}`}}>
      <div className="child" style={{backgroundImage: `url(${url})`}}></div>
    </div>
  );
};

export default BGImage;