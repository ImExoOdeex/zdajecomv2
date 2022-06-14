import React, { useEffect } from 'react'
import { Heading, Flex, Link as ChakraLink, Text, Box, Table, TableContainer, Tbody, Thead, Tr, Th } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import { Link } from '@remix-run/react';
import { db } from "~/utils/db.server";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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

const sortedSubjects = subjects.sort((a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
})

type LoaderData = {
    averageList: Array<{ content: Number, subject: String, subjectName: String, id: number, createdAt: Date }>;
};

export const loader: LoaderFunction = async () => {
    const data: LoaderData = {
        averageList: await db.average.findMany({
            take: 5
        }),
    };
    return json(data);
};



function Index() {
    const data = useLoaderData<LoaderData>();
    const newDate: any = new Date();
    const timeNowMinutes: number = newDate.getMinutes();
    const timeNowHours: number = newDate.getHours();
    const timeNowDays: number = newDate.getDay();

    return (
        <Layout>
            <Flex flexDir={'row'} maxW='1400px' mx='auto'>
                {/* nawigacjyny komonent */}
                <Flex mr={5} mt={10} flexDir={'column'} display={{ base: 'none', lg: 'flex' }} w='300px' justifyContent={'center'}>
                    <Text color={'brand.100'} fontSize='lg' fontWeight='bold' mb='2'>
                        Przedmioty
                    </Text>
                    {sortedSubjects.map((subject) => {
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

                    <Box overflowX={'auto'} overflow='auto'>

                        <TableContainer>
                            <Table size={'md'} whiteSpace='pre-wrap'>
                                <Thead>
                                    <Tr>
                                        <Th>Średnia</Th>
                                        <Th>Przedmiot</Th>
                                        <Th>Stworzono</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>

                                    {data.averageList.map((average) => {
                                        const createdAtDate = new Date(average.createdAt);
                                        const createdAtMinutes = createdAtDate.getMinutes();
                                        const minutesDifference = timeNowMinutes - createdAtMinutes;
                                        const createdAtHours = createdAtDate.getHours();
                                        const hoursDifference = timeNowHours - createdAtHours;
                                        const createdAtDays = createdAtDate.getDay();
                                        const daysDifference = timeNowDays - createdAtDays;
                                        var diffrence = ''

                                        // make advanced diffrence date
                                        if (daysDifference > 0) {
                                            diffrence = daysDifference + ' dni'
                                        }
                                        if (hoursDifference > 0) {
                                            diffrence = diffrence + ' ' + hoursDifference + ' godzin'
                                        }
                                        if (minutesDifference > 0) {
                                            diffrence = diffrence + ' ' + minutesDifference + ' minut'
                                        }
                                        if (daysDifference === 0 && hoursDifference === 0 && minutesDifference === 0) {
                                            diffrence = 'przed chwilą'
                                        }

                                        console.log("timeNowHours: ", timeNowHours + " |  createdAtHours: ", createdAtHours)

                                        return (
                                            <Tr key={average.id}>
                                                <Th>{average.content}</Th>
                                                <Th><ChakraLink as={Link} to={average.subject}>{average.subjectName}</ChakraLink></Th>
                                                <Th>{diffrence}</Th>
                                            </Tr>
                                        )
                                    }
                                    )}

                                </Tbody>

                            </Table>
                        </TableContainer>
                    </Box>
                </Flex>
            </Flex>
        </Layout>
    )
}

export default Index