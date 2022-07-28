import { Heading, Flex, Link as ChakraLink, Box, Table, TableContainer, Tbody, Thead, Tr, Th, useColorModeValue, Text, chakra } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { useLoaderData } from "@remix-run/react";
import SubjectsAside from '~/components/sredniaPage/SubjectsAside';
import TimeAgo from 'javascript-time-ago'
import pl from 'javascript-time-ago/locale/pl.json'
import ReactTimeAgo from 'react-time-ago';
import React, { useEffect, useRef } from 'react';

TimeAgo.addDefaultLocale(pl)

type LoaderData = {
    averageList: Array<{ content: Number, subject: String, subjectName: String, id: number, createdAt: Date }>;
};

function Index() {
    const lastData = useRef({})
    const lastCount = useRef({})
    const { data, count }: any = useLoaderData<LoaderData>() || { data: lastData.current, count: lastCount.current };

    useEffect(() => {
        if (data) lastData.current = data
        if (count) lastCount.current = count
    }, [data, count])

    const sortedAverageList = data.averageList.sort((a: any, b: any) => {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    }
    ).reverse()

    const tableHover = useColorModeValue("blackAlpha.100", "whiteAlpha.100")

    return (
        <Flex flexDir={'row'} maxW='1500px' mx='auto'>
            {/* nav comp */}
            {/* @ts-ignore */}
            <SubjectsAside slug={''} />
            {/* main content */}
            <Flex mt={5} flexDir={'column'}>
                <Box mx={2}>
                    <Heading>Porównaj swoją średnią do średnich innych!</Heading>

                    <Text fontSize={'lg'} fontWeight={'bold'}>Dodano już
                        {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                        <chakra.span color={useColorModeValue("brand.900", "brand.100")} textShadow='0px 0px 5px #6938c5'>
                            {' '}
                            {/* {typeof document !== 'undefined' &&
                                <Odometer value={count} />
                            } */}
                            {count} {" "}
                        </chakra.span>
                        średnich!</Text>


                </Box>

                <Box overflowX={'auto'} overflow='auto' w={['100vw', '100vw', '100%']}>

                    <Heading mx={2} mt={10} fontSize={'xl'}>Ostatnio dodane średnie: </Heading>
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
                                        <Tr _hover={{ bg: tableHover, transition: '.1s' }} transition='.1s' key={average.id}>
                                            <Th>{average.content.toFixed(2)}</Th>
                                            <Th ><ChakraLink _hover={{ textDecor: 'none' }} as={Link} to={`${average.subject}`}>
                                                {average.subjectName}</ChakraLink></Th>
                                            <Th>
                                                <ReactTimeAgo date={average.createdAt} />
                                            </Th>
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
    )
}

export default Index