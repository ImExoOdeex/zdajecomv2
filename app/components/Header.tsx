import { MoonIcon, SunIcon, HamburgerIcon, Search2Icon, ChevronRightIcon, SmallCloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { chakra, Flex, IconButton, useColorModeValue, Text, useColorMode, Heading, Link as ChakraLink, HStack, Button, useDisclosure, Modal, ModalBody, ModalContent, ModalOverlay, Input, Box, UnorderedList, ListItem, Kbd, SimpleGrid, Tooltip } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "@remix-run/react";
import { motion, isValidMotionProp, AnimatePresence } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import subjects from '../utils/subjects.json'
import { useHotkeys } from "react-hotkeys-hook";

interface HeaderLinkProps {
  children: React.ReactNode;
  to: any;
  close: () => void;
}

export const routes = [
  { link: "/", name: "Strona główna" },
  { link: "/zwykla", name: "Zwykła" },
  { link: "/wazona", name: "Ważona" },
  { link: "/srednie", name: "Średnie" }
]

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

type Props = {
  slug: string
}

function Header({ slug }: Props) {

  const HeaderLink: React.FC<HeaderLinkProps> = ({ children, to, close, ...props }) => {
    return (
      <ChakraLink pos='relative' onClick={close} fontWeight='600'
        // _after={{
        //   content: `''`, bg: brandColor, pos: 'absolute', borderRadius: '5px', w: '0%', h: '2px',
        //   bottom: 0, left: 0, display: 'inline-block', animation: 'linear', transition: '.3s'
        // }}
        // _hover={{
        //   _after: {
        //     w: '100%'
        //   }
        // }}
        px={4} py={2} _hover={{ bg: `rgba(143, 79, 211, 0.7)` }}
        rounded='2xl' as={Link} to={to} opacity={location.pathname == to ? 1 : 0.7}
        {...props}> {children}</ChakraLink >
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
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(0);
  const [hovered, setHovered] = useState(undefined);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (items.length && enterPress && isOpen) {
      // @ts-ignore
      setSelected(items[cursor]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, enterPress]);
  useEffect(() => {
    if (items.length && hovered && isOpen) {
      setCursor(items.indexOf(hovered));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered]);

  useEffect(() => {
    if (selected !== undefined) {
      // @ts-ignore
      // onClose()
      // navigate(`/ srednie / ${selected.slug}`);
    }
  }, [selected]);


  useHotkeys('ctrl+k', (e) => {
    e.preventDefault();
    isOpen ? onClose() : onOpen();
  });

  const [isMenuOpen, setmenuOpen] = useState(false)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("lock-scroll")
    } else {
      document.body.classList.remove("lock-scroll")
    }
  }, [onOpen, onClose, isMenuOpen])


  const navigate = useNavigate()
  const color = useColorModeValue("rgb(143, 79, 211)", "brand.100")
  const bgSlug = useColorModeValue("rgba(143, 79, 211,0.3)", "rgba(187, 131, 247,0.1)")
  const bgThumb = useColorModeValue("rgb(223, 223, 230)", "rgb(37, 37, 40)")
  const brandColor = useColorModeValue("brand.100", "brand.900")

  const sortedSubjects = subjects.sort((a: any, b: any) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  })

  const opacity = .2
  const borderColor = useColorModeValue("blackAlpha.300", "whiteAlpha.300")

  const [scrollY, setScrollY] = useState(0)
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollY(position)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const shadowColor = useColorModeValue("#fff", "#18181a")

  return (
    <Flex w={'100%'} h={{ base: '60px', md: '80px' }} as={'header'}
      borderBottom='1px solid' borderColor={scrollY > 1 ? borderColor : 'transparent'}
      pos='sticky' top={'0px'} zIndex={9}
      backdropFilter={'blur(12px)'}
      transition={'border .33s'}
    >
      <Flex mx={'auto'} w={'1700px'} h='100%' alignItems={'center'} justify={{ base: 'center', md: 'space-between' }}>
        <Flex ml={[2, 2, 5]} mr={5} w={{ base: 'unset', md: '20%' }}>
          <ChakraLink as={Link} to={'/'}>
            <Heading fontFamily={`'Poppins', sans-serif`} fontWeight={'700'}>Zdaje<chakra.span color={useColorModeValue("brand.900", "brand.100")}>.com</chakra.span> </Heading>
          </ChakraLink>
        </Flex>
        <Flex justifyContent={'flex-end'} alignItems={'center'} mr={2} w='68%' >
          {/* search bar */}
          <Button zIndex={9} onClick={onOpen} w='100%' flex={'1'} mr={5} display={{ base: 'none', md: 'flex' }}
            bg={useColorModeValue("whiteAlpha.300", "whiteAlpha.100")} maxW='600px' mx='auto'
            shadow={`0px 2px 5px ${useColorModeValue("rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 0.3)")} `}
          >
            <Search2Icon />
            <Text ml={4} opacity={.7} noOfLines={1} whiteSpace='break-spaces'>Wyszukaj przedmiot</Text>
            <AnimatePresence initial={false}>
              {scrollY < 1 &&
                <Box as={motion.div} zIndex={-1}
                  exit={{ y: -5, opacity: 0, transition: { duration: .15, type: 'tween' } }}
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { duration: .25, type: 'tween' } }}
                  pos={'absolute'} fontSize='12px' mt='60px'>
                  <Kbd rounded={'sm'} ml={2}>Ctrl</Kbd><Kbd rounded={'sm'} ml={0.5}>K</Kbd>
                </Box>
              }
            </AnimatePresence>
          </Button>

          <HStack ml={2} spacing={1} mr={5} fontWeight='extrabold' display={{ base: 'none', md: 'flex' }}>
            <HeaderLink to={'/jak-obliczac'} close={() => setmenuOpen(false)}>Jak obliczyć?</HeaderLink>
            <HeaderLink to={'/zwykla'} close={() => setmenuOpen(false)}>Zwykła</HeaderLink>
            <HeaderLink to={'/wazona'} close={() => setmenuOpen(false)}>Ważona</HeaderLink>
            <HeaderLink to={'/srednie'} close={() => setmenuOpen(false)}>Średnie</HeaderLink>
          </HStack>
          <IconButton mr={4} rounded={'xl'} display={{ base: 'none', md: 'flex' }} bg={'transparent'} icon={colorMode == 'light' ? <MoonIcon /> : <SunIcon />} aria-label={'Toggle color mode'} onClick={toggleColorMode} />
          <Button bg={'transparent'} onClick={onOpen} display={{ base: 'block', md: 'none' }}>
            <Search2Icon />
          </Button>

          <IconButton onClick={() => setmenuOpen(true)} icon={<HamburgerIcon />} display={{ base: 'flex', md: 'none' }} ml={2} bg={'transparent'} _hover={{ bg: 'transparent' }} _active={{ bg: 'tranparent' }} aria-label={""} />

          <AnimatePresence exitBeforeEnter>
            {isMenuOpen &&
              <ChakraBox display={{ base: 'block', md: 'none' }} zIndex={999} initial={{ y: 1000, opacity: 1 }}
                animate={{ y: 0, opacity: 1, transition: { duration: .5, type: 'spring', bounce: .02 } }}
                exit={{ y: 1000, opacity: 0 }} pos={'fixed'} top={0} bottom={0} left={0} right={0} h='100vh'
                // eslint-disable-next-line react-hooks/rules-of-hooks
                bg={useColorModeValue("bg.100", "bg.900 ")}>
                <Box as="header" h={{ base: '60px', md: '80px' }} alignItems='center'>
                  <HStack mx={2} h='100%' alignItems={'center'} justifyContent='space-between'>
                    <Button px={5} onClick={toggleColorMode} border={'1px solid'} bg='transparent'>
                      {colorMode === 'light' ? <><MoonIcon mr={2} /> Ciemny motyw</> : <><SunIcon mr={2} /> Jasny motyw</>}</Button>
                    <IconButton onClick={() => setmenuOpen(false)} icon={<ChevronDownIcon fontSize={'xl'} />} ml={2} bg={'transparent'} _hover={{ bg: 'transparent' }} _active={{ bg: 'tranparent' }} aria-label={""} />
                  </HStack>
                </Box>
                <SimpleGrid mx={5} mt={2} spacing={2} columns={2}
                  shadow={`${shadowColor} 0px 15px 40px`}
                >
                  {routes.map((route) => {

                    return (
                      <Button border='1px solid' bg={location.pathname === route.link ? "brand.900" : 'transparent'}
                        // eslint-disable-next-line
                        borderColor={useColorModeValue("blackAlpha.500", "whiteAlpha.500")} key={route.link} onClick={() => navigate(route.link)}
                        color={location.pathname === route.link ? 'white' : 'initial'}
                      >
                        {route.name}
                      </Button>
                    )
                  })}
                </SimpleGrid>
                <Flex h={`80vh`} flexDir={'column'} mx={2} overflow={'auto'} overflowY={'auto'}
                  sx={{
                    "&::-webkit-scrollbar":
                      { width: '7px' },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: bg,
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: bgThumb,
                      borderRadius: '24px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: 'brand.900'
                    }
                  }}>
                  {/* @ts-ignore */}
                  <Heading fontSize='lg' fontWeight='bold' my={2} color={brandColor}>Przedmioty</Heading>
                  {sortedSubjects.map((subject) => {
                    return (
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      <Tooltip key={subject.name} bg={useColorModeValue("bg.900", "bg.100")}
                        openDelay={600} closeDelay={0} hasArrow label={subject.name} isDisabled={subject.name.length >= 24 ? false : true}>
                        <ChakraLink mr={1}
                          bg={location.pathname == "/srednie/" + slug && subject.slug == slug ? bgSlug : ''}
                          color={location.pathname == "/srednie/" + slug && subject.slug == slug ? color : ''}
                          textAlign={'left'} _hover={{ textDecor: 'none', bg: 'rgba(143, 87, 202, 0.07)', color: 'rgba(187, 131, 247)' }}
                          as={Link} to={"/srednie/" + subject.slug}
                          alignItems='center' justifyContent={'center'} my={1} py={1} rounded='md' fontWeight={'extrabold'}>
                          <Text ml={2} noOfLines={1}>
                            {subject.name}
                          </Text>
                        </ChakraLink>
                      </Tooltip>
                    )
                  })}
                  <ChakraLink mr={1}
                    bgGradient={`linear-gradient(
                    90deg,
                    rgba(255, 0, 0, 1) 0%,
                    rgba(255, 154, 0, 1) 5%,
                    rgba(208, 222, 33, 1) 10%,
                    rgba(79, 220, 74, 1) 15%,
                    rgba(63, 218, 216, 1) 20%,
                    rgba(47, 201, 226, 1) 25%,
                    rgba(28, 127, 238, 1) 30%,
                    rgba(95, 21, 242, 1) 35%,
                    rgba(186, 12, 248, 1) 40%,
                    rgba(251, 7, 217, 1) 45%,
                    rgba(255, 0, 0, 1) 50%
                )`} bgClip='text'
                    textAlign={'left'} _hover={{
                      textDecor: 'none', bgGradient: `linear-gradient(
                    90deg,
                    rgba(255, 0, 0, ${opacity}) 0%,
                    rgba(255, 154, 0, ${opacity}) 10%,
                    rgba(208, 222, 33, ${opacity}) 20%,
                    rgba(79, 220, 74, ${opacity}) 30%,
                    rgba(63, 218, 216, ${opacity}) 40%,
                    rgba(47, 201, 226, ${opacity}) 50%,
                    rgba(28, 127, 238, ${opacity}) 60%,
                    rgba(95, 21, 242, ${opacity}) 70%,
                    rgba(186, 12, 248, ${opacity}) 80%,
                    rgba(251, 7, 217, ${opacity}) 90%,
                    rgba(255, 0, 0, ${opacity}) 100%
                )`, bgClip: 'padding-box', color: 'initial'
                    }}
                    target="_blank" href={"https://forms.google.com/"}
                    alignItems='center' justifyContent={'center'} my={1} py={1} rounded='md' fontWeight={'extrabold'}>
                    <Text ml={2}>
                      + Dodaj przedmiot
                    </Text>
                  </ChakraLink>

                </Flex>
              </ChakraBox>
            }
          </AnimatePresence>

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
            {/*@ts-ignore */}
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
                    <Text fontWeight={'thin'} mt={2} fontFamily={`"Montserrat", sans - serif`}>
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
