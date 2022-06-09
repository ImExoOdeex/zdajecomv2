import React, { useState } from 'react'
import { Flex, Heading, chakra } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

type Props = {}

const Index = (props: Props) => {

    const ChakraBox = chakra(motion.div, {
        shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
    });

    return (
        <ChakraBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            mx={'auto'} flexDir={'column'} maxW='1600px'>
            <Heading>Zywkła średnia</Heading>

        </ChakraBox>
    )
}

export default Index