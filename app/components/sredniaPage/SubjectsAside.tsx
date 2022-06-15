import { Flex, Link as ChakraLink, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import subjects from './../../utils/subjects.json'

type Props = { slug: String }



function SubjectsAside({ slug }: Props) {
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

    return (
        <Flex as={'aside'} mr={5} mt={10} flexDir={'column'} display={{ base: 'none', lg: 'flex' }} w='300px' justifyContent={'center'}>
            <Text color={useColorModeValue("brand.900", "brand.100")} fontSize='lg' fontWeight='bold' mb='2'>
                Przedmioty
            </Text>

            {sortedSubjects.map((subject) => {
                return (
                    <ChakraLink
                        bg={location.pathname == "/srednie/" + slug && subject.slug == slug ? bg : ''}
                        color={location.pathname == "/srednie/" + slug && subject.slug == slug ? color : ''}
                        textAlign={'left'} _hover={{ textDecor: 'none', bg: 'rgba(143, 79, 211, 0.1)', color: 'rgba(187, 131, 247)' }}
                        key={subject.name} as={Link} to={"/srednie/" + subject.slug}
                        alignItems='center' justifyContent={'center'} my={1} py={1} rounded='md' fontWeight={'extrabold'}>
                        <Text ml={2}>
                            {subject.name}
                        </Text>
                    </ChakraLink>
                )
            })}


        </Flex>
    )
}

export default SubjectsAside