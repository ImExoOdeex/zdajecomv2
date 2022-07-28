import { Box, Heading, IconButton, Stack, Table, TableCaption, TableContainer, Tbody, Text, Th, Thead, Tr, useColorModeValue, useToast } from "@chakra-ui/react"
import { useActionData, useLoaderData } from "@remix-run/react"
import ReactTimeAgo from "react-time-ago"
import Layout from "~/components/Layout"
import { db } from "~/utils/db.server"
import TimeAgo from 'javascript-time-ago'
import pl from 'javascript-time-ago/locale/pl.json'
import { type ActionArgs, json, type LoaderArgs } from "@remix-run/node"
import { useEffect, useRef, useState } from "react"
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons"
import Popover from '../../components/usunPage/Popover'
import { AnimatePresence, motion } from "framer-motion"

TimeAgo.addDefaultLocale(pl)

type AverageProps = {
    id: number,
    content: number,
    subject: string,
    subjectName: string,
    type: string,
    createdAt: any
}

export async function loader({ request }: LoaderArgs) {

    const cookie = request.headers.get("Cookie")
    const user = cookie?.split(";")[0]
    const splittedUser = user?.split("=")[1]

    const count = await db.average.count({
        where: {
            user: splittedUser
        }
    })
    const averages = await db.average.findMany({
        where: {
            user: splittedUser
        }
    })

    return json({ averages, count })
};

export async function action({ request }: ActionArgs) {
    const form = await request.formData();
    const ids = form.get("averages")
    const formCookie = form.get("user")

    // @ts-ignore
    const idsArr = ids?.split(",")

    const idsArrInt = idsArr.map((str: string) => {
        return Number(str);
    });
    const success = true

    const cookie = request.headers.get("Cookie")
    const user = cookie?.split(";")[0]
    const splittedUser = user?.split("=")[1]

    if (splittedUser !== formCookie) {
        throw new Error("User cookie do not match with Cookie")
    }

    const count = idsArrInt.length

    await db.average.deleteMany({
        where: {
            id: {
                in: idsArrInt
            }
        }
    })

    return json({ success: success, count: count, ids: idsArrInt });
};

