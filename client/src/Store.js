import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

const initialState = {};
const middleware = [thunk];
export const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
