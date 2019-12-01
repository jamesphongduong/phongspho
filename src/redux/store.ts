import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);
