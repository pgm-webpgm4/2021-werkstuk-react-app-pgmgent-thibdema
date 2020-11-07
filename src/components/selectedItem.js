import React from 'react';

const SelectedItem = ({text, deleteIMG}) => {
  return(
    <div className="selecteditem">
      {text}
      <span onClick={() => deleteIMG()} className="selecteditem__delete">
        &#9587;
      </span>
    </div>
  );
};

export default SelectedItem;