function Index() {

    type ActionData = {
        success: boolean,
        count: number,
        ids: Array<number>
    }

    const action = useActionData<ActionData>()

    const lastAverages = useRef({})
    const lastCount = useRef()
    const { averages, count }: any = useLoaderData() || { averages: lastAverages.current, count: lastCount.current };

    useEffect(() => {
        if (averages) lastAverages.current = averages
        if (count) lastCount.current = count
    }, [averages, count])

    const deleteColor = useColorModeValue("red.500", "red.400")
    const greenColor = useColorModeValue("green.500", "green.400")
    const [AveragesToDelete, setAveragesToDelete]: any = useState([])

    function handleAverageDeleteListAdd(id: number) {
        if (AveragesToDelete.includes(id)) {
            return;
        } else {
            // @ts-ignore
            setAveragesToDelete((OldAveragesToDelete): any => [...OldAveragesToDelete, id])
        }
    }

    function handleAverageDeleteListDelete(id: number) {
        // @ts-ignore
        setAveragesToDelete((OldAveragesToDelete): any => OldAveragesToDelete.filter((item: number) => item !== id))
    }

    type OpaciedTextProps = {
        includes: boolean,
        children: JSX.Element | string | number
    }

    const OpaciedText = ({ includes, children, ...props }: OpaciedTextProps) => {
        return (
            <Text opacity={includes ? .6 : 1} {...props}>
                {children}
            </Text>
        )
    }

    function BorderFaq({ ...props }) {
        return (
            <Box display={'inline-block'} h='1px' w='25px' bg='Highlight' mr={2} {...props} />
        )
    }

    useEffect(() => {
        setAveragesToDelete([])
    }, [averages])

    const brandColor = useColorModeValue("brand.900", "brand.100")

    const toast = useToast()

    useEffect(() => {
        if (action?.success) {
            toast({
                isClosable: true,
                status: 'success',
                position: 'top',
                title: 'Pomyślnie usunięto średnie',
                description: `Usunięto średnich: ${action?.count}, ID usuniętych średnich: ${action?.ids}`,
                duration: 5000,
            })
        }
        // eslint-disable-next-line
    }, [averages])

    return (
        <Layout slug="">
            <Box mt={10} mx={2} >
                <Heading textAlign={'center'}>Usuń swoją średnią</Heading>
                <Box maxW={'1300px'} mx='auto' mt={10}>
                    <Stack my={5} direction={{ base: 'column', md: 'row' }} spacing={5} justifyContent='space-between'>
                        <Box>
                        </Box>
                        <Box>
                            <Popover averagesToDelete={AveragesToDelete} />
                        </Box>
                    </Stack>

                    {averages.length >= 1 ?
                        <TableContainer>
                            <Table>
                                <TableCaption>{count} {count > 1 ? "średnich" : count <= 0 ? "średnich" : "średnia"}</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Średnia</Th>
                                        <Th>Przedmiot</Th>
                                        <Th>Typ</Th>
                                        <Th>Stworzono</Th>
                                        <Th>ID</Th>
                                        <Th paddingInlineEnd={0} paddingInlineStart={0} w='20px' textAlign={'center'}>Usuń</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {averages.map((average: AverageProps) => {
                                        const includes = AveragesToDelete.includes(average.id)
                                        return (
                                            <Tr key={average.id}
                                            // onClick={() => navigate(`/srednia/${average.id}`)}
                                            >
                                                <Th><OpaciedText includes={includes}>{average.content.toFixed(2)}</OpaciedText></Th>
                                                <Th><OpaciedText includes={includes}>{average.subjectName}</OpaciedText></Th>
                                                <Th><OpaciedText includes={includes}>{average.type}</OpaciedText></Th>
                                                <Th> <OpaciedText includes={includes}>
                                                    <ReactTimeAgo date={average.createdAt}
                                                        timeStyle={'round'} />
                                                </OpaciedText>
                                                </Th>
                                                <Th>
                                                    <OpaciedText includes={includes}>
                                                        {average.id}
                                                    </OpaciedText>
                                                </Th>
                                                <Th>
                                                    <AnimatePresence exitBeforeEnter initial={false}>
                                                        <motion.div
                                                            style={{ display: 'inline-block' }}
                                                            key={includes}
                                                            initial={{ y: -10, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            exit={{ y: 10, opacity: 0 }}
                                                            transition={{ duration: .15, type: 'tween' }}
                                                        >
                                                            <IconButton aria-label={!includes ? "delete this average" : "average is added to deleting list! Only need to delete these averages"}
                                                                icon={!includes ? <DeleteIcon w='100%' h='50%' color={deleteColor} /> : <CheckIcon w='100%' h='50%' color={greenColor} />}
                                                                bg='transparent'
                                                                onClick={!includes ? () => handleAverageDeleteListAdd(average.id) : () => handleAverageDeleteListDelete(average.id)} />

                                                        </motion.div>
                                                    </AnimatePresence>
                                                </Th>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                        :
                        <Heading fontSize={['md', 'lg', 'xl']} textAlign='center'>Brak średnich</Heading>
                    }

                    <Box mt={10} lineHeight='6'>
                        <Heading mb={2} textTransform={'uppercase'} color={brandColor} textShadow="0px 0px 5px">FAQ</Heading>
                        <Text alignItems={'center'} display='flex' flexDir={'row'}> <BorderFaq />
                            Dlaczego nie ma tu moich średnich?</Text>
                        <Text alignItems={'center'} display='flex' flexDir={'row'}><BorderFaq w='12.5px' /> Średnie zapisują się na identifykatorze utworzonym podczas pierwszej wizyty (ciasteczko). Tworzy się wtedy id użytkownika, które jest unikatowe oraz jest zapamiętywane na później w przeglądarce. Później stworzony identyfikator jest używany, aby usunąć swoją średnią.</Text>

                    </Box>
                </Box>
            </Box>
        </Layout>
    )
}

export default Index