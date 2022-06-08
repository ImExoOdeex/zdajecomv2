import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex, IconButton, useColorModeValue, useColorMode, Heading, Link as ChakraLink, HStack, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface HeaderLinkProps {
  children: React.ReactNode;
  to: any;
}

function Header() {
  const HeaderLink: React.FC<HeaderLinkProps> = ({ children, to, ...props }) => {
    const hoverLink = useColorModeValue("rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)");
    return (
      <ChakraLink px={2} py={1} _hover={{ bg: hoverLink }} rounded='md' as={Link} to={to} {...props}>{children}</ChakraLink>
    )
  };

  const bg = useColorModeValue("bg.100", "bg.900");
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex w={'100%'} h='80px' as={'header'} bg={bg}>
      <Flex mx={'auto'} w={'1400px'} h='100%' alignItems={'center'} justify='space-between'>
        <Flex>
          <ChakraLink as={Link} to={'/'}>
            <Heading fontWeight={'extrabold'}>Zdaje.com</Heading>
          </ChakraLink>
        </Flex>
        <Flex alignItems={'center'}>
          <HStack spacing={2} mr={5} fontWeight='extrabold'>
            <HeaderLink to={'/jak-obliczac'}>Jak obliczyć?</HeaderLink>
            <HeaderLink to={'/wazona'}>ważona</HeaderLink>
            <HeaderLink to={'/zwykla'}>zwykła</HeaderLink>
          </HStack>
          <IconButton bg={'transparent'} icon={colorMode == 'light' ? <MoonIcon /> : <SunIcon />} aria-label={'Toggle color mode'} onClick={toggleColorMode} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
