import { Button, Flex, Heading, HStack, Text, Tooltip, useColorModeValue, WrapItem } from '@chakra-ui/react'
import { motion } from 'framer-motion'

type Props = { average: number, wrapW: any, type: any, TYPES: any, onOpen: any }

function AverageItem({ average, wrapW, type, TYPES, onOpen }: Props) {
    return (
        <WrapItem w={wrapW} rounded={'md'} border='0px solid' borderColor={'brand.100'}
            as={motion.li} layout flexDir={'column'} p={5}
            alignItems='center' justifyContent={'center'}>
            <Text as={motion.p} layout>Twoja średnia to:</Text>
            <Heading as={motion.h2} layout={'position'} fontSize={'4xl'} fontFamily='Montserrat'>{average ?
                <>{type == TYPES.GRADES ? average.toFixed(2) : average.toFixed(2) + '%'}</> : <>---</>}
            </Heading>


            <Flex mt={3} as={motion.div} layout flexDir={{ base: 'column', md: 'row' }} alignItems='center'>
                <Flex flexDir={'column'} whiteSpace='nowrap'>
                    <Text fontSize={'xs'} textAlign='center'>Obliczyłeś już swoją średnią?</Text>
                    <Text mr={2}>Wyślij swoją średnią do bazy
                    </Text>
                </Flex>
                <Tooltip bg={useColorModeValue("bg.900", "bg.100")} hasArrow label='Uzupełnij średnią, zanim ją wyślesz' display={!average ? 'block' : 'none'} shouldWrapChildren>
                    <Button color='whiteAlpha.900' _hover={{ bg: "rgb(121, 62, 185)" }} minW='100%' onClick={onOpen} bg={'brand.900'} mt={{ base: 2, md: 0 }}
                        disabled={average ? false : true}
                    >
                        <HStack spacing={{ base: 2, md: 0 }} mx={{ base: 5, md: 0 }}>
                            <Text display={{ base: 'block', md: 'none' }} >Wysyłam</Text>
                            <svg width="24px" viewBox="0 0 32 32"><title /><g data-name="Layer 10" id="Layer_10"><path fill='white' d="M28.7,14.23,4.43,2.1A2,2,0,0,0,1.65,4.41L5,16,1.65,27.59a2,2,0,0,0,1.89,2.53,1.92,1.92,0,0,0,.89-.22h0L28.7,17.77a2,2,0,0,0,0-3.54Z" /></g></svg>
                        </HStack>
                    </Button>
                </Tooltip>
            </Flex>
        </WrapItem>
    )
}

export default AverageItem