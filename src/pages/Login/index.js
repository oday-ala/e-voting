import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findAadhaarID } from "../../contexts/auth-context/data";
import {
  useAuthContext,
  setAadhaarId,
  setLoginStatus,
  useVoteContext,
} from "../../contexts";
import { BallotService } from "../../repository/Ballot";
import { toastError, toastSuccess } from "../../utils/toastMessage";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  HStack,
  InputLeftAddon,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { useFormik } from "formik";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";

const LoginBox = () => {
  const formik = useFormik({
    initialValues: {
      aadhaar: "482253918244",
      otp: "123456",
      mobile: "6261313198",
    },
    onSubmit: (values, actions) => {
      userLogin(values);
      // actions.resetForm();
    },
  });

  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    aadhaar: false,
    otp: false,
    mobile: false,
  });
  const [token, setToken] = useState();
  const { dispatch } = useAuthContext();
  const {
    state: { isUserLoggedIn },
  } = useVoteContext();
  let navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/");
    }
  }, []);

  const configureRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log(response);
        },
      },
      auth
    );
  };

  const sendOTP = () => {
    const number = formik.values.mobile;
    if (number.length < 10 || number === undefined)
      return setError((curr) => ({ ...curr, mobile: true }));

    configureRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${number}`, appVerifier)
      .then((res) => {
        setToken(res);
        toastSuccess("OTP has been sent!");
        setShowLogin(true);
      })
      .catch((error) => {
        console.log(error);
        toastError("Error occurred while sending OTP!");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  const verifyOTP = async () => {
    try {
      await token.confirm(formik.values.otp);
      return true;
    } catch (error) {
      console.log(error);
      toastError("OTP verification failed!");
    }
  };

  const validate = async (aadhaar, otp) => {
    if (aadhaar.length < 12 || !findAadhaarID(+aadhaar)) {
      setError((curr) => ({ ...curr, aadhaar: true }));
      return false;
    } else if (verifyOTP === false) {
      setError((curr) => ({ ...curr, otp: true }));
      return false;
    } else {
      const isVoterEligible = await BallotService.getInstance().isVoterEligible(
        aadhaar
      );
      if (!isVoterEligible) {
        toastError(
          "User age is less than 18 years or User is dead, therefore he cannot vote!"
        );
      }
      return isVoterEligible;
    }
  };

  const userLogin = async ({ aadhaar, otp }) => {
    try {
      setLoading(true);
      if (await validate(aadhaar, otp)) {
        dispatch(setLoginStatus(true));
        dispatch(setAadhaarId(aadhaar));
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" mb="4rem">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Login to your account</Heading>
          <Text fontSize="lg" color="gray.600">
            to enjoy all of the cool <Link color="teal.400">features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded="lg" boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl isRequired isInvalid={error.aadhaar}>
                <FormLabel>Aadhaar Card No</FormLabel>
                <Input
                  name="aadhaar"
                  placeholder="482253918244"
                  value={formik.values.aadhaar}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>Invalid Aadhaar Id</FormErrorMessage>
              </FormControl>
              <br />
              <FormControl isRequired isInvalid={error.mobile}>
                <FormLabel>Mobile No</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+91" />
                  <Input
                    name="mobile"
                    type="tel"
                    placeholder="6261313177"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                  />
                </InputGroup>
                <FormErrorMessage>Invalid Mobile No</FormErrorMessage>
              </FormControl>
              <br />
              {showLogin ? (
                <>
                  <FormControl isRequired isInvalid={error.otp}>
                    <FormLabel>OTP</FormLabel>
                    <InputGroup size="md">
                      <Input
                        name="otp"
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                        type={show ? "text" : "password"}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={() => setShow(!show)}
                        >
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>Invalid OTP</FormErrorMessage>
                  </FormControl>
                  <Stack spacing={10} pt={3}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align="start"
                      justify="space-between"
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Link color="teal.400">Forgot password?</Link>
                    </Stack>
                    {loading ? (
                      <Button
                        bg="teal.400"
                        color="white"
                        _hover={{
                          bg: "teal.500",
                        }}
                      >
                        Logging In...
                      </Button>
                    ) : (
                      <Button
                        bg="teal.400"
                        color="white"
                        _hover={{
                          bg: "teal.500",
                        }}
                        type="submit"
                      >
                        Login
                      </Button>
                    )}
                  </Stack>
                </>
              ) : (
                <HStack>
                  <Button
                    bg="teal.400"
                    color="white"
                    _hover={{
                      bg: "teal.500",
                    }}
                    w="full"
                    onClick={sendOTP}
                  >
                    Get OTP
                  </Button>
                  <div id="recaptcha-container"></div>
                </HStack>
              )}
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

const LoginPage = () => {
  return (
    <Layout>
      <LoginBox />
    </Layout>
  );
};

export default LoginPage;
