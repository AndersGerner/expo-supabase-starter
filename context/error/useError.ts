import React from 'react';
import { ErrorContext } from './ErrorContext';

export const useError = () => React.useContext(ErrorContext);
