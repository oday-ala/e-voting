import { createStandaloneToast } from "@chakra-ui/toast";

const { toast } = createStandaloneToast();

export const toastSuccess = (message) => {
  return toast({
    title: message,
    status: "success",
    duration: 2000,
    position: "bottom",
    isClosable: true,
  });
};

export const toastError = (message) => {
  return toast({
    title: message,
    status: "error",
    duration: 2000,
    position: "bottom",
    isClosable: true,
  });
};
