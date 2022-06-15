import { Flex, Heading, Link as ChakraLink, Text, chakra, Table, TableContainer, Tbody, Th, Thead, Tr, Box } from "@chakra-ui/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Link } from "react-router-dom";
import Layout from "~/components/Layout";
import { db } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import SubjectsAside from "~/components/sredniaPage/SubjectsAside";
import { getAverage } from "~/models/average.server";
import { useEffect } from "react";

type LoaderData = {
    averageList: Array<{ content: Number, subject: String, subjectName: String, id: number, createdAt: Date }>;
};

export const loader: LoaderFunction = async ({ params }) => {
    const data: LoaderData = {
        averageList: await db.average.findMany({
            take: 10,
            where: {
                subject: `${params.slug}`
            }
        }),
    };
    const dataOne = await db.average.findFirst({ where: { subject: `${params.slug}` } });

    return json({ data, dataOne });
};

export default function AverageSlug({ params }: any) {
    const { data, dataOne } = useLoaderData();
    const newDate: any = new Date();
    const timeNowMinutes: number = newDate.getMinutes();
    const timeNowHours: number = newDate.getHours();
    const timeNowDays: number = newDate.getDay();

    const opacity = .1;

    const colors = [
        `rgba(113, 128, 150, ${opacity})`,
        `rgba(229, 62, 62, ${opacity})`,
        `rgba(221, 107, 32, ${opacity})`,
        `rgba(214, 158, 46, ${opacity})`,
        `rgba(49, 151, 149, ${opacity})`,
        `rgba(56, 161, 105, ${opacity})`,
        `rgba(213, 63, 140, ${opacity})`,
        `rgba(128, 90, 213, ${opacity})`,
        `rgba(50, 38, 89, ${opacity})`,
    ]

    const bgContent = colors.at(dataOne.content + 0.25);

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

    return (
        <Layout>
            <Flex flexDir={'row'} maxW='1400px' mx='auto'>
                {/* nawigacjyny komonent */}

                <SubjectsAside slug={dataOne.subject} />

                {/* main content */}
                <Flex mt={5} flexDir={'column'} w={{ base: '100%', lg: '70%' }}>
                    <Flex mb={20} flexDir={'row'}>
                        <Flex flexDir={'column'} justifyContent='center' mx={'auto'} textAlign='center'>
                            <Text>średnia tego przedmiotu to:</Text>
                            <Box mt={1} bg={bgContent} rounded='lg'>
                                <Heading fontSize={'6xl'}>
                                    {dataOne.content}
                                </Heading>
                            </Box>
                        </Flex>
                        <Flex>
                        </Flex>
                    </Flex>


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

                                {sortedAverageList.map((average: any) => {
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
                                        <Tr key={average.id}>
                                            <Th>{average.content}</Th>
                                            {/* @ts-ignore */}
                                            <Th ><ChakraLink _hover={'none'} as={Link} to={average.subject}>
                                                <chakra.span fontWeight={'100'} fontSize={'xx-small'}>{average.id}</chakra.span> {average.subjectName}</ChakraLink></Th>
                                            <Th>{diffrence}</Th>
                                        </Tr>
                                    )
                                }
                                )}

                            </Tbody>

                        </Table>
                    </TableContainer>


                </Flex>
            </Flex>
        </Layout>
    );
}