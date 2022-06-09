import React, { useState } from 'react'
import { Flex, Heading, chakra } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

type Props = {}

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

const Index = (props: Props) => {

    return (
        <Flex
            mx={'auto'} flexDir={'column'} maxW='1600px'>
            <Heading>Zywkła średnia</Heading>

        </Flex>
    )
}

export default Index