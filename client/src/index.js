import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleWare from "redux-saga";
import mySaga from "./redux/sagas";
import reducer from "./redux/reducers/index";
import { UserContextProvider } from "./context/userContext";

// const sagaMiddleware = createSagaMiddleWare();

const store = createStore(reducer);

// sagaMiddleware.run(mySaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </Provider>
  </React.StrictMode>
);
