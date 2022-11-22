import {
  Box,
  Container,
  Link,
  Stack,
  Text,
  VisuallyHidden,
  Button,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const SocialButton = ({children, label, href}) => {
  return (
    <Button
      rounded="full"
      cursor="pointer"
      as="a"
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

const Footer = () => {
  return (
    <Box bg="gray.100" color="black" py={3} position="relative" bottom={0} width="100%">
      <Container
        as={Stack}
        maxW="6xl"
        py={4}
        spacing={4}
        justify="center"
        align="center"
      >
        <Stack direction="row" spacing={6}>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Content Copyright</Link>
          <Link href="#">Terms & Conditions</Link>
          <Link href="#">Site Map</Link>
        </Stack>
      </Container>

      <Box borderTopWidth={1} borderStyle="solid">
        <Container
          as={Stack}
          maxW="6xl"
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>© 2022 Election Commission of India. All rights reserved</Text>
          <Stack direction="row" spacing={6}>
            <SocialButton label="Facebook" href="https://www.facebook.com/eci/">
              <FaFacebook />
            </SocialButton>
            <SocialButton label="YouTube" href="https://www.youtube.com/eci/">
              <FaYoutube />
            </SocialButton>
            <SocialButton label="Twitter" href="https://twitter.com/ECISVEEP">
              <FaTwitter />
            </SocialButton>
            <SocialButton
              label="Instagram"
              href="https://www.instagram.com/ecisveep/"
            >
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
