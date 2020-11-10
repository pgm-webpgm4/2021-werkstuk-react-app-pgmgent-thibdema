import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';

import {BGImage} from '..';

const MenuCard = ({url, title, image}) => {
  const [redirecter, setRedirecter] = useState();
  return(
    <div onClick={() => setRedirecter(url)} className="menucard card w-100">
      {(!!redirecter) && <Redirect to={redirecter} />}
      <BGImage url={image} height="20rem" />
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
      </div>
    </div>
  );
};

export default MenuCard;