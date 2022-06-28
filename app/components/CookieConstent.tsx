import { useEffect, useState } from 'react'
import { Button, chakra, Flex, useColorModeValue, Text, Image } from '@chakra-ui/react';
import { motion, isValidMotionProp, AnimatePresence } from 'framer-motion';

function CookieConstent() {

    const name = "consent"
    const [isCookieConsent, setIsCookieConsent] = useState(true);

    useEffect(() => {
        const storage = localStorage.getItem(name)
        if (storage == "true") {
            setIsCookieConsent(true)
        } else {
            setIsCookieConsent(false)
        }

    }, [])

    function setCookie() {
        localStorage.setItem(name, "true")
        setIsCookieConsent(true)
    }



    const ChakraBox = chakra(motion.div, {
        shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
    })
    const tealColor = useColorModeValue('teal.600', 'teal.200');
    return (
        <AnimatePresence>
            {!isCookieConsent &&
                <ChakraBox
                    initial={!isCookieConsent ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={!isCookieConsent ? { opacity: 1 } : { opacity: 0 }}
                    pos="fixed"
                    bottom="10"
                    left={[0, 0, 10]}
                    zIndex="9999"
                // display={isCookieConsent ? 'none' : 'flex'}
                >
                    <ChakraBox
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 200 }}
                        //@ts-ignore
                        transition={{ duration: 0.4, type: 'spring', bounce: '0' }}
                        maxW={'400px'} m='auto' mx={[4, 4, 'auto']} rounded='md' p={7} justifyContent="center" alignItems="center" border='1px solid' borderColor={tealColor}
                        bg={useColorModeValue('bg.100', 'bg.900')} align="center" display={'flex'} flexDir={'column'}>
                        <Flex flexDir={'row'}>
                            <Text fontSize="sm" color={useColorModeValue('gray.900', 'gray.200')}>
                                Używamy ciasteczek, aby zapewnić najlepsze doświadczenie wszystkich użytkowników.
                            </Text>
                            <Image w={'60px'} src="https://ik.imagekit.io/o532f5vcp38/cookie_yzEnFaENZ.svg?updatedAt=1628271705356" alt='cookie' />
                        </Flex>
                        <Button colorScheme={'teal'} mt={5} minW='100px'
                            variant="outline"
                            onClick={setCookie}
                            fontWeight='normal'
                            w={'100%'}
                        >
                            OK
                        </Button>
                    </ChakraBox>
                </ChakraBox>
            }
        </AnimatePresence >
    )
}
export default CookieConstent