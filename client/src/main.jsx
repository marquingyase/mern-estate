import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);
