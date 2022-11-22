import { useTimer } from "react-timer-hook";
import { HStack, Text } from "@chakra-ui/react";

export const Timer = ({ expiryTimestamp, onExpire }) => {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => onExpire(),
  });

  const formatNumbers = (num) => {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  };

  return (
    <HStack bg="gray.700" spacing={1} align="baseline" px={3} borderRadius={8}>
      <Text color="white" fontSize={{ base: "xl", md: "5xl" }}>
        {formatNumbers(days)}:{formatNumbers(hours)}:{formatNumbers(minutes)}:
        {formatNumbers(seconds)}
      </Text>
    </HStack>
  );
};
