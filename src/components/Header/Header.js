import { useState } from 'react';
import "./Header.css";
import { auth, provider } from "../../firebase";
import { signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import { BsFacebook } from "react-icons/bs";
import ImageUpload from '../ImageUpload/ImageUpload';
import Signup from '../Signup/Signup';

const Header = ({ user }) => {

  const { isOpen: isSignupOpen, onOpen: onSignupOpen, onClose: onSignupClose } = useDisclosure();
  const { isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose } = useDisclosure();

  const loginInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      updateProfile(auth.currentUser, {
        displayName: auth.currentUser.displayName,
      })
    } catch (e) {
      console.log(e.message);
    }
  }

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("Successfully signed out.");
    } catch (e) {
      console.log("Unable to signout the user.");
    }
  }

  return (
    <>
      <div className="header">
        <img
          className='headerImg'
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt=''
        />

        {user === null ?
          (
            <div className='header_signin_buttons'>
              <Button
                _hover={{ opacity: 0.9 }}
                colorScheme="facebook"
                rightIcon={<BsFacebook />}
                onClick={loginInWithGoogle}
              >
                Sign in
              </Button>
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={onSignupOpen}
              >
                Sign up
              </Button>
            </div>
          ) :
          (
            <div className='header_logout_buttons'>
              <Button
                colorScheme="teal"
                variant="outline"
                onClick={onUploadOpen}
              >
                Upload
              </Button>
              <Button
                colorScheme="facebook"
                _hover={{ opacity: 0.9 }}
                onClick={logOut}
              >
                Logout
              </Button>
            </div>
          )}

        <Modal
          isCentered
          onClose={onSignupClose}
          isOpen={isSignupOpen}
          motionPreset="slideInBottom"
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Sign Up</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Signup onSignupClose={onSignupClose} />
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal
          isCentered
          onClose={onUploadClose}
          isOpen={isUploadOpen}
          size="xl"
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>What do you feel like to post?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ImageUpload username={auth.currentUser?.displayName} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}

export default Header