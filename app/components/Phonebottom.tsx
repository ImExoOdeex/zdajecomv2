import { Heading, chakra } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';

type Props = {
    average: number;
    type: any;
}

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

const Phonebottom = ({ average, type }: Props) => {
    const averageType = type == 0 ? average.toFixed(2) : average.toFixed(0) + "%"
    return (
        // eslint-disable-next-line
        <ChakraBox initial={{ y: 60 }} animate={{ y: 0 }} exit={{ y: 60 }}
            // useColorModeValue("bg.100", "bg.900")
            alignItems={'center'} display={['flex', 'flex', 'none']} justifyContent='center' w='100%' pos='fixed' h={'60px'} bg={'pink.700'} bottom='0' left='0' right='0' textAlign={'center'}>
            <Heading alignItems={'center'}>{average ? averageType : "---"}</Heading>
        </ChakraBox>
    )
}

export default Phonebottom