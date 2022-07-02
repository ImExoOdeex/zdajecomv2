/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
import { Flex, Heading, Link as ChakraLink, Text, Table, TableContainer, Tbody, Th, Thead, Tr, Box, Center, useColorModeValue, chakra, Button } from "@chakra-ui/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useNavigate } from "react-router-dom";
import Layout from "~/components/Layout";
import { db } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import SubjectsAside from "~/components/sredniaPage/SubjectsAside";
import { useEffect, useState } from "react";
import { commitSession, getSession } from "~/utils/sessions";
import { CheckCircleIcon } from "@chakra-ui/icons";
import TimeAgo from 'javascript-time-ago'
import pl from 'javascript-time-ago/locale/pl.json'
import ReactTimeAgo from 'react-time-ago';

TimeAgo.addDefaultLocale(pl)

type LoaderData = {
    averageList: Array<{ content: number, subject: String, subjectName: String, id: number, createdAt: Date }>;
    averageListAll: Array<{ content: number, subject: String, subjectName: String, id: number, createdAt: Date }>;
};

export const loader: LoaderFunction = async ({ params, request }) => {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const success = session.get("success") || null;
    const data: LoaderData = {
        averageList: await db.average.findMany({
            take: 10,
            where: {
                subject: `${params.slug}`
            },
            orderBy: {
                id: 'desc'
            }
        }),
        //@ts-ignore
        averageListAll: await db.average.findMany({
            take: 200,
            select: {
                content: true,
                subject: false,
                subjectName: false,
                id: false,
                createdAt: false
            },
            where: {
                subject: `${params.slug}`
            }
        }),
    };
    const dataOne = await db.average.findFirst({ where: { subject: `${params.slug}` } });
    return json({ data, dataOne, success },
        {
            headers: {
                // only necessary with cookieSessionStorage
                "Set-Cookie": await commitSession(session),
            },
        });
}

export default function AverageSlug() {
    var { data, dataOne, success } = useLoaderData();
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

    const [averages, setAverages] = useState([]);

    if (!dataOne) {
        dataOne = { content: 0, subject: "", subjectName: "", id: 0, createdAt: new Date() }
    }

    useEffect(() => {
        setAverages([])
        {
            data.averageListAll.map((a: any) => {
                //@ts-ignore
                setAverages((averages) => [...averages, a.content])
            })
        }
    }, [dataOne.content])
    var sum = averages.reduce((a, b) => +a + +b, 0)

    const [average, setAverage] = useState(0)

    useEffect(() => {
        setAverage(sum / averages.length)
    }, [averages])

    useEffect(() => {
        if (dataOne.content != 0) {
            document.title = `${average.toFixed(2)} - ${dataOne.subjectName} | Zdaje.com `
        } else {
            document.title = `Brak śrenich | Zdaje.com `
        }
    }, [average, data, dataOne.subjectName])

    const bgContent = colors.at(average + 0.25);
    const navigate = useNavigate()

    const buttonWidth: any = ['85%', '85%', '48%']

    return (
        <Layout>

            {success ?
                <Center fontWeight={'extrabold'} fontSize={{ base: 'xl', md: '3xl' }} px={2}
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    alignItems='center' py={3} color={useColorModeValue("green.500", "green.400")} bg={'rgba(56, 161, 105,.2)'}
                ><CheckCircleIcon ml={[2, 2, 0]} mr={5} />  Twoja średnia została pomyślnie dodana do bazy!</Center>
                :
                null
            }
            <Flex flexDir={'row'} maxW='1500px' mx='auto'>
                {/* nawigacjyny komonent */}
                <SubjectsAside slug={dataOne.subject} success={success} />

                {/* main content */}
                {dataOne.content != 0 ?
                    <Flex mt={5} flexDir={'column'} w={{ base: '100%', lg: '70%' }}>

                        <Flex mb={20} flexDir={'row'}>
                            <Flex flexDir={'column'} justifyContent='center' textAlign='center' mx='auto'>
                                <Box mx={'auto'}>
                                    <Heading fontSize={{ base: '4xl', md: '6xl' }} mb={10}>{dataOne.subjectName}</Heading>
                                </Box>
                                <Box mx={'auto'}>
                                    <Text>średnia tego przedmiotu to:</Text>
                                    <Box mt={1} bg={bgContent} rounded='lg'>
                                        <Heading fontSize={'6xl'}>
                                            {average ? average.toFixed(2) : "???"}
                                        </Heading>
                                    </Box>
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
                                        return (
                                            <Tr key={average.id}>
                                                <Th>{average.content.toFixed(2)}</Th>
                                                {/* @ts-ignore */}
                                                <Th >
                                                    <ChakraLink _hover={{ textDecor: 'none' }} as={Link} to={`/srednia/${average.id}`}>
                                                        <chakra.span fontSize={'7px'}>{average.id} </chakra.span>
                                                    </ChakraLink>

                                                    <ChakraLink _hover={{ textDecor: 'none' }} as={Link} to={`/srednie/${average.subject}`}>
                                                        {average.subjectName}
                                                    </ChakraLink></Th>
                                                <Th> <ReactTimeAgo date={average.createdAt} /> </Th>
                                            </Tr>
                                        )
                                    }
                                    )}

                                </Tbody>

                            </Table>
                        </TableContainer>
                    </Flex>
                    :
                    <Box w={'100%'} mx={2}>
                        <Heading textAlign={'center'} mt={[5, 5, 10, 15, 20]}>Brak średniej dla tego przedmiotu</Heading>
                        <Box fontWeight={'semibold'} textAlign='left' maxW={'800px'} mx='auto' mt={5}>
                            <Text >Bądź pierwszą osobą, która ją doda! Wybierz typ swojej średniej:</Text>
                            <Flex mx={'auto'} w='100%' flexDir={{ base: 'column', md: 'row' }} mt={5} justifyContent='space-between'>
                                <Button colorScheme={'blue'} mx={'auto'} onClick={() => navigate("/zwykla")} w={buttonWidth}>Zwykła</Button>
                                <Button mt={[5, 5, 0]} colorScheme={'purple'} mx={'auto'} onClick={() => navigate("/wazona")} w={buttonWidth}>Ważona</Button>
                            </Flex>
                        </Box>
                    </Box>}
            </Flex>
        </Layout >
    );
}