import { Heading, Flex, chakra, Box, Link as ChakraLink, DarkMode, LightMode, Button, Text } from '@chakra-ui/react'
import React from 'react'
import { motion, isValidMotionProp } from 'framer-motion';
import { Link } from '@remix-run/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useColorModeValue } from '@chakra-ui/react';

function Index() {

    const ChakraBox = chakra(motion.div, {
        shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
    });

    const resButton = ['90%', '60%', '75%', '75%']

    return (
        <Flex h={'65vh'} flexDir={'column'}>
            <Flex m={'auto'} flexDir={{ base: 'column', md: 'row' }} w={'100%'} justify={'space-between'} maxW='1600px'>
                <Flex flexDir={'column'} w={{ base: '100%', md: '30%' }}>
                    <Heading mt={{ base: '25px', md: 0 }} color={useColorModeValue("black", "white")} fontStyle={'inherit'} textAlign={'center'} fontSize={{ base: '40px', md: '55px' }} opacity='1'>Oblicz swoją
                        <chakra.span color={useColorModeValue('#3F9852', 'rgb(107 217 104)')}> średnią</chakra.span> i sprawdź czy
                        <chakra.span color={'pink.500'}> zdajesz!</chakra.span></Heading>

                    <motion.div whileHover={{ y: 7, cursor: 'pointer' }} style={{ width: '100%', display: 'flex', marginTop: '15px' }}>
                        <ChakraLink boxShadow={'md'} _hover={{ textDecor: 'none' }} textAlign={'center'} as={Link} to='/jak-obliczac' bg={'transparent'} rounded='md' w={resButton}
                            alignItems={'center'} justifyContent='center' py={2.5} fontWeight='extrabold' mx='auto' border={'2px solid'}>Jak obliczyć?</ChakraLink>
                    </motion.div>

                    <motion.div whileHover={{ y: 7, cursor: 'pointer' }} style={{ width: '100%', display: 'flex', marginTop: '15px' }}>
                        <ChakraLink boxShadow={'md'} _hover={{ textDecor: 'none' }} textAlign={'center'} as={Link} to='/zwykla' bg={useColorModeValue("blue.600", "teal.500")} rounded='md' w={resButton}
                            alignItems={'center'} justifyContent='center' py={2.5} fontWeight='extrabold' color={'white'} mx='auto'>Zwykła</ChakraLink>
                    </motion.div>

                    <motion.div whileHover={{ y: 7, cursor: 'pointer' }} style={{ width: '100%', display: 'flex', marginTop: '15px' }}>
                        <ChakraLink boxShadow={'md'} _hover={{ textDecor: 'none' }} textAlign={'center'} as={Link} to='/wazona' bg={'brand.100'} rounded='md' w={resButton}
                            alignItems={'center'} justifyContent='center' py={2.5} fontWeight='extrabold' color={'white'} mx='auto'>Ważona</ChakraLink>
                    </motion.div>


                </Flex>
                <Flex flexDir={'column'} w={{ base: '100%', md: '70%' }} mt={{ base: '75px', md: '25px' }}>
                    <Heading color={useColorModeValue("blackAlpha.900", "whiteAlpha.900")} textAlign='center'>Kalkulator średniej <chakra.span color={useColorModeValue("blue.600", "teal.500")}>
                        zwykłej </chakra.span>
                        i  <chakra.span color={'brand.100'}>ważonej</chakra.span></Heading>

                    <Text mx={[2, 2, 20]} textAlign={'center'} fontWeight='extrabold' color={useColorModeValue("#303030", '#c2c2c2')} fontSize='md'>kalkulator posiada funkcję liczenia średniej zwykłej
                        (inaczej arytmetycznej) oraz średniej ważonej. Szkoły mają różne typy ocen, dlatego jest możliwość zmianiy między średnią z ocenami oraz średnią procentową.</Text>
                </Flex>
            </Flex>
        </Flex >
    )
}

export default Index