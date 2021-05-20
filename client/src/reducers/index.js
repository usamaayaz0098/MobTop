import { combineReducers } from "redux";
import postReducer from "./postReducer";
import findReducer from "./findReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["posts"],
  blacklist : ['find']
};

const rootReducer = combineReducers({
  posts: postReducer,
  find : findReducer,
});

export default persistReducer(persistConfig, rootReducer);
