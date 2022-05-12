import { Box, Text } from '@chakra-ui/react';
import { BsGithub } from "react-icons/bs";
import "./Footer.css";

const Footer = () => {
  return (
    <Box
      height="55px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      bg="gray.300"
      fontSize="lg"
    >
      <Text marginRight="5px">Developed by</Text>
      <a
        href='https://github.com/Im-Soumya'
        rel=''
        target='_blank'
        className='github_link'
      >
        Soumya <div style={{ marginLeft: "5px", fontSize: "20px" }}><BsGithub /></div>
      </a>
    </Box>
  )
}

export default Footer;