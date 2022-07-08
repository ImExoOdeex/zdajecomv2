import { MoonIcon, SunIcon, HamburgerIcon, Search2Icon, TriangleUpIcon, ChevronRightIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { chakra, Flex, IconButton, useColorModeValue, Text, useColorMode, Heading, Link as ChakraLink, HStack, Menu, MenuButton, MenuList, MenuItem, Button, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, InputGroup, InputLeftAddon, Input, Box, UnorderedList, ListItem, Kbd } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "@remix-run/react";
import { motion, isValidMotionProp, LayoutGroup } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import subjects from '../utils/subjects.json'
import { useHotkeys } from "react-hotkeys-hook";

interface HeaderLinkProps {
  children: React.ReactNode;
  to: any;
}

function Header() {

  const HeaderLink: React.FC<HeaderLinkProps> = ({ children, to, ...props }) => {
    const hoverLink = useColorModeValue("rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)");
    return (
      <ChakraLink px={2} py={1} _hover={{ bg: hoverLink }} rounded='md' as={Link} to={to} opacity={location.pathname == to ? 1 : 0.7} {...props}>{children}</ChakraLink>
    )
  };

  const [query, setQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()

  const location = useLocation();
  const bg = useColorModeValue("bg.100", "bg.900");
  const { colorMode, toggleColorMode } = useColorMode();
  var count = 0;
  var notFound = false;


  const useKeyPress = function (targetKey: any) {
    const [keyPressed, setKeyPressed] = useState(false);

    function downHandler({ key }: any) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }

    const upHandler = ({ key }: any) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    useEffect(() => {
      window.addEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);

      return () => {
        window.removeEventListener("keydown", downHandler);
        window.removeEventListener("keyup", upHandler);
      };
    });

    return keyPressed;
  };

  const [selected, setSelected] = useState(undefined);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);
  const [filteredItems, setFilteredItems] = useState([]);

  const items = subjects


  //up and down arrow keypress

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        setCursor(prevState =>
          prevState < items.length - 1 ? prevState + 1 : prevState
        );
        break
      }
      case "ArrowUp": {
        e.preventDefault()
        setCursor(prevState =>
          (prevState > 0 ? prevState - 1 : prevState)
        );
        break
      }
    }

  }, [])

  useEffect(() => {
    if (items.length && enterPress && isOpen) {
      setSelected(items[cursor]);
    }
  }, [cursor, enterPress]);
  useEffect(() => {
    if (items.length && hovered && isOpen) {
      setCursor(items.indexOf(hovered));
    }
  }, [hovered]);

  useEffect(() => {
    if (selected !== undefined) {
      // @ts-ignore
      // onClose()
      // navigate(`/srednie/${selected.slug}`);
    }
  }, [selected]);


  useHotkeys('ctrl+k', (e) => {
    e.preventDefault();
    isOpen ? onClose() : onOpen();
  });


  return (
    <Flex w={'100%'} h={{ base: '60px', md: '80px' }} as={'header'} bg={bg}>
      <Flex mx={'auto'} w={'1400px'} h='100%' alignItems={'center'} justify={{ base: 'center', md: 'space-between' }}>
        <Flex ml={2} mr={5} w={{ base: '', md: '30%' }}>
          <ChakraLink as={Link} to={'/'}>
            <Heading fontWeight={'extrabold'}>Zdaje<chakra.span color={useColorModeValue("brand.900", "brand.100")}>.com</chakra.span> </Heading>
          </ChakraLink>
        </Flex>
        <Flex justifyContent={'flex-end'} alignItems={'center'} mr={2} w='65.2%' >
          {/* search bar */}
          <Button onClick={onOpen} w='100%' flex={'1'} mr={5} display={{ base: 'none', md: 'flex' }}
            bg={useColorModeValue("bg.100", "bg.900")}
            shadow={`0px 2px 5px ${useColorModeValue("rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.3)")}`}
          >
            <Search2Icon />
            <Text ml={4} opacity={.7} noOfLines={1} whiteSpace='break-spaces'>Wyszukaj przedmiot</Text>
            <Box pos={'absolute'} fontSize='12px' mt='60px'>
              <Kbd rounded={'sm'} ml={2}>Ctrl</Kbd><Kbd rounded={'sm'} ml={0.5}>K</Kbd>
            </Box>
          </Button>

          <HStack spacing={2} mr={5} fontWeight='extrabold' display={{ base: 'none', md: 'flex' }}>
            <HeaderLink to={'/jak-obliczac'}>Jak obliczyć?</HeaderLink>
            <HeaderLink to={'/zwykla'}>Zwykła</HeaderLink>
            <HeaderLink to={'/wazona'}>Ważona</HeaderLink>
            <HeaderLink to={'/srednie'}>Średnie</HeaderLink>
          </HStack>
          <IconButton rounded={'xl'} display={{ base: 'none', md: 'flex' }} bg={'transparent'} icon={colorMode == 'light' ? <MoonIcon /> : <SunIcon />} aria-label={'Toggle color mode'} onClick={toggleColorMode} />
          <Button bg={'transparent'} onClick={onOpen} display={{ base: 'block', md: 'none' }}>
            <Search2Icon />
          </Button>
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
                  Zwykła
                </MenuItem>
              </ChakraLink>
              <ChakraLink as={Link} to={'/wazona'}>
                <MenuItem>
                  Ważona
                </MenuItem>
              </ChakraLink>
              <ChakraLink as={Link} to={'/srednie'}>
                <MenuItem>
                  Średnie
                </MenuItem>
              </ChakraLink>
              <MenuItem onClick={toggleColorMode}>
                {colorMode == 'light' ? <MoonIcon mr={2} /> : <SunIcon mr={2} />} Zmień motyw
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* modal  */}
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        size='md'
        scrollBehavior={'inside'}
      >
        <ModalOverlay />
        <ModalContent mt={20}
          bg={useColorModeValue("bg.100", 'bg.900')}
        >
          <ModalBody
            sx={{
              "&::-webkit-scrollbar":
                { width: '7px' },
              '&::-webkit-scrollbar-track': {
                backgroundColor: useColorModeValue("bg.100", "bg.900"),
              },
              '&::-webkit-scrollbar-thumb': {
                background: useColorModeValue("rgb(223, 223, 230)", "rgb(37, 37, 40)"),
                borderRadius: '24px',
              }
            }}>
            <Flex flexDir={'row'} alignItems='center' h='50px'>
              <Search2Icon mr={2} />
              <Input value={query} onChange={(e: any) => setQuery(e.target.value)} variant={'unstyled'} spellCheck={"false"}
                maxLength={100} placeholder="Wyszukaj przedmiot" aria-autocomplete="list" autoComplete={"false"}
                autoCorrect={"false"}
                onKeyDown={onKeyDown}
              />
              {query &&
                <SmallCloseIcon cursor={'pointer'} onClick={() => setQuery("")} />
              }
            </Flex>

            <span>Selected: {selected ? selected.name : "none"}</span>

            {query &&
              <UnorderedList marginInlineStart={0} role={'listbox'} listStyleType={'none'} listStylePos={'outside'}>
                {
                  items.filter(
                    // eslint-disable-next-line array-callback-return
                    (item: any) => {
                      if (query === "") {
                        count++;
                        return item;
                      } else if (item.name.toLowerCase().includes(query.toLowerCase())) {
                        count++;
                        return item;
                      }
                      if (count === 0 && query !== "") {
                        notFound = true;
                      } else {
                        notFound = false;
                      }
                    }
                  ).map((item: any, i: any) => {
                    return (
                      <ChakraLink
                        key={item.slug} _focus={{ outline: '2px solid' }} _hover={{ textDecor: 'none' }} as={Link} to={`/srednie/${item.slug}`}>
                        <ListItem _focus={{ bg: 'brand.900' }} _selected={{ bg: 'brand.900' }} justifyContent={'space-between'} mt={2} px={5}
                          onMouseEnter={() => setHovered(item)}
                          onMouseLeave={() => setHovered(undefined)}
                          onClick={() => setSelected(item)}
                          display={'flex'} flexDir='row' role={'option'} alignItems={'center'}
                          _hover={{ bg: "brand.900" }} fontWeight='semibold' w='100%' h='60px'
                          // eslint-disable-next-line react-hooks/rules-of-hooks
                          bg={i === cursor ? "brand.900" : useColorModeValue("blackAlpha.100", "whiteAlpha.100")} mx='auto' rounded={'lg'}
                        >
                          <Text mr={5}>
                            {item.name}
                          </Text>
                          <ChevronRightIcon />
                        </ListItem>
                      </ChakraLink>
                    )
                  })
                }

                {notFound &&
                  <Box my={3} textAlign={'center'}>
                    {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                    <Text fontWeight={'semibold'} fontSize='xl' color={useColorModeValue("red.500", "red.400")}>
                      Brak pasujących wyników
                    </Text>
                    <Text fontWeight={'thin'} mt={2} fontFamily={`"Montserrat", sans-serif`}>
                      ¯\_( ͡ᵔ ‿ ͡ᵔ)_/¯
                    </Text>
                  </Box>
                }

              </UnorderedList>
            }

          </ModalBody>
        </ModalContent>
      </Modal>


    </Flex >
  );
}

export default Header;
