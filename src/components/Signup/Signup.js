import { useState } from 'react';
import { Input, Button } from "@chakra-ui/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

const Signup = ({ onSignupClose }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const signUp = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: username,
      })

      setEmail("");
      setPassword("");
      setUsername("");

      onSignupClose();
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className='signup'>
      <form onSubmit={signUp}>
        <Input
          marginBottom="15px"
          variant="filled"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          _placeholder={{ opacity: 1, color: 'gray.500' }}
        />
        <Input
          marginBottom="15px"
          variant="filled"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          _placeholder={{ opacity: 1, color: 'gray.500' }}
        />
        <Input
          marginBottom="15px"
          variant="filled"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          _placeholder={{ opacity: 1, color: 'gray.500' }}
        />
        <Button
          variant="outline"
          colorScheme="teal"
          marginBottom="20px"
          width="100%"
          type="submit"
        >
          Sign up
        </Button>
      </form>
    </div>
  )
}

export default Signup