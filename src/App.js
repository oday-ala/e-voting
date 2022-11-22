import { useEffect } from "react";
import { createStandaloneToast } from "@chakra-ui/toast";
import Routes from "./routes/Routes";

const { ToastContainer } = createStandaloneToast();

function App() {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
  }, []);

  return (
    <div>
      <Routes />
      <ToastContainer />
    </div>
  );
}

export default App;
