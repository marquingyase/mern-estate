import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
