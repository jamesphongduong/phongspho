import React from 'react';
import { AppContextInterface } from '../types';

const ctxt = React.createContext<AppContextInterface | null>(null);
export const AppContextProvider = ctxt.Provider;
export const AppContextConsumer = ctxt.Consumer;
