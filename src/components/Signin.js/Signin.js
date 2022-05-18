import "./Signin.css";
import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import { BsFacebook } from "react-icons/bs";
import { signInWithPopup, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, provider } from "../../firebase";

const Signin = ({ onSignupOpen, onSigninClose, onSignupClose }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, provider);
      updateProfile(auth.currentUser, {
        displayName: auth.currentUser.displayName,
      })
      onSigninClose();

      if (onSignupOpen) {
        onSignupClose();
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  const login = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setEmail("");
      setPassword("");
      onSigninClose();

      if (onSignupOpen) {
        onSignupClose();
      }
    } catch (e) {
      let message = e.code.slice(5, 6).toUpperCase() + e.code.slice(6).replaceAll("-", " ");
      alert(`${message}, please try signing up.`);
    }
  }

  return (
    <div className="signin">
      <form className="signin_form" onSubmit={login}>
        <Input
          variant="filled"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          marginBottom="10px"
        />
        <Input
          variant="filled"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          marginBottom="10px"
        />
        <Button
          variant="outline"
          colorScheme="blue"
          type="submit"
        >
          Sign in
        </Button>
      </form>

      <Button
        _hover={{ opacity: 0.9 }}
        colorScheme="facebook"
        rightIcon={<BsFacebook />}
        onClick={loginInWithFacebook}
        marginTop="18px"
        marginBottom="10px"
      >
        Sign in
      </Button>

      <h3 className="signup_text">Don't have an account? <span className="signup_click_link" onClick={onSignupOpen}>Sign up</span></h3>
    </div>
  )
}

export default Signin;