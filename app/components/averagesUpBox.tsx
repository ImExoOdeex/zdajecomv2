import { Flex, Box, Heading, useColorModeValue, Text } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

type Props = { isPlusMinusVisible: boolean }

function AveragesUpBox({ isPlusMinusVisible }: Props) {
    const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.800")
    return (
        <Flex as={motion.div} layout flexDir={'column'} border='0px solid' rounded={'sm'} p={[2, 2, 4]} mx='auto' maxW={'1200px'}>
            {/* <AnimatePresence exitBeforeEnter> */}
            {isPlusMinusVisible ?
                <Box flexDir={'row'} as={motion.div}
                // layout exit={{ opacity: 0, transition: { duration: 1 } }} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { type: 'tween' } }}
                >
                    <Heading layout as={motion.h1} fontSize={'3xl'} fontWeight='extrabold'>Jak dodać ocenę z ' + ' lub ' - ' ?</Heading>
                    {/* @ts-ignore */}
                    <Text as={motion.p} layout color={textColor} alignItems={'center'} fontWeight={'500'}>
                        Aby dodać ocenę cząstkową (czyli taką,
                        która zawiera - lub +), wystarczy wpisać swoją ocenę w pole, a kalkulator sam przeliczy + lub - na
                        podane obok wartości tych cząteczek. Pamiętaj, by dopasować wartość + i - (klikając ikonę ustawień) do takiej liczby, jaka używa twoja szkoła - przeważnie jest to
                        -0.25 dla minusa i 0.50 dla plusa. </Text>
                </Box>
                :
                <Box flexDir={'row'}
                //  layout exit={{ opacity: 0, transition: { duration: .15 } }} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { type: 'tween' } }}
                >
                    <Heading layout as={motion.h1} fontSize={'3xl'} fontWeight='extrabold'>Jak dodać oceny procentowe?</Heading>
                    <Box>
                        {/* @ts-ignore */}
                        <Text as={motion.p} layout color={textColor} alignItems={'center'} fontWeight={'500'}>
                            W pole do wpisywania ocen należy wpisać swoją ocenę. Można wpiać ocenę z % na końcu, albo bez - wszystko należy od własnych preferencji.
                        </Text>
                    </Box>
                </Box>
            }
            {/* </AnimatePresence> */}
        </Flex>

    )
}

export default AveragesUpBox