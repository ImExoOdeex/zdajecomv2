import React from 'react'
import { Heading, Flex, Link as ChakraLink } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import { Link } from '@remix-run/react';

type Props = {}

const subjects = [
    {
        "name": "Matematyka",
        "slug": "matematyka",
    },
    {
        "name": "Język polski",
        "slug": "jezyk-polski",
    },
    {
        "name": "Język angielski",
        "slug": "jezyk-angielski",
    }
]

function index({ }: Props) {
    return (
        <Layout>
            <Flex flexDir={'row'}>
                {/* nawigacjyny komonent */}
                <Flex flexDir={'column'} display={{ base: 'none', lg: 'block' }} w='400px'>
                    {subjects.map((subject) => {
                        return (
                            <ChakraLink key={subject.name} as={Link} to={subject.slug}>
                                <Heading>{subject.name}</Heading>
                            </ChakraLink>
                        )
                    })}


                </Flex>
            </Flex>
        </Layout>
    )
}

export default index