import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Timer } from "./components/Timer";
import { Loader } from "../../components/Loader";
import { useAuthContext, useVoteContext } from "../../contexts";
import { useVote } from "../../hooks/useVote";
import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import moment from "moment";
import "./style.css";

const Home = () => {
  const {
    state: { isUserLoggedIn, aadhaarId },
  } = useAuthContext();

  const {
    state: { checkVoteResult, voteTiming, loading },
  } = useVoteContext();
  const { checkUserVotingStatus, getVoteTiming } = useVote();
  const [expire, setExpire] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn) {
      checkUserVotingStatus(aadhaarId);
      getVoteTiming();
    }
  }, [isUserLoggedIn]);

  return (
    <Layout>
      <VStack justify="center" align="center" py={{ base: 20, md: 36 }} spacing={3}>
        {loading ? (
          <Loader light={true} />
        ) : (
          voteTiming && (
            <>
              <Heading
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                lineHeight="110%"
              >
                {expire ? "Results are out now!" : "Cast Your Vote"}
              </Heading>
              <VStack justify="center" align="center">
                {expire ? (
                  <Button
                    bg="red.600"
                    alignSelf="center"
                    onClick={() => navigate("/results")}
                  >
                    Check now
                  </Button>
                ) : (
                  <>
                    <Text mb={2} fontSize={{ base: "md", md: "3xl" }}>
                      before
                    </Text>
                    <Timer
                      expiryTimestamp={
                        new Date(
                          moment
                            .unix(parseInt(voteTiming?.toString()))
                            .format("MM-DD-YYYY")
                        )
                      }
                      onExpire={() => setExpire(true)}
                    />
                    <Button
                      bg="red.600"
                      onClick={() =>
                        checkVoteResult &&
                        navigate(checkVoteResult.canVote ? "/vote" : "/home")
                      }
                      alignSelf="center"
                      size="sm"
                    >
                      Vote Now
                    </Button>
                  </>
                )}
              </VStack>
            </>
          )
        )}
      </VStack>
    </Layout>
  );
};
export default Home;
