import { useNavigate } from "react-router-dom";
import { HStack, Avatar, Image, Button, Text } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import {
  resetState,
  useAuthContext,
  useVoteContext,
  resetVoteContextState,
} from "../../contexts";

const Header = () => {
  let navigate = useNavigate();
  const {
    state: { isUserLoggedIn, aadhaarId },
    dispatch: authDispatch,
  } = useAuthContext();
  const { dispatch: voteDispatch } = useVoteContext();
  return (
    <>
      <div className="header">
        <HStack justifyContent="space-between" py={5} px={10} bg="gray.100">
          <HStack alignItems="center">
            <Image
              onClick={() => navigate("/")}
              src={require("../../assets/header-logo.png")}
              alt=""
              w="50px"
              cursor="pointer"
            />
            <Text color="black" fontSize="lg" display={["none", "inherit"]}>Election Commission of India</Text>
          </HStack>
          <Popover placement="bottom-start" width="fit-content">
            <PopoverTrigger>
              <Avatar size="sm" cursor="pointer" />
            </PopoverTrigger>
            <PopoverContent width="fit-content">
              <PopoverArrow />
              <PopoverBody>
                {isUserLoggedIn && (
                  <>
                    <strong>Aadhaar No: {aadhaarId}</strong>
                    <br />
                    <br />
                  </>
                )}

                {!isUserLoggedIn ? (
                  <Button onClick={() => navigate("/login")} size="sm">
                    Login
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      navigate("/");
                      authDispatch(resetState());
                      voteDispatch(resetVoteContextState());
                    }}
                    size="sm"
                    colorScheme="red"
                  >
                    Logout
                  </Button>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </div>
    </>
  );
};

export default Header;
