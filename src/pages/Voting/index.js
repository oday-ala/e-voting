import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext, useVoteContext } from "../../contexts";
import { useVote } from "../../hooks/useVote";
import {
  HStack,
  VStack,
  Heading,
  Box,
  Button,
  Text,
  IconButton,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { MdOutlineArrowBack } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { Loader } from "../../components/Loader";
import { ConfirmVote } from "./components/ConfirmVote";

const VotingPage = () => {
  const {
    state: { aadhaarId },
  } = useAuthContext();
  const {
    state: { allCandidates, votedCandidate, loading },
  } = useVoteContext();
  const { getAllCandidates } = useVote();

  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState();
  let navigate = useNavigate();
  const finalRef = useRef(null);

  useEffect(() => {
    if (votedCandidate && votedCandidate.name !== "") {
      navigate("/");
    }
    getAllCandidates(aadhaarId);
  }, []);

  return (
    <Layout>
      <VStack w="100vw">
        <HStack
          top={["80px", "100"]}
          align="center"
          w="100vw"
          bg="gray.700"
          py={5}
          mb={{ base: 10, md: 26 }}
        >
          <IconButton
            fontSize="30px"
            icon={
              <MdOutlineArrowBack
                cursor="pointer"
                onClick={() => navigate("/")}
              />
            }
          />
          <HStack justify="center" w="90vw">
            <Heading color="white" fontSize="2xl">
              Vote
            </Heading>
          </HStack>
        </HStack>
        <VStack
          position="relative"
          justify="center"
          align="center"
          minH="60vh"
          mt={100}
        >
          <>
            {loading ? (
              <Loader light={true} />
            ) : allCandidates && allCandidates.length !== 0 ? (
              <>
                <VStack align="center" spacing={4}>
                  {allCandidates.map(
                    ({
                      partyFlag,
                      name,
                      partyShortcut,
                      nominationNumber,
                      stateCode,
                      constituencyCode,
                    }) => (
                      <Box
                        ref={finalRef}
                        display="flex"
                        alignItems="center"
                        flexDir="row"
                        bg={
                          value || name === value?.name ? "gray.700" : "white"
                        }
                        _hover={{
                          bg: "gray.900",
                        }}
                        _focus={{
                          bg: "gray.900",
                        }}
                        fontSize="lg"
                        py={4}
                        px={5}
                        w={["90vw", "30vw"]}
                        justifyContent="space-between"
                        as="button"
                        onClick={() =>
                          setValue({
                            partyFlag,
                            name,
                            partyShortcut,
                            nominationNumber,
                            stateCode,
                            constituencyCode,
                          })
                        }
                      >
                        <HStack alignItems="center">
                          <img
                            src={partyFlag}
                            key={partyFlag}
                            alt="party flag"
                            width="60px"
                            height="60px"
                          />
                          <Text
                            color={
                              value || name === value?.name ? "white" : "black"
                            }
                            _hover={{
                              color: "white",
                            }}
                            fontSize={["sm", "xl"]}
                            bold
                          >
                            &#160;&#160; {name} - {partyShortcut}
                          </Text>
                        </HStack>
                        {value && name === value.name && (
                          <BsCheckCircleFill size="30" color="white" />
                        )}
                      </Box>
                    )
                  )}
                  <Button
                    alignSelf="center"
                    onClick={() => setModalVisible(true)}
                    isDisabled={!value ? true : false}
                    bg="red.600"
                    w="100"
                  >
                    Vote
                  </Button>
                </VStack>
              </>
            ) : (
              <>
                <Heading
                  color="white"
                  size={["sm", "lg"]}
                  textAlign="center"
                  mb="4"
                  fontWeight="semibold"
                >
                  {allCandidates === undefined || !allCandidates.length ? (
                    <Box>
                      No candidate found at your Constituency Area
                      <br /> Please Try Again Later
                    </Box>
                  ) : (
                    <Box></Box>
                  )}
                </Heading>
                <Button
                  bg="red.600"
                  color="white"
                  onClick={() => navigate("/home")}
                  ml={["0", "5"]}
                >
                  <Text fontSize={["10", "20"]} color="white">
                    Go back to Home
                  </Text>
                </Button>
              </>
            )}
          </>
        </VStack>
      </VStack>
      {value && (
        <ConfirmVote
          candidate={value}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          finalFocusRef={finalRef}
        />
      )}
    </Layout>
  );
};

export default VotingPage;
