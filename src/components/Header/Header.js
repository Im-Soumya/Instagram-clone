import "./Header.css";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import ImageUpload from '../ImageUpload/ImageUpload';
import Signup from '../Signup/Signup';
import Signin from '../Signin.js/Signin';

const Header = ({ user }) => {

  const { isOpen: isSignupOpen, onOpen: onSignupOpen, onClose: onSignupClose } = useDisclosure();
  const { isOpen: isSigninOpen, onOpen: onSigninOpen, onClose: onSigninClose } = useDisclosure();
  const { isOpen: isUploadOpen, onOpen: onUploadOpen, onClose: onUploadClose } = useDisclosure();

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
                variant="outline"
                colorScheme="blue"
                onClick={onSigninOpen}
                paddingX="12px"
              >
                Sign in
              </Button>
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={onSignupOpen}
                paddingX="12px"
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
                paddingX="12px"
              >
                Upload
              </Button>
              <Button
                colorScheme="facebook"
                _hover={{ opacity: 0.9 }}
                onClick={logOut}
                paddingX="13px"
              >
                Sign out
              </Button>
            </div>
          )}

        <Modal
          isCentered
          onClose={onSignupClose}
          isOpen={isSignupOpen}
          motionPreset="slideInBottom"
          size="sm"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className='sign_headerImg'>
              <img
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt=''
              />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Signup
                onSignupClose={onSignupClose}
                onSigninOpen={onSigninOpen}
                onSigninClose={onSigninClose}
              />
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal
          isCentered
          onClose={onSigninClose}
          isOpen={isSigninOpen}
          motionPreset="slideInBottom"
          size="sm"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader className='sign_headerImg'>
              <img
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt=''
              />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Signin
                onSigninClose={onSigninClose}
                onSignupOpen={onSignupOpen}
                onSignupClose={onSignupClose}
              />
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
              <ImageUpload onUploadClose={onUploadClose} username={auth.currentUser?.displayName} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}

export default Header