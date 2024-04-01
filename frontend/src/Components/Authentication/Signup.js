
import { FormControl, FormLabel, InputGroup, VStack,Button,InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import axios from 'axios'
import {useHistory} from 'react-router'


const Signup = () => {
  
  const toast = useToast()
  const history=useHistory()
  const [name, setname] = useState("")
  const [profile, setprofile] = useState("")
  const [show, setShow] = React.useState(false)
  const [password, setpassword] = useState("")
  const [confirmpassword, setconfirmpassword] = useState("")
  const [email, setemail] = useState("")
  const [Loading, setLoading] = useState(false)
  const handleClick = () => setShow(!show)
  const postDetails=(profile)=>{
    setLoading(true)
    if(profile===undefined){
      toast({
        title: 'Please Select an Image',
        position:'bottom',
        status: 'Warning',
        duration: 5000,
        isClosable: true,
      })
      return;}

     if(profile.type==="image/jpeg"||profile.type==="image/png"){
         const data=new FormData()
         data.append("file",profile)
         data.append("upload_preset","i-chat-app")
         data.append("cloud_name","djytj2qj7")
         fetch("https://api.cloudinary.com/v1_1/djytj2qj7/image/upload", {
         method: "post",
         body: data,
       }).then((res) => res.json())
        .then((data) => {
           setprofile(data.url.toString());
           console.log(data.url.toString());
           setLoading(false);
         })
         .catch((err) => {
           console.log(err);
           setLoading(false);
         });
    } else {
       toast({
         title: "Please Select an Image!",
         status: "warning",
         duration: 5000,
         isClosable: true,
         position: "bottom",
       });
       setLoading(false);
       return;
     }
    //     data
       }
    
  
  const submitHandler=async()=>{
    
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
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
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, password, profile);
    try {
      const headers = {
      "Content-Type": "application/json"
  };
  
  const data = {
      name,email,password,profile
  };
  
  const result = await axios.post("/api/user", data, {
      headers: headers
  });
      
      console.log(result);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(result));
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
        <FormLabel>Name</FormLabel>
        <Input
          placeholder='Enter your name'
          onChange={(e) => { setname(e.target.value) }}
        />
      </FormControl>

      <FormControl id='e-mail' isRequired>
        <FormLabel>E-mail</FormLabel>
        <Input
          
          placeholder='Enter your name'
          onChange={(e) => { setemail(e.target.value) }}
        />
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input
          type={show?'text':'password'}
          placeholder='Enter your name'
          onChange={(e) => { setpassword(e.target.value) }}
        />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
        </InputGroup>
      </FormControl>      

      <FormControl id='confirm-password' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
        <Input
          type={show?'text':'password'}
          placeholder='Enter your name'
          onChange={(e) => { setconfirmpassword(e.target.value) }}
        />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
        </InputGroup>
      </FormControl> 

      <FormControl id="profile">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
        type='file'
        accept='image/*'
        p={1.5}
        onChange={(profile)=>postDetails(profile.target.files[0])}/>
      </FormControl>

      <Button colorScheme='blue' variant='solid' onClick={submitHandler} isLoading={Loading}>
    Sign up
  </Button>

    </VStack>
  )
  }

export default Signup
