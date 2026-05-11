import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./assets/components/Theme";
import { SearchProvider } from "./assets/components/Search";
import { AuthProvider } from "./assets/components/Auth";
import { FavouritesProvider } from "./assets/components/FavouritesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider>
        <SearchProvider>
          <FavouritesProvider>
            <App />
          </FavouritesProvider>
        </SearchProvider>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>,
);
