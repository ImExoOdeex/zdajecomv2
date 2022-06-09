import React from 'react'
import { Flex, Heading, chakra } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

type Props = {}

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

const Index = (props: Props) => {
    return (
        <ChakraBox
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            mx={'auto'} flexDir={'column'} maxW='1600px'>
            <Heading>Jak obliczać średnią?</Heading>

        </ChakraBox>
    )
}

export default Index