import { Heading, Flex, chakra, Box } from '@chakra-ui/react'
import React from 'react'
import { motion, isValidMotionProp } from 'framer-motion';

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

function Index() {
    return (
        <ChakraBox
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            mx={'auto'} flexDir={'column'} maxW='1600px'>
            <Flex flexDir={'row'} w={'100%'} justify={'space-between'}>
                <Box>
                    <Heading textTransform={'uppercase'}>Oblicz swoją średnią</Heading>
                </Box>
                <Box>
                    <Heading>druga strona</Heading>
                </Box>
            </Flex>
        </ChakraBox>
    )
}

export default Index