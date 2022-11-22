import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useVoteContext } from "../../contexts";
import Layout from "../../components/Layout";

const AlreadyCasted = () => {
  const {
    state: { votedCandidate },
  } = useVoteContext();

  return (
    <Layout>
      <HStack py={{ base: 20, md: 36 }}>
        <Box textAlign="center">
          <Text
            color="white"
            letterSpacing={2}
            fontSize={{ base: "3xl", md: "7xl" }}
          >
            Vote casted
          </Text>
          <VStack justifyContent="center" alignItems="center"></VStack>
          <Text fontSize={{ base: "md", md: "3xl" }} color="white">
            to
          </Text>
          <Text
            mt={4}
            fontSize={{ base: "3xl", md: "6xl" }}
            color="white"
            px={4}
            borderRadius="xl"
            bg="red.600"
          >
            {votedCandidate && votedCandidate.name}
          </Text>
        </Box>
      </HStack>
    </Layout>
  );
};

export default AlreadyCasted;
