import { Heading, Flex, chakra, Link as ChakraLink, Text, Box, Button, TagRightIcon, HStack, Stack, Image } from '@chakra-ui/react'
import { motion } from 'framer-motion';
import { Link, useNavigate } from '@remix-run/react';
import { useColorModeValue } from '@chakra-ui/react';
import Cards from './Cards';
import { ArrowForwardIcon, ArrowRightIcon } from '@chakra-ui/icons';

function Index() {

    const grayColor = useColorModeValue("blackAlpha.700", "whiteAlpha.700")
    const alpha = useColorModeValue("blackAlpha.100", "whiteAlpha.100")

    const px = 7
    const py = 3

    const grayedText = useColorModeValue("blackAlpha.700", "whiteAlpha.700")

    return (
        <>
            <Flex flexDir={'column'} my={15}>
                <Flex py={10} minH={'calc(100vh - 60px)'} alignItems='center'
                    mx={'auto'} flexDir={{ base: 'column', md: 'row' }} w={'100%'} justifyContent={'space-between'}
                    maxW='1300px'>
                    <Flex flexDir={{ base: 'column', md: 'row' }} justifyContent='space-between'
                        mx='auto' w='100%'>
                        <Box mx={2} w={['unset', 'unset', '50%']}>
                            <HStack spacing={2} alignItems='center'>
                                <Box bg={'ActiveBorder'} h='1px' w='25px' />
                                <Text color={'Highlight'} fontWeight={'500'}>Oblicz. Wyślij. Porównaj.</Text>
                            </HStack>
                            <Heading bgGradient={useColorModeValue(
                                'linear(to-r, brand.900, purple.700)',
                                'linear(to-r, brand.100, purple.400)')} bgClip='text'
                                fontFamily={'Poppins'} fontWeight='600' fontSize={{ base: '2xl', lg: '5xl' }}>
                                <chakra.span color={'initial'}>Oblicz swoją</chakra.span> średnią <chakra.span color={'initial'}>
                                    i sprawdź czy </chakra.span>zdajesz!
                            </Heading>
                            <Text lineHeight={'30px'} letterSpacing={'1px'} fontWeight={'400'} my={8} color={grayColor}>
                                {/* kalkulator posiada funkcję liczenia średniej zwykłej (inaczej arytmetycznej) oraz średniej ważonej. Szkoły mają różne typy ocen, dlatego jest możliwość zmianiy między średnią z ocenami oraz średnią procentową. */}
                                Oblicz swoją średnią za pomocą kalkulatora. Porównaj swoje średnie do innych
                                oraz dodawaj swoje własne.
                            </Text>

                            <Stack direction={{ base: 'column', md: 'row' }} spacing={'20px'}>
                                <ChakraLink to={'/zwykla'} alignItems='center' as={Link} w={{ base: '100%', sm: '-webkit-fit-content' }}
                                    fontWeight={'500'} rounded='2xl' textAlign={'center'} _hover={{ textDecor: 'none' }}
                                    colorScheme={'purple'} bg='brand.900' color={'white'} px={px} py={py}>
                                    Zwykła <ArrowForwardIcon ml={1} />
                                </ChakraLink>
                                <ChakraLink as={Link} to='/wazona' alignItems='center' w={{ base: '100%', sm: '-webkit-fit-content' }}
                                    fontWeight={'500'} rounded='2xl' textAlign={'center'} _hover={{ textDecor: 'none' }}
                                    colorScheme={'blue'} bg='blue.500' color={'white'} px={px} py={py}>
                                    <Text>
                                        Ważona <ArrowForwardIcon ml={1} />
                                    </Text>
                                </ChakraLink>

                                <ChakraLink as={Link} to='/jak-obliczac' alignItems='center' w={{ base: '100%', sm: '-webkit-fit-content' }}
                                    fontWeight={'500'} rounded='2xl' textAlign={'center'}
                                    _hover={{ textDecor: 'none', bg: alpha }}
                                    px={px} py={py}>
                                    <Text>
                                        Jak obliczać?
                                    </Text>
                                </ChakraLink>

                            </Stack>
                        </Box>

                        <Box w={['100%', '100%', '50%']}>
                            <Image src='amokas.png' />
                        </Box>
                    </Flex>
                </Flex>
            </Flex >
            <Box mx={2}>
                <Box textAlign={'center'} maxW='700px' mx='auto' w='100%' mb={20}>
                    <Heading fontFamily={`'Poppins', sans-serif`} fontWeight='semibold'>Licz bezproblemowo swoją średnią</Heading>
                    <Text fontSize={['lg', 'xl', 'xl']} color='GrayText'
                        fontWeight={'400'} mt={8} lineHeight='tall' bgGradient={useColorModeValue(
                            'linear(to-r, brand.900, purple.600)',
                            'linear(to-r, brand.100, purple.100)')} bgClip='text'>
                        <chakra.span color={grayedText}>Już nigdy nie będziesz podirytowany liczeniem swojej
                        </chakra.span> średniej <chakra.span color={grayedText}>
                            i wszelkich problemów. Użyj</chakra.span> kalkulatora
                        <chakra.span color={grayedText}> wtedy, kiedy potrzebujesz
                        </chakra.span> obliczyć <chakra.span color={grayedText}>swoją średnią.</chakra.span>
                    </Text>
                </Box>

                <Cards />
            </Box>

        </>
    )
}

export default Index