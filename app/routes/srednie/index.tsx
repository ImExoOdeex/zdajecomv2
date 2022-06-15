import React, { useEffect } from 'react'
import { Heading, Flex, Link as ChakraLink, Text, Box, Table, TableContainer, Tbody, Thead, Tr, Th, chakra, useColorModeValue } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import { Link } from '@remix-run/react';
import { db } from "~/utils/db.server";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import SubjectsAside from '~/components/sredniaPage/SubjectsAside';

type LoaderData = {
    averageList: Array<{ content: Number, subject: String, subjectName: String, id: number, createdAt: Date }>;
};

export const loader: LoaderFunction = async () => {
    const data: LoaderData = {
        averageList: await db.average.findMany({
            // take 20 latest records
            take: 20,
            // order by incrementing id
            orderBy: {
                id: 'desc'
            }

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


    const sortedAverageList = data.averageList.sort((a: any, b: any) => {
        if (a.createdAt < b.createdAt) {
            return -1;
        }
        if (a.createdAt > b.createdAt) {
            return 1;
        }
        return 0;
    }
    ).reverse();

    const tableHover = useColorModeValue("blackAlpha.100", "whiteAlpha.100")

    return (
        <Layout>
            <Flex flexDir={'row'} maxW='1400px' mx='auto'>
                {/* nawigacjyny komonent */}
                <SubjectsAside slug={''} />
                {/* main content */}
                <Flex mt={5} flexDir={'column'}>
                    <Heading>Porównaj swoje średnie to średnich innych!</Heading>

                    <Box overflowX={'auto'} overflow='auto'>

                        <Heading mt={10} fontSize={'xl'}>Ostatnio dodane średnie: </Heading>
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

                                    {sortedAverageList.map((average) => {
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
                                            diffrence = diffrence + ' ' + hoursDifference + ' godziny'
                                        }
                                        if (minutesDifference > 0) {
                                            diffrence = diffrence + ' ' + minutesDifference + ' minut'
                                        }
                                        if (daysDifference === 0 && hoursDifference === 0 && minutesDifference === 0) {
                                            diffrence = 'przed chwilą'
                                        }

                                        console.log("timeNowHours: ", timeNowHours + " |  createdAtHours: ", createdAtHours)

                                        return (
                                            <Tr _hover={{ bg: tableHover }} key={average.id}>
                                                <Th>{average.content.toFixed(2)}</Th>
                                                <Th ><ChakraLink _hover={{ textDecor: 'none' }} as={Link} to={`${average.subject}`}>
                                                    <chakra.span fontWeight={'100'} fontSize={'xx-small'}>{average.id}</chakra.span> {average.subjectName}</ChakraLink></Th>
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
        </Layout >
    )
}

export default Index