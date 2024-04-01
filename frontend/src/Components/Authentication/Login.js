import { FormControl, FormLabel, InputGroup, VStack,Button,InputRightElement, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { Input } from '@chakra-ui/react'
import axios from 'axios'

import {useHistory} from "react-router-dom"

const Login = () => {
  
  const [show, setShow] = React.useState(false)
  const [password, setpassword] = useState("")
  const [Loading, setLoading] = useState(false)
  const history = useHistory();
  const toast=useToast()
  
  const [email, setemail] = useState("")
  const handleClick = () => setShow(!show)
  const submitHandler=async()=>{
    setLoading(true);
    if (  !email || !password ) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  
  return (

    <VStack spacing='5px' align={'stretch'}>
      

      <FormControl id='first-name' isRequired>
        <FormLabel>E-mail</FormLabel>
        <Input
          type='E-mail'
          placeholder='Enter your E-mail'
          onChange={(e) => { setemail(e.target.value) }}
        />
      </FormControl>

      <FormControl  isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input
          type={show?'text':'password'}
          placeholder='Enter your Password'
          onChange={(e) => { setpassword(e.target.value) }}
        />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
        </InputGroup>
      </FormControl>   

      <Button colorScheme='green' variant='solid' onClick={submitHandler} isLoading={Loading}>
    Login
  </Button>   
</VStack>
      
  )
}

export default Login
