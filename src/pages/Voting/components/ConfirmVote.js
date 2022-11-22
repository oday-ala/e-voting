import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ButtonGroup,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts";
import { useVote } from "../../../hooks/useVote";

export function ConfirmVote({ modalVisible, setModalVisible, candidate, finalFocusRef }) {
  const {
    state: { aadhaarId },
  } = useAuthContext();
  const { castVote } = useVote();
  let navigate = useNavigate();

  const handleOnClick = async () => {
    try {
      setModalVisible(false);
      await castVote(aadhaarId, candidate);
      return navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={modalVisible} onClose={setModalVisible} size="md" finalFocusRef={finalFocusRef}>
      <ModalContent maxH="212">
        <ModalCloseButton />
        <ModalHeader>Voting Policy</ModalHeader>
        <ModalBody>
          <Text>This action can not be undone!</Text>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup space={2}>
            <Button
              varian="ghost"
              // colorScheme="blackAlpha"
              onClick={() => {
                setModalVisible(false);
              }}
            >
              Cancel
            </Button>
            <Button bg="red.600" onClick={handleOnClick}>
              Ok
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
