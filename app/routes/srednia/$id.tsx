/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
import { Flex, Heading, Text, Box, useColorModeValue, Stack, chakra } from "@chakra-ui/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import Layout from "~/components/Layout";
import { db } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import SubjectsAside from "~/components/sredniaPage/SubjectsAside";
import { useEffect, useRef } from "react";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from 'javascript-time-ago'
import pl from 'javascript-time-ago/locale/pl.json'

export const loader: LoaderFunction = async ({ params }) => {
    const id = Number(params.id);
    const data = await db.average.findFirst({ where: { id: id } });

    return json({ data })
}

export default function AverageSlug() {

    TimeAgo.addDefaultLocale(pl)

    const lastData = useRef({})
    const { data } = useLoaderData() || lastData.current;

    useEffect(() => {
        if (data) lastData.current = { data }
    }, [data])

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

    const bgContent = (grade: number) => {
        const gradePercent = (grade / 6 * 100);
        const color = (Math.floor(gradePercent / 20) + 1)
        return colors[color]
    }

    const bgContentPercent = (grade: number) => {
        const gradePercent = (grade / 100 * 100);
        const color = (Math.floor(gradePercent / 20) + 1)
        return colors[color]
    }

    const created = new Date(data.createdAt);
    const createdAtMiliSeconds = created.getMilliseconds();
    const createdSeconds = created.getSeconds();
    const createdMinutes = created.getMinutes();
    const createdHours = created.getHours();
    const createdDays = created.getUTCDate() + 1;
    const createdMonth = created.getMonth() + 1;
    const createdYear = created.getFullYear();
    const createdDate = `${createdDays}.${createdMonth < 10 ? "0" + createdMonth : createdMonth}.${createdYear}`;
    const createdTime = `${createdHours}:${createdMinutes < 10 ? "0" + createdMinutes : createdMinutes}`;

    useEffect(() => {
        document.title = `${data.content.toFixed(2)} - ${createdDate}`;
    })

    const brandColor = useColorModeValue("brand.900", "brand.100")

    return (
        <Layout slug="">
            <Flex flexDir={'row'} maxW='1500px' mx='auto'>
                {/* nawigacjyny komonent */}
                {/* @ts-ignore */}
                <SubjectsAside slug={''} />

                {/* main content */}
                <Flex mx={2} fontSize={'xl'} mt={5} flexDir={'column'} w={{ base: '100%', lg: '70%' }}>
                    <Box px='6' py={4} mx={'auto'} rounded='lg' bg={data.type == "zwykla" ? bgContent(data.content) : bgContentPercent(data.content)} alignItems={'center'} justifyContent='center' textAlign={'center'}>
                        <Text>Średnia <chakra.span fontWeight={'extrabold'} fontFamily='heading'> {data.type == "zwykla" ? "zwykła" : "procentowa"}</chakra.span></Text>
                        <Text>Anonim dodał średnią w "{data.subjectName}"</Text>
                        <Heading px={5} fontSize={'6xl'} mt={1}>
                            {data.type == "zwykla" ? data.content.toFixed(2) : data.content.toFixed(2) + '%'}
                        </Heading>
                    </Box>
                    <Stack mt={5} spacing={0} textAlign='center'>
                        <Heading alignItems={'center'}>Stworzono <chakra.span color={brandColor} fontSize={'5xl'}>{createdDate}</chakra.span> </Heading>
                        <Heading alignItems={'center'}>o godzinie <chakra.span color={brandColor} fontSize={'5xl'}>{createdTime}</chakra.span> </Heading>
                        <Heading>{createdSeconds} sekundzie i {createdAtMiliSeconds} milisekundzie</Heading>
                        <Heading>Inaczej <chakra.span textShadow={`0px 0px 15px #8F4FD3`} color={brandColor} fontSize={'3xl'}><ReactTimeAgo date={data.createdAt} /></chakra.span></Heading>

                        <chakra.span fontSize={'xx-small'}>({data.createdAt})</chakra.span>
                    </Stack>
                </Flex>
            </Flex>
        </Layout >
    );
}