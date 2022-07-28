import { Flex, Link as ChakraLink, Text, Tooltip, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import subjects from './../../utils/subjects.json'

type Props = { slug: String, success: any, props: any, display: any }

function SubjectsAside({ slug, success, props, display = { base: 'none', lg: 'flex' } }: Props) {
    const sortedSubjects = subjects.sort((a: any, b: any) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    })
    const location = useLocation()
    const bg = useColorModeValue("rgba(143, 79, 211,0.3)", "rgba(187, 131, 247,0.1)")
    const color = useColorModeValue("rgb(143, 79, 211)", "brand.100")

    const opacity = .2

    return (
        <Flex
            sx={{
                "&::-webkit-scrollbar":
                    { width: '7px' },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: useColorModeValue("bg.100", "bg.900"),
                },
                '&::-webkit-scrollbar-thumb': {
                    background: useColorModeValue("rgb(223, 223, 230)", "rgb(37, 37, 40)"),
                    borderRadius: '24px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: 'brand.900'
                }
            }}
            position={'sticky'} top={'100px'} mt={5} h={success ? `calc(100vh - 11rem)` : `calc(100vh - 8.125rem)`} overflow='auto' overflowY={'auto'}
            ml={2} as={motion.aside} layout mr={5} flexDir={'column'} display={!display ? { base: 'none', lg: 'flex' } : display} w='300px' minW={'300px'} {...props}>
            <Text color={useColorModeValue("brand.900", "brand.100")} fontSize='lg' fontWeight='bold' mb='2'>
                Przedmioty
            </Text>

            {sortedSubjects.map((subject) => {
                return (
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    <Tooltip key={subject.name} bg={useColorModeValue("bg.900", "bg.100")}
                        openDelay={600} closeDelay={0} hasArrow label={subject.name} isDisabled={subject.name.length >= 24 ? false : true}>
                        <ChakraLink mr={1}
                            bg={location.pathname == "/srednie/" + slug && subject.slug == slug ? bg : ''}
                            color={location.pathname == "/srednie/" + slug && subject.slug == slug ? color : ''}
                            textAlign={'left'} _hover={{ textDecor: 'none', bg: 'rgba(143, 87, 202, 0.07)', color: 'rgba(187, 131, 247)' }}
                            as={Link} to={"/srednie/" + subject.slug}
                            alignItems='center' justifyContent={'center'} my={1} py={1} rounded='md' fontWeight={'extrabold'}>
                            <Text ml={2} noOfLines={1}>
                                {subject.name}
                            </Text>
                        </ChakraLink>
                    </Tooltip>
                )
            })}
            <ChakraLink mr={1}
                bgGradient={`linear-gradient(
                    90deg,
                    rgba(255, 0, 0, 1) 0%,
                    rgba(255, 154, 0, 1) 5%,
                    rgba(208, 222, 33, 1) 10%,
                    rgba(79, 220, 74, 1) 15%,
                    rgba(63, 218, 216, 1) 20%,
                    rgba(47, 201, 226, 1) 25%,
                    rgba(28, 127, 238, 1) 30%,
                    rgba(95, 21, 242, 1) 35%,
                    rgba(186, 12, 248, 1) 40%,
                    rgba(251, 7, 217, 1) 45%,
                    rgba(255, 0, 0, 1) 50%
                )`} bgClip='text'
                textAlign={'left'} _hover={{
                    textDecor: 'none', bgGradient: `linear-gradient(
                    90deg,
                    rgba(255, 0, 0, ${opacity}) 0%,
                    rgba(255, 154, 0, ${opacity}) 10%,
                    rgba(208, 222, 33, ${opacity}) 20%,
                    rgba(79, 220, 74, ${opacity}) 30%,
                    rgba(63, 218, 216, ${opacity}) 40%,
                    rgba(47, 201, 226, ${opacity}) 50%,
                    rgba(28, 127, 238, ${opacity}) 60%,
                    rgba(95, 21, 242, ${opacity}) 70%,
                    rgba(186, 12, 248, ${opacity}) 80%,
                    rgba(251, 7, 217, ${opacity}) 90%,
                    rgba(255, 0, 0, ${opacity}) 100%
                )`, bgClip: 'padding-box', color: useColorModeValue("black", "white")
                }}
                target="_blank" href={"https://forms.google.com/"}
                alignItems='center' justifyContent={'center'} my={1} py={1} rounded='md' fontWeight={'extrabold'}>
                <Text ml={2}>
                    + Dodaj przedmiot
                </Text>
            </ChakraLink>


        </Flex >
    )
}

export default SubjectsAside