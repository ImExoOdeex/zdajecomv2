/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
import { Flex, Heading, Link as ChakraLink, Text, Table, TableContainer, Tbody, Th, Thead, Tr, Box, useColorModeValue, chakra, Button, HStack, Stack, Checkbox, useColorMode, VisuallyHiddenInput, Input, NumberInput, NumberInputField } from "@chakra-ui/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "~/components/Layout";
import { db } from "~/utils/db.server";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import SubjectsAside from "~/components/sredniaPage/SubjectsAside";
import { useEffect, useRef, useState } from "react";
import { commitSession, getSession } from "~/utils/sessions";
import { CalendarIcon } from "@chakra-ui/icons";
import TimeAgo from 'javascript-time-ago'
import pl from 'javascript-time-ago/locale/pl.json'
import ReactTimeAgo from 'react-time-ago';
import { AnimatePresence, motion } from "framer-motion";
import AverageOfAveragesCard from "~/components/sredniaPage/AverageOfAveragesCard";
import { useDataRefresh } from "remix-utils";
import Success from "~/components/sredniaPage/Success";

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
    const url = new URL(request.url);
    const type = url.searchParams.getAll("type")
    let averagesToShow = url.searchParams.get("limit") || 2
    averagesToShow = Number(averagesToShow)

    let data: LoaderData = {
        averageList: await db.average.findMany({
            take: averagesToShow,
            where: {
                subject: params.slug
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
                type: true,
                subject: false,
                subjectName: false,
                id: false,
                createdAt: false
            },
            where: {
                subject: params.slug
            }
        }),
    };

    if (!type.includes("zwykla") || !type.includes("procentowa")) {
        if (type.includes("zwykla")) {
            data = {
                averageList: await db.average.findMany({
                    take: averagesToShow,
                    where: {
                        subject: params.slug,
                        type: 'zwykla'
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
                        type: true,
                        createdAt: false
                    },
                    where: {
                        subject: params.slug,
                        type: 'zwykla'
                    }
                }),
            };
        } else if (type.includes("procentowa")) {
            data = {
                averageList: await db.average.findMany({
                    take: averagesToShow,
                    where: {
                        subject: params.slug,
                        type: 'procentowa'
                    },
                    orderBy: {
                        id: 'desc'
                    }
                }),
                //@ts-ignore
                averageListAll: await db.average.findMany({
                    take: 200,
                    select: {
                        type: true,
                        content: true,
                        subject: false,
                        subjectName: false,
                        id: false,
                        createdAt: false
                    },
                    where: {
                        subject: params.slug,
                        type: 'procentowa'
                    }
                }),
            };
        }
    }

    const slug = params.slug

    const dataOne = await db.average.findFirst({ where: { subject: params.slug } });
    return json({ data, dataOne, success, slug },
        {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
}

export default function AverageSlug() {
    const lastData = useRef({})
    const lastDataOne = useRef({})
    const { data, dataOne, success, slug } = useLoaderData() || { data: lastData.current, dataOne: lastDataOne.current };

    useEffect(() => {
        if (dataOne) lastDataOne.current = dataOne
        if (data) lastData.current = data
    }, [data, dataOne])

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
    const [percentAverages, setPercentAverages] = useState([]);

    const [searchParams] = useSearchParams();
    const type = searchParams.getAll("type");
    const limit = searchParams.getAll("limit");

    const NormalAverageList = data.averageListAll.filter(function (a: any) {
        return a.type === 'zwykla'
    })

    const PercentAverageList = data.averageListAll.filter(function (a: any) {
        return a.type === 'procentowa'
    })

    useEffect(() => {
        setAverages([])
        {
            NormalAverageList.map((a: any) => {
                //@ts-ignore
                setAverages((averages) => [...averages, a.content])
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.averageListAll])
    var sum = averages.reduce((a, b) => +a + +b, 0)

    useEffect(() => {
        setPercentAverages([])
        {
            PercentAverageList.map((a: any) => {
                // @ts-ignore
                setPercentAverages((percentAverages: any) => [...percentAverages, a.content])
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.averageListAll])
    var percentSum = percentAverages.reduce((a, b) => +a + +b, 0)

    const [average, setAverage] = useState(0)
    const [percentAverage, setPercentAverage] = useState(0)

    useEffect(() => {
        setAverage(sum / averages.length)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [averages])

    useEffect(() => {
        setPercentAverage(percentSum / percentAverages.length)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [percentAverages])

    useEffect(() => {
        if (dataOne != null) {
            if (!average) {
                document.title = `${percentAverage == 100 ? percentAverage.toFixed(0) + "%" : percentAverage.toFixed(2) + "%"} - ${dataOne?.subjectName} | Zdaje.com `
            } else {
                document.title = `${average.toFixed(2)} - ${dataOne?.subjectName} | Zdaje.com`
            }
        } else {
            document.title = `Brak śrenich | Zdaje.com `
        }
    }, [average, data, dataOne, dataOne?.subjectName, percentAverage])

    const navigate = useNavigate()

    const buttonWidth: any = ['85%', '85%', '48%']

    const submit = useSubmit()

    const [successVisible, setSuccessVisible] = useState(true)

    let averagesList = 0
    const { colorMode } = useColorMode()
    const tableHover = useColorModeValue("blackAlpha.100", "whiteAlpha.100")
    const errorColor = useColorModeValue("red.500", "red.400")

    const [reloadButtonDis, setReloadButtonDis] = useState(false)

    const { refresh } = useDataRefresh()

    function handleAveragesReload() {
        refresh()
        setReloadButtonDis(true)
        setTimeout(() => {
            setReloadButtonDis(false)
        }, 2000)
    }

    const lastAveragesList = useRef({})

    useEffect(() => {
        if (averagesList) {
            lastAveragesList.current = averagesList
        }
    }, [averagesList])

    const [averagesToShow, setAveragesToShow] = useState(2)

    const handleAveragesToShowChange = (e: any) => {
        setAveragesToShow(Number(e))
    }

    return (
        <Layout slug={slug}>
            <Success setSuccessVisible={setSuccessVisible} success={success} successVisible={successVisible} />
            <Flex flexDir={'row'} maxW='1500px' mx='auto'>
                {/* nawigacjyny komonent */}
                {/* @ts-ignore */}
                <SubjectsAside slug={slug} success={success} />
                {/* main content */}
                {dataOne !== null ?
                    <Flex mt={5} flexDir={'column'} w={{ base: '100%', lg: '70%' }}>
                        <Flex mb={20} flexDir={'row'}>
                            <Flex flexDir={'column'} justifyContent='center' textAlign='center' mx='auto'>
                                <Box as={motion.div} mx={'auto'}>
                                    <Heading fontSize={{ base: '4xl', md: '6xl' }} mb={10}>{dataOne.subjectName}</Heading>
                                </Box>
                                <Flex flexDir={{ base: 'column', md: 'row' }}>
                                    <AnimatePresence initial={false}>
                                        {(type.includes('zwykla') || type.length == 0) &&
                                            <AverageOfAveragesCard average={average} percentAverage={percentAverage} typ={'grades'} type={type} />
                                        }
                                        {(type.includes('procentowa') || type.length == 0) &&
                                            <AverageOfAveragesCard average={percentAverage} percentAverage={percentAverage} typ={'percent'} type={type} />
                                        }
                                    </AnimatePresence>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Box as={motion.div} >
                            <Flex flexDir={{ base: 'column-reverse', sm: 'row' }} justifyContent='space-between'>

                                <Form method="get" onChange={(e) => submit(e.currentTarget)}>
                                    <Box my={3} mx={2}>
                                        <Flex flexDir={'row'} alignItems='center' mb={2} as={motion.div} >
                                            <chakra.svg viewBox="0 0 48 48" height="24px" width="24px"><path fill="currentColor" d="M28 26v12q0 .85-.575 1.425Q26.85 40 26 40h-4q-.85 0-1.425-.575Q20 38.85 20 38V26L8.05 10.75q-.7-.85-.2-1.8Q8.35 8 9.4 8h29.2q1.05 0 1.55.95t-.2 1.8Zm-4 .2L36 11H12Zm0 0Z" /></chakra.svg>
                                            <Heading fontSize={'lg'}>
                                                Filtruj
                                            </Heading>
                                        </Flex>
                                        <HStack spacing={3} as={motion.div} >
                                            <Checkbox zIndex={0} defaultChecked={type.includes("zwykla")} size={'lg'} colorScheme='green' value={'zwykla'} name='type' >
                                                <Text>Zwykła</Text>
                                            </Checkbox>
                                        </HStack>
                                        <HStack spacing={3} as={motion.div} >
                                            <Checkbox defaultChecked={type.includes("procentowa")} size={'lg'} value={'procentowa'} name='type' >
                                                <Text>Procentowa</Text>
                                            </Checkbox>
                                        </HStack>
                                    </Box>
                                    <NumberInput value={averagesToShow} name='limit' onChange={handleAveragesToShowChange}>
                                        <NumberInputField />
                                    </NumberInput>

                                    <Button type="submit" onClick={(e: any) => { setAveragesToShow(averagesToShow + 2); submit(e.currentTarget) }}>Załaduj więcej</Button>
                                </Form>

                                <Box mt={2} mx={2}>
                                    <Flex flexDir={'row'} alignItems='center' as={motion.div} >
                                        <svg viewBox="0 0 48 48" height="24" width="24"><path fill="currentColor" d="M8 38v-3h32v3Zm0-8.5v-3h32v3Zm0-8.7v-3.55L20 10l10 7.1L40 10v3.75L30 20.8l-10.15-7.2Z" /></svg>
                                        <Heading fontSize={'md'}>
                                            Legenda
                                        </Heading>
                                    </Flex>
                                    <Stack as={motion.div} mt={3} mx={3} direction={'row'} spacing={{ base: '15px', sm: '50px' }}>
                                        <HStack><Box bg={'green.500'} rounded='50%' w='15px' h='15px' /> <Text>Zwykła</Text> </HStack>
                                        <HStack><Box bg={'teal.600'} rounded='50%' w='15px' h='15px' /> <Text>Procentowa</Text> </HStack>
                                    </Stack>

                                </Box>
                            </Flex>
                            <TableContainer>
                                <Table size={'md'} whiteSpace='pre-wrap'>
                                    <Thead>
                                        <Tr as={motion.tr} >
                                            <Th maxW={'5px'} paddingInlineEnd={0} paddingInlineStart={0} marginInlineEnd={0}></Th>
                                            <Th alignItems={'center'}>
                                                <Flex flexDir={'row'} alignItems='center' >
                                                    <Text mr={1}>Średnia</Text>
                                                    <chakra.svg focusable={false} style={{ display: 'inline-block', margin: 'auto 0', alignItems: 'center' }} height="1em" width="1em" viewBox="0 0 48 48" className="chakra-icon"><path fill="currentColor" d="M14.2 34.15h3V20.4h-3Zm8.3 0h3v-20.3h-3Zm8.3 0h3v-7.4h-3ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z" /></chakra.svg>
                                                </Flex>
                                            </Th>
                                            <Th>
                                                <Flex alignItems={'center'} flexDir={'row'} >
                                                    <Text mr={1}>Przedmiot</Text>
                                                    <svg style={{ display: 'inline-block' }} viewBox="0 0 48 48" height="1em" width="1em"><path fill="currentColor" d="m23.95 42-14.5-7.95v-12L2 18 23.95 6 46 18v15.85h-3v-14.1l-4.55 2.3v12Zm0-15.4L39.7 18 23.95 9.55 8.3 18Zm0 12 11.5-6.35v-8.4L23.95 30l-11.5-6.25v8.5Zm.05-12Zm-.05 3.7Zm0 0Z" /></svg>
                                                </Flex>
                                            </Th>
                                            <Th>
                                                <Flex flexDir={'row'} alignItems={'center'} >
                                                    <Text mr={1}>Typ</Text>
                                                    <svg height="1em" width="1em" viewBox="0 0 48 48"><path fill="currentColor" d="M6 40v-1.7h4.2V37H8.1v-1.7h2.1V34H6v-1.7h5.9V40Zm10.45-2.45v-3H42v3ZM6 27.85v-1.6l3.75-4.4H6v-1.7h5.9v1.6l-3.8 4.4h3.8v1.7Zm10.45-2.45v-3H42v3ZM8.1 15.8V9.7H6V8h3.8v7.8Zm8.35-2.55v-3H42v3Z" /></svg>
                                                </Flex>
                                            </Th>
                                            <Th>
                                                <Flex flexDir={'row'} alignItems={'center'} >
                                                    <Text mr={1}>Stworzono</Text>
                                                    <CalendarIcon />
                                                </Flex>
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>

                                        {sortedAverageList.map((average: any) => {
                                            averagesList += 1
                                            return (
                                                // @ts-ignore
                                                <Tr _hover={{ bg: tableHover }} cursor={'pointer'} as={motion.tr} key={average.id}
                                                    onClick={() => navigate(`/srednia/${average.id}`)}>
                                                    <Th p={0} w='5px' h='100%' borderBottom={0} borderTop={0}>
                                                        <Box maxW={'5px'} pr={0} mr={0}
                                                            bg={average.type == "zwykla" ? 'green.500' : 'teal.600'}
                                                            h={{ md: '42.78px', base: '58.78px' }}
                                                            w='5px' />
                                                    </Th>
                                                    <Th _after={average.type === 'zwykla' ? {} : { content: `'%'` }}>{average.content.toFixed(2)}</Th>
                                                    {/* @ts-ignore */}
                                                    <Th >
                                                        <ChakraLink _hover={{ textDecor: 'none' }} as={Link} to={`/srednie/${average.subject}`}>
                                                            {average.subjectName}
                                                        </ChakraLink></Th>
                                                    <Th>{average.type === "zwykla" ? "Zwykły" : "Procentowy"}</Th>
                                                    <Th> <ReactTimeAgo style={{ minWidth: '135px' }} timeStyle={'round'} date={average.createdAt} /> </Th>
                                                </Tr>
                                            )
                                        }
                                        )}

                                    </Tbody>
                                </Table>
                            </TableContainer>
                            <Flex>
                                <Box mx='auto' my={4} >
                                    <Button mr={2} fontWeight='400' disabled={reloadButtonDis} onClick={handleAveragesReload}>Odśwież</Button>
                                    <Button fontWeight='400' onClick={() => setAveragesToShow(averagesToShow + 2)}>Załaduj więcej</Button>
                                </Box>
                            </Flex>
                        </Box>
                        {sortedAverageList.length == 0 &&
                            <Heading my={2} color={errorColor} fontSize={'lg'} textAlign='center' mx='auto'>brak średnich</Heading>
                        }
                        {averagesList >= 20 && (
                            <Box textAlign={'center'} mt={2}>
                                <Text fontWeight='bold' opacity={.8}
                                    textShadow={`0px 0px ${colorMode == 'light' ? '15px' : '5px'} #8F4FD3`}
                                >I wiele więcej!
                                </Text>
                            </Box>
                        )}
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