import { Box, Heading, Image, Text, Wrap, WrapItem, useColorModeValue, SimpleGrid, Flex, VStack, Stack } from '@chakra-ui/react'
import React from 'react'

function Cards() {

    const cards = [
        {
            "id": 0,
            "img": "globe.png",
            "heading": "Duża ilość wspomaganych przedmiotów",
            "text": "Ogromny zasób przedmiotów pozwala na dodanie średniej do prawie każdego przedmiotu. Jeślij nie ma twojego - możesz go bezproblemowo dodać!"
        },
        {
            "id": 1,
            "img": "spaceship.png",
            "heading": "Prędkość światła",
            "text": "Najnowsze technologie pozwalają na szybszą odpowiedź i reakcję strony. Bardzo proste narzędzia są przyjemne w użyciu"
        },
        {
            "id": 2,
            "img": "calculator.png",
            "heading": "Oblicz średnią zwykłą i ważoną",
            "text": "Kalkulator pozwala na liczenie średniej zwykłej oraz ważonej - dostosowujemy się do potrzeb uczniów oraz szkoły"
        },
        {
            "id": 3,
            "img": "note-book.png",
            "heading": "Typ zwykły i procentowy",
            "text": "Istnieje możliwość wybrania typu średniej - zwykła, czyli ocenowa oraz procentowa"
        }
    ]

    const OpTextColor = useColorModeValue("blackAlpha.900", "whiteAlpha.900")

    return (
        <VStack spacing={20} mt={200}>
            <Image src='spaceship.png' pos={'sticky'} top={'50%'} bottom='-14vh' left={0} right={0} />
            <Stack direction={{ base: 'column', md: 'row' }} justifyContent='space-between'>
                <Box w={['100%', '100%', '50%']} mt={1000}>
                    <Text color={OpTextColor} textAlign='center'>Kalkulator pozwala na liczenie średniej zwykłej oraz ważonej - dostosowujemy się do potrzeb uczniów oraz szkoły.</Text>
                </Box>
            </Stack>
        </VStack>
    )
}

export default Cards