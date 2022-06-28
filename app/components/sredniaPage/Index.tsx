import { Heading, Flex, Link as ChakraLink, Box, Table, TableContainer, Tbody, Thead, Tr, Th, useColorModeValue, Text, Tooltip, VisuallyHidden } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { useLoaderData } from "@remix-run/react";
import SubjectsAside from '~/components/sredniaPage/SubjectsAside';
import TimeAgo from 'javascript-time-ago'
import pl from 'javascript-time-ago/locale/pl.json'
import ReactTimeAgo from 'react-time-ago';

TimeAgo.addDefaultLocale(pl)

type LoaderData = {
    averageList: Array<{ content: Number, subject: String, subjectName: String, id: number, createdAt: Date }>;
};

function Index() {
    const { data, dataOne }: any = useLoaderData<LoaderData>();

    //sort list by id
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
            {/* nawigacjyny komonent */}
            {/* @ts-ignore */}
            <SubjectsAside slug={''} />
            {/* main content */}
            <Flex mt={5} flexDir={'column'}>
                <Box mx={2}>
                    <Heading>Porównaj swoją średnią do średnich innych!</Heading>
                    <Text>Dodano już {dataOne.id} średnich!</Text>
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