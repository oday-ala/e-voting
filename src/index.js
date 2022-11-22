import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./contexts/auth-context/auth-context-provider";
import VoteContextProvider from "./contexts/vote-context/vote-context-provider";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthContextProvider>
        <VoteContextProvider>
          <Router>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
          </Router>
        </VoteContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
