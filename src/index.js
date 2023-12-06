import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./component/store/auth-context";
import { Provider } from "react-redux";
import store from './component/store/index';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);

