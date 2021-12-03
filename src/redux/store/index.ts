import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { encryptTransform } from "redux-persist-transform-encrypt";
import persistReducer from "redux-persist/es/persistReducer";
import localStorage from "redux-persist/es/storage";
import { Home } from "../../interfaces/index";
import thunk from "redux-thunk";
import { WeatherRed } from "../reducers/index";
import persistStore from "redux-persist/es/persistStore";
import { UserRed } from "../reducers/user";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState: Home = {
  user: {
    name: "",
  },
  weather: {
    search: "",
    oneday: {},
    days: [],
    latest: [],
    loading: false,
    history: [],
    mycoord: {
      lon: null,
      lat: null,
    },
  },
};

const Reducer = combineReducers({ user: UserRed, weather: WeatherRed });

const persistConfigs = {
  key: "root",
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_KEYENCRIPT!,
      onError: function (error) {},
    }),
  ],
};

const persistedReducer = persistReducer(persistConfigs,Reducer);

const configureStore: any = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(configureStore);
export { configureStore, persistor };