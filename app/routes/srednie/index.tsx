import React from 'react'
import { Heading, Flex, Link as ChakraLink, Text, Box } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import { Link } from '@remix-run/react';
import { db } from "~/utils/db.server";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Average } from '@prisma/client';

// only for links
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

type LoaderData = {
    jokeListItems: Array<{ content: Number, subject: String }>;
};

export const loader: LoaderFunction = async () => {
    const data: LoaderData = {
        jokeListItems: await db.average.findMany({
            take: 5
        }),
    };
    return json(data);
};

function Index() {
    const data = useLoaderData<LoaderData>();
    return (
        <Layout>
            <Flex flexDir={'row'} maxW='1400px' mx='auto'>
                {/* nawigacjyny komonent */}
                <Flex mt={10} flexDir={'column'} display={{ base: 'none', lg: 'flex' }} w='300px' justifyContent={'center'}>
                    <Text color={'brand.100'} fontSize='lg' fontWeight='bold' mb='2'>
                        Przedmioty
                    </Text>
                    {subjects.map((subject) => {
                        return (
                            <ChakraLink textAlign={'left'} _hover={{ textDecor: 'none', bg: 'rgba(143, 79, 211, 0.1)', color: 'brand.100' }}
                                key={subject.name} as={Link} to={subject.slug}
                                alignItems='center' justifyContent={'center'} my={1} py={1} rounded='md' fontWeight={'extrabold'}
                            >
                                <Text ml={2}>
                                    {subject.name}
                                </Text>
                            </ChakraLink>
                        )
                    })}


                </Flex>

                {/* main content */}
                <Flex mt={5} flexDir={'column'}>
                    <Heading>Porównaj swoje średnie to średnich innych!</Heading>

                    {data.jokeListItems.map((joke) => (
                        <li key={joke.content.toString()}>
                            <Link to={joke.subject.toString()}>{joke.content}</Link>
                            <Text>{joke.subject}</Text>
                        </li>
                    ))}

                </Flex>
            </Flex>
        </Layout>
    )
}

export default Index