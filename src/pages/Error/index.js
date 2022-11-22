import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import { Button, Center, Text } from "@chakra-ui/react";

const ErrorPage = () => {
  return (
    <Layout>
      <Center pt="10rem" pb="20rem">
        <Text fontSize="5xl" fontWeight="bold">
          404
          <br />
          Page Not Found
          <br />
          <Text fontSize="xl" fontWeight="normal">
            Please check the url in the address bar and try again :)
          </Text>
          <Link to="/">
            <Button my={2} alignSelf="center">
              Home
            </Button>
          </Link>
        </Text>
      </Center>
    </Layout>
  );
};

export default ErrorPage;
