import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Flex, IconButton, useColorModeValue, useColorMode, Heading, Link as ChakraLink, HStack, Stack, Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";
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
    <Flex w={'100%'} h={{ base: '60px', md: '80px' }} as={'header'} bg={bg}>
      <Flex mx={'auto'} w={'1400px'} h='100%' alignItems={'center'} justify={{ base: 'center', md: 'space-between' }}>
        <Flex ml={2}>
          <ChakraLink as={Link} to={'/'}>
            <Heading fontWeight={'extrabold'}>Zdaje.com</Heading>
          </ChakraLink>
        </Flex>
        <Flex alignItems={'center'}>
          <HStack spacing={2} mr={5} fontWeight='extrabold' display={{ base: 'none', md: 'flex' }}>
            <HeaderLink to={'/jak-obliczac'}>Jak obliczyć?</HeaderLink>
            <HeaderLink to={'/wazona'}>ważona</HeaderLink>
            <HeaderLink to={'/zwykla'}>zwykła</HeaderLink>
          </HStack>
          <IconButton display={{ base: 'none', md: 'flex' }} bg={'transparent'} icon={colorMode == 'light' ? <MoonIcon /> : <SunIcon />} aria-label={'Toggle color mode'} onClick={toggleColorMode} />
          <Menu>
            <MenuButton display={{ base: 'flex', md: 'none' }} ml={2} bg={'transparent'} _hover={{ bg: 'transparent' }} _active={{ bg: 'tranparent' }} as={IconButton} icon={<HamburgerIcon />} />
            <MenuList bg={useColorModeValue('bg.100', 'bg.900')}>
              <ChakraLink as={Link} to={'/jak-obliczac'}>
                <MenuItem>
                  Jak obliczyć?
                </MenuItem>
              </ChakraLink>
              <ChakraLink as={Link} to={'/zwykla'}>
                <MenuItem>
                  zwykła
                </MenuItem>
              </ChakraLink>
              <ChakraLink as={Link} to={'/wazona'}>
                <MenuItem>
                  ważona
                </MenuItem>
              </ChakraLink>
              <MenuItem onClick={toggleColorMode}>
                {colorMode == 'light' ? <MoonIcon mr={2} /> : <SunIcon mr={2} />} Zmień motyw
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
