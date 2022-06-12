import { Heading, chakra, useColorModeValue } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';

type Props = {
    average: number;
    type: any;
}

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

const Phonebottom = ({ average, type }: Props) => {
    const averageType = type == 0 ? average.toFixed(2) : average.toFixed(2) + "%"
    return (
        // eslint-disable-next-line
        <ChakraBox initial={{ y: 70 }} animate={{ y: 0, transition: { type: 'tween' } }} exit={{ y: 70 }}
            // useColorModeValue("bg.100", "bg.900")
            alignItems={'center'} display={['flex', 'flex', 'none']} justifyContent='center' w='100%' pos='fixed' h={'70px'} bg={useColorModeValue("bg.100", "bg.900")} bottom='0' left='0' right='0' textAlign={'center'}>
            <Heading alignItems={'center'}>{average ? averageType : "---"}</Heading>
        </ChakraBox>
    )
}

export default Phonebottom