import React from 'react';

import {BasicAlert} from './';

const ErrorAlert = ({message}) => (<BasicAlert type="danger" message={message} />);

export default ErrorAlert;