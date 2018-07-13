import { createStore, combineReducers , applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

 function configureStore() {
  if (module.hot) {
    module.hot.accept('./index', () => {
      const nextRootReducer = combineReducers(require('./index'));
      store.replaceReducer(nextRootReducer);
    });
  }
  const reducer = combineReducers(require('./index'));
  const store = createStore(reducer,{},applyMiddleware(ReduxThunk));
  return store;
}

const store = configureStore();

export default store;