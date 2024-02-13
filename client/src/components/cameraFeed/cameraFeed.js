import React, { useEffect, useState } from 'react';
import './cameraFeed.css';
import { Text, Badge, Box, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { useToast } from '@chakra-ui/react'

function CameraFeed() {

  const [cameraActive, setCameraActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const toast = useToast()

  useEffect(() => {
    const getCameraStatus = async () => {
      try {
        const response = await fetch('https://r3zjqhwd68.execute-api.us-east-1.amazonaws.com/cameraStatus');
        const responseData = await response.json();
        console.log("Response", responseData);
        if (responseData.cameraStatus === true) {
          setCameraActive(true);
          if (!isPlaying) {
            toast({
              title: 'Video Camera Triggered',
              description: "Sound or Motion Sensor had exceeded the threshold!",
              status: 'warning',
              duration: 9000,
              isClosable: true,
            });
            setIsPlaying(true); // Update isPlaying state
          }
        } else {
          console.log("Camera status still false");
        }
      } catch (error) {
        console.error("Error fetching camera status:", error);
      }
    };

    if (!isPlaying) { // Only fetch camera status if not playing
      const interval = setInterval(() => {
        getCameraStatus();
      }, 100000); // Change this to 10 seconds when Demoing and 100 when not, 100000 is 100 Sec and 10000 is 10 Sec

      // Clean up the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [isPlaying]); // Depend on isPlaying state

  async function offCamera() {
    try {
      const response = await fetch(
        "https://r3zjqhwd68.execute-api.us-east-1.amazonaws.com/offCamera",
        {
          method: "PUT"
        }
      );

      const data = await response.json();
      console.log("Data", data);

      if (data.message === "Camera status set to false") {
        setCameraActive(false);
        setIsPlaying(false);
        return Promise.resolve(); // Resolve the promise when camera status is set to false
      } else {
        return Promise.reject(); // Reject the promise if the message is not as expected
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error); // Reject the promise if an error occurs
    }
  }

  <Button colorScheme='red' variant='outline' marginTop='20px' onClick={offCamera}>
    Turn Off Camera
  </Button>


  return (
    <div className="cameraFeed">
      <Text>Live Camera Feed <FontAwesomeIcon icon={faCircle} beat style={{ color: "#ff0000", paddingLeft: '5px' }} />
      </Text>
      {cameraActive ? <video width={600} height={300} controls loop autoPlay muted style={{ marginTop: '10px' }}>
        <source src='https://d3uzrrhwcf413t.cloudfront.net/pests-in-car.mp4' type='video/mp4' />
      </video> : <Box width='100%' height='30vh' marginTop='10px' style={{ border: '1px solid grey', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text>Camera is currently <Badge colorScheme='red'>offline</Badge> . No Threats Detected.</Text></Box>}

      <Button colorScheme='red' variant='outline' marginTop='20px' onClick={() => {
        toast.promise(offCamera(), {
          loading: { title: "Video Camera is being Turned Off", description: "Please Wait" },
          success: { title: "Video Camera Turned Off", status: "success" },
          error: { title: "Error", status: "error" }
        }); 
      }}>
        Turn Off Camera
      </Button>
    </div>
  );
}

export default CameraFeed;
