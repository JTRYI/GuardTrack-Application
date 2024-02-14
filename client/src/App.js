import { Center, Container, Flex, Image, Text } from '@chakra-ui/react';
import './App.css'
import CameraFeed from './components/cameraFeed/cameraFeed';
import PestControl from './components/pestControl/pestControl';

function App() {

  return (
    <div className='app-parent'>

      <Flex alignItems='center' justifyContent='center' paddingTop="10px">
        <Image src='GuardTrack IoT Solution Logo.png' style={{ width: '90px', height: '90px' }} />
        <Text fontSize='2xl' style={{color: 'white'}}>GuardTrack</Text>
      </Flex>

      <CameraFeed/>

      <PestControl/>

    </div>
  );
}

export default App;


