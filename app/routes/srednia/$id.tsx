/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
import { Flex, Heading, Text, Box, useColorModeValue, Stack, chakra } from "@chakra-ui/react";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import Layout from "~/components/Layout";
import { db } from "~/utils/db.server";
import { useLoaderData } from "@remix-run/react";
import SubjectsAside from "~/components/sredniaPage/SubjectsAside";
import { useEffect } from "react";

type LoaderData = {
    averageList: Array<{ content: number, subject: String, subjectName: String, id: number, createdAt: Date }>;
    averageListAll: Array<{ content: number, subject: String, subjectName: String, id: number, createdAt: Date }>;
};

export const loader: LoaderFunction = async ({ params }) => {
    const id = Number(params.id);
    const data = await db.average.findFirst({ where: { id: id } });

    return json({ data })
}

export default function AverageSlug() {

    let { data } = useLoaderData() ?? {};

    if (!data) {
        data = { content: 0 };
    }

    console.log(data);
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

    const bgContent = colors.at(data.content + 0.25);

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
        <Layout>
            <Flex flexDir={'row'} maxW='1500px' mx='auto'>
                {/* nawigacjyny komonent */}
                {/* @ts-ignore */}
                <SubjectsAside slug={''} />

                {/* main content */}
                <Flex mx={2} fontSize={'xl'} mt={5} flexDir={'column'} w={{ base: '100%', lg: '70%' }}>
                    <Box px='6' py={4} mx={'auto'} rounded='lg' bg={bgContent} alignItems={'center'} justifyContent='center' textAlign={'center'}>
                        <Text>Anonim dodał średnią w "{data.subjectName}"</Text>
                        <Heading px={5} fontSize={'6xl'} mt={1}>
                            {data.content.toFixed(2)}
                        </Heading>
                    </Box>
                    <Stack mt={5} spacing={0} textAlign='center'>
                        <Heading alignItems={'center'}>Stworzono <chakra.span color={brandColor} fontSize={'5xl'}>{createdDate}</chakra.span> </Heading>
                        <Heading alignItems={'center'}>o godzinie <chakra.span color={brandColor} fontSize={'5xl'}>{createdTime}</chakra.span> </Heading>
                        <Heading>{createdSeconds} sekundzie i {createdAtMiliSeconds} milisekundzie</Heading>

                        <chakra.span fontSize={'xx-small'}>({data.createdAt})</chakra.span>
                    </Stack>
                </Flex>
            </Flex>
        </Layout >
    );
}