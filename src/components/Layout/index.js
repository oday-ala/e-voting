import Header from "../Header";
import Footer from "../Footer";
import { Box, Center } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Box minW="100vw" minH="100vh">
      <Header />
      <Center>{children}</Center>
      <Footer />
    </Box>
  );
};

export default Layout;
