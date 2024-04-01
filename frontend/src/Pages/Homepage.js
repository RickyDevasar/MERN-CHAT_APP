import { Box, Container } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../Components/Authentication/Login'
import Signup from '../Components/Authentication/Signup'
import  {  useEffect } from "react";
import { useHistory } from "react-router-dom";
const Homepage = () => {

  const history = useHistory();
  


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    

    if (user) history.push("/chats");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);
  return (
    <Container maxW='xl' centerContent>
      <Box
      display='flex'
      justifyContent='center'
      bg={'white'}
      p='3'
      w='100%'
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth='1px'
      >
        <Text fontFamily='Work sans' fontSize='4xl'>I-Chat-App</Text>
      </Box>
      <Box
       borderRadius="lg"
       borderWidth='1px'
       bg={'white'}
      p='4'
      w='100%'>
        <Tabs isFitted variant='enclosed'>
  <TabList mb='1em'>
    <Tab _selected={{ color: 'white', bg: 'red' }}>Login</Tab>
    <Tab _selected={{ color: 'white', bg: 'red' }}>Signup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>

      </Box>
    </Container>
  )
}

export default Homepage
