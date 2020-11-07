import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {httperrorcodes} from '../utilities';

const Errorpage = () => {
  let {id} = useParams();
  const [errordata, setErrorData] = useState();

  useEffect(() => {
    const error = httperrorcodes.find((e) => e.code === Number(id));
    setErrorData(error);
  }, [id]);

  return(
    <div className="error container">
      <div className="text-center">
        <h1>Error {id}</h1>
        <h2>{(!!errordata) ? errordata.phrase : '' }</h2>
      </div>
    </div>
  );
};

export default Errorpage;