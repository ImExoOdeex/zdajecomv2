import { HStack, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

type Props = {
    size?: number
}

type ItemProps = {
    animation: Array<string>
}

function LoaderItem({ animation }: ItemProps) {

    const w = '20px'
    const brandColor = useColorModeValue("#8F4FD3", "#a263e6")

    return (
        <motion.div
            style={{ borderRadius: '50%', minHeight: w, width: w, backgroundColor: brandColor }}
            animate={{
                height: animation,
            }}
            transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: 'loop'
            }} />
    )
}

function Loader({ size = 0.6 }: Props) {
    const sm = '20px'
    const md = '40px'
    const lg = '60px'
    return (
        <HStack spacing={2} h={"60px"} w='auto' transform={`scale(${size})`} >
            <LoaderItem animation={[sm, lg, sm, lg, sm]} />
            <LoaderItem animation={[md, sm, md, sm, md]} />
            <LoaderItem animation={[sm, md, lg, md, sm]} />
            <LoaderItem animation={[md, sm, md, sm, md]} />
            <LoaderItem animation={[sm, lg, sm, lg, sm]} />
        </HStack>
    )
}

export default Loader