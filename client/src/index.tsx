import "./styles/globals.scss";
import Home from "./App";
import { CartContextProvider } from "./store/cart-context";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <CartContextProvider>
    <Home />
  </CartContextProvider>
);
