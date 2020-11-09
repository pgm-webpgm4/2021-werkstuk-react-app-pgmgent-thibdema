import React from 'react';

const ContentLoader = () => {
  return(
    <div className="container d-flex align-items-center justify-content-center">
      <div style={{margin: '10rem 0rem'}} className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default ContentLoader;