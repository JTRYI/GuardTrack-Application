import React from 'react';
import './pestControl.css';
import { Text, Button, useToast, useDisclosure } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSprayCanSparkles } from '@fortawesome/free-solid-svg-icons';
import { WarningIcon } from '@chakra-ui/icons'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'

function PestControl() {

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  async function triggerPestControl() {
    try {
      const response = await fetch(
        "https://r3zjqhwd68.execute-api.us-east-1.amazonaws.com/triggerPestControl",
        {
          method: "POST"
        }
      );

      const data = await response.json();

      if (data.message === "IoT pest control device activated successfully") {
        return Promise.resolve();
      } else {
        return Promise.reject(); // Reject the promise if the message is not as expected
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error); // Reject the promise if an error occurs
    }
  }

  return (
    <div className="pestControl">
      <Text fontSize='lg'>Trigger Pest Control Device Here <FontAwesomeIcon icon={faSprayCanSparkles} shake style={{ color: "#005eff", paddingLeft: '5px' }} /></Text>
      <Button colorScheme='red' variant='outline' marginTop='20px' rightIcon={<WarningIcon />} onClick={onOpen}>
        Trigger Now
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        colorScheme='black'
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Release Pesticide?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to trigger the release of pesticide in your vehicle?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick={() => {
              onClose();
              toast.promise(triggerPestControl(), {
                loading: { title: "Pesticide is being Released..", description: "Please Wait" },
                success: { title: "Pesticide Released Successfully", status: "success" },
                error: { title: "Error", status: "error" }
              });
            }
            }>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}


export default PestControl;
