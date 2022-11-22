import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVoteContext } from "../../contexts";
import Layout from "../../components/Layout";
import { constituency, states } from "./data";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useVote } from "../../hooks/useVote";
import { Loader } from "../../components/Loader";

const ResultsPage = () => {
  const [selectedState, setSelectedState] = useState(10);
  const [renderConstituency, setRenderConstituency] = useState([""]);
  const [selectedConstituency, setSelectedConstituency] = useState([""]);
  const [selectedCandidates, setSelectedCandidates] = useState();
  const [totalVoteCount, setTotalVoteCount] = useState(0);
  const {
    state: { winningCandidate, loading },
  } = useVoteContext();
  const { getResult } = useVote();

  let navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflowY = "scroll";
    getResult();
  }, []);

  useEffect(() => {
    if (selectedState !== undefined) {
      setRenderConstituency(Object.keys(constituency[selectedState] ?? []));
    }
  }, [selectedState]);

  useEffect(() => {
    setSelectedConstituency(parseInt(renderConstituency[0]));
  }, [renderConstituency]);

  useEffect(() => {
    let data =
      winningCandidate &&
      winningCandidate.filter((i) => {
        return (
          i.stateCode === selectedState &&
          i.constituencyCode === selectedConstituency
        );
      });

    if (data) {
      var candidateModel = [];
      for (let i = 0; i < data.length; i++) {
        let d = { ...data[i] };
        d.nominationNumber = data[i].nominationNumber.toString();
        d.voteCount = data[i].voteCount.toString();
        console.log(d);
        candidateModel?.push(d);
      }
      console.log(candidateModel);

      setSelectedCandidates(candidateModel);

      setTotalVoteCount(
        candidateModel.reduce((acc, { voteCount }) => (acc += +voteCount), 0)
      );
    }
  }, [selectedState, selectedConstituency, winningCandidate]);

  return (
    <Layout>
      <VStack
        minH="70vh"
        w={["90vw", "70vw"]}
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
        borderRadius={8}
        shadow="lg"
        my={10}
        py={10}
        color="black"
      >
        <Heading size="sm" textAlign="center">
          GEN ELECTION TO VIDHAN SABHA TRENDS & RESULT DECEMBER-2022
        </Heading>
        <Box
          p="2"
          mt="4"
          borderWidth={1}
          w={["80%", "60vw", "80%"]}
          borderColor="black"
        >
          <Text textAlign="center" fontWeight="semibold" fontSize="md" mb={4}>
            Constituency-wise All Candidates
          </Text>
          <HStack justifyContent="center" flexDir={["column", "row"]}>
            <FormControl
              w="container"
              alignItems="center"
              display="flex"
              flexDir="row"
            >
              <FormLabel mt={2}>Select State </FormLabel>
              <Box>
                <Select
                  placeholder="Select State"
                  borderColor="blue.400"
                  borderWidth={3}
                  w={["40", "full"]}
                  value={selectedState}
                  onChange={(e) => setSelectedState(parseInt(e.target.value))}
                >
                  {Object.keys(states).map((state) => (
                    <option label={states[state]} value={state} />
                  ))}
                </Select>
              </Box>
            </FormControl>
            <FormControl
              ml={["0", "4"]}
              w="container"
              alignItems="center"
              display="flex"
              flexDir="row"
            >
              <FormLabel mt="2">Select Constituency </FormLabel>
              <Box>
                <Select
                  w={["20", "full"]}
                  placeholder="Select Constituency"
                  borderColor="blue.400"
                  borderWidth={3}
                  value={selectedConstituency.toString()}
                  onChange={(e) =>
                    setSelectedConstituency(parseInt(e.target.value))
                  }
                >
                  {renderConstituency.length !== 0 &&
                    renderConstituency.map((i) => (
                      <option
                        label={constituency[selectedState][i]}
                        value={i}
                      />
                    ))}
                </Select>
              </Box>
            </FormControl>
          </HStack>
        </Box>
        {/* Table */}
        <Box
          borderBottomWidth="0"
          w="80%"
          mt="6"
          style={{ border: "1px solid black" }}
        >
          <Box
            py="1"
            bg="pink.200"
            textAlign="center"
            style={{ borderBottom: "2px solid black" }}
          >
            <Text fontWeight="semibold">
              {states[selectedState]}-
              {constituency[selectedState][selectedConstituency]}
            </Text>
          </Box>
          <Box
            py="1"
            bg="pink.200"
            style={{ borderBottom: "2px solid black" }}
            textAlign="center"
          >
            <Text fontWeight="semibold">Result Status</Text>
          </Box>
          <Box overflow={["scroll", "unset"]}>
            <HStack spacing={0} style={{ borderBottom: "1px solid black" }}>
              <Box
                py="1"
                bg="pink.200"
                style={{ borderRight: "1px solid black" }}
                minW={["70", "16%"]}
                textAlign="center"
              >
                <Text fontWeight="semibold">O.S.N.</Text>
              </Box>
              <Box
                py="1"
                bg="pink.200"
                textAlign="center"
                style={{ borderRight: "1px solid black" }}
                minW={["235", "20%"]}
              >
                <Text fontWeight="semibold">Candidate </Text>
              </Box>
              <Box
                py="1"
                bg="pink.200"
                style={{ borderRight: "1px solid black" }}
                minW={["200", "16%"]}
                textAlign="center"
              >
                <Text fontWeight="semibold">Party</Text>
              </Box>
              <Box
                py="1"
                bg="pink.200"
                style={{ borderRight: "1px solid black" }}
                minW={["100", "16%"]}
                textAlign="center"
              >
                <Text fontWeight="semibold">Party Symbol</Text>
              </Box>

              <Box
                py="1"
                bg="pink.200"
                style={{ borderRight: "1px solid black" }}
                minW={["100", "16%"]}
                textAlign="center"
              >
                <Text fontWeight="semibold">Votes </Text>
              </Box>

              <Box
                py="1"
                bg="pink.200"
                minW={["100", "16%"]}
                textAlign="center"
              >
                <Text fontWeight="semibold">% of Votes</Text>
              </Box>
            </HStack>
            {loading ? (
              <Loader />
            ) : selectedCandidates && selectedCandidates.length !== 0 ? (
              selectedCandidates.map(
                (
                  {
                    nominationNumber,
                    name,
                    partyShortcut,
                    partyFlag,
                    voteCount,
                  },
                  index
                ) => (
                  <HStack
                    style={
                      index + 1 < selectedCandidates.length
                        ? { borderBottom: "1px solid black" }
                        : null
                    }
                    spacing={0}
                    h="100px"
                    textAlign="center"
                  >
                    <Box
                      py="1"
                      h="full"
                      w={["70", "16%"]}
                      style={{ borderRight: "1px solid black" }}
                    >
                      <Text fontWeight="semibold">
                        {parseInt(nominationNumber)}
                      </Text>
                    </Box>
                    <Box
                      py="1"
                      h="full"
                      w={["235", "20%"]}
                      style={{ borderRight: "1px solid black" }}
                    >
                      <Text fontWeight="semibold">{name}</Text>
                    </Box>
                    <Box
                      py="1"
                      h="full"
                      w={["200", "16%"]}
                      style={{ borderRight: "1px solid black" }}
                    >
                      <Text fontWeight="semibold">{partyShortcut}</Text>
                    </Box>
                    <Box
                      py="1"
                      h="full"
                      w={["100", "16%"]}
                      style={{ borderRight: "1px solid black" }}
                    >
                      <Image
                        src={partyFlag}
                        mx="auto"
                        boxSize="80px"
                        alt={partyShortcut}
                      />
                    </Box>
                    <Box
                      py="1"
                      h="full"
                      w={["100", "16%"]}
                      style={{ borderRight: "1px solid black" }}
                    >
                      <Text fontWeight="semibold">{voteCount}</Text>
                    </Box>
                    <Box py="1" w={["100", "16%"]} h="full">
                      <Text fontWeight="semibold">
                        {((+voteCount / +totalVoteCount) * 100).toFixed(2)}
                      </Text>
                    </Box>
                  </HStack>
                )
              )
            ) : (
              <VStack alignItems="center" mb={2}>
                <Heading textAlign="center" mt="5" fontSize="xl">
                  Result will be shown here!
                </Heading>
                <Button
                  bg="red.600"
                  color="white"
                  onClick={() => navigate("/")}
                  mt={["2", "5"]}
                  _hover={{
                    bg: "red.700",
                  }}
                >
                  <Text fontSize={["10", "20"]} color="white">
                    Go back to Home
                  </Text>
                </Button>
              </VStack>
            )}
          </Box>
        </Box>
      </VStack>
    </Layout>
  );
};

export default ResultsPage;
