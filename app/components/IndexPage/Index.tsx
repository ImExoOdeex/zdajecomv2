import { Heading, Flex, chakra, Box, Link as ChakraLink, DarkMode, LightMode, Button } from '@chakra-ui/react'
import React from 'react'
import { motion, isValidMotionProp } from 'framer-motion';
import { Link } from '@remix-run/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useColorModeValue } from '@chakra-ui/react';

function Index() {

    const ChakraButton = chakra(motion.button, {
        shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
    });

    const navigate = useNavigate();

    return (
        <Flex h={'65vh'} flexDir={'column'}>
            <Flex m={'auto'} flexDir={{ base: 'column', md: 'row' }} w={'100%'} justify={'space-between'} maxW='1600px'>
                <Flex flexDir={'column'} w={{ base: '100%', md: '30%' }}>
                    <Heading fontStyle={'normal'} textAlign={'center'} fontSize={'55px'} >Oblicz swoją <chakra.span color={'green.500'}>średnią</chakra.span> i sprawdź czy
                        <chakra.span color={'pink.500'}> zdajesz!</chakra.span></Heading>

                    <motion.div whileHover={{ y: 7, cursor: 'pointer' }} style={{ width: '75%', margin: '0 auto', padding: '0', marginTop: '20px' }} onClick={() => navigate('/jak-obliczac')} >
                        <Button border={'2px solid'} borderColor={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')} _hover={{ bg: '' }} bg='transparent' w='100%' h={'45px'} rounded='md' fontWeight='extrabold' py={'5'}>Jak obliczać?</Button>
                    </motion.div>

                    <motion.div whileHover={{ y: 7, cursor: 'pointer' }} style={{ width: '75%', margin: '0 auto', padding: '0', marginTop: '20px' }} onClick={() => navigate('/zwykla')} >
                        <Button _hover={{ bg: '' }} color={'white'} bg={useColorModeValue("blue.600", "teal.500")} w='100%' h={'45px'} rounded='md' fontWeight='extrabold' py={'5'}>Zwykła</Button>
                    </motion.div>

                    <motion.div whileHover={{ y: 7, cursor: 'pointer' }} style={{ width: '75%', margin: '0 auto', padding: '0', marginTop: '20px' }} onClick={() => navigate('/wazona')} >
                        <Button _hover={{ bg: '' }} color={'white'} bg='brand.100' w='100%' h={'45px'} rounded='md' fontWeight='extrabold' py={'5'}>Ważona</Button>
                    </motion.div>
                </Flex>
                <Box>
                    <Heading>druga strona</Heading>
                </Box>
            </Flex>
        </Flex>
    )
}

export default Index