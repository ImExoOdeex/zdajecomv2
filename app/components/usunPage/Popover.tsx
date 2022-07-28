import { ChatIcon } from "@chakra-ui/icons";
import { Button, chakra, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, useColorModeValue, useDisclosure, Popover as ChakraPopover, Text, PopoverFooter, VisuallyHiddenInput, Code, HStack } from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getCookie } from "~/utils/CookiesFunc";

type Props = {
    averagesToDelete: any[],
}
export default function Popover({ averagesToDelete }: Props) {
    const popoverBg = useColorModeValue("bg.900", "bg.100")
    const { onOpen, onClose, isOpen } = useDisclosure()
    const inverted = useColorModeValue("whiteAlpha.900", "blackAlpha.900")

    function handleDelete() {
        onClose()
        // action in main route file will take the logic/action
    }

    const redBgInverted = "red.500"

    const sortedAveragesToDelete = averagesToDelete.sort((a: any, b: any) => {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    })

    const [user, setUser] = useState('')

    useEffect(() => {
        if (typeof document !== 'undefined') {
            setUser(getCookie("user"))
        }
    }, [])

    const codeBg = useColorModeValue("whiteAlpha.400", "blackAlpha.400")
    const codeColor = useColorModeValue("whiteAlpha.900", "blackAlpha.900")

    return (
        <ChakraPopover isOpen={isOpen} onClose={onClose} onOpen={onOpen} size={'xl'}>
            <PopoverTrigger>
                {/* <Button colorScheme='red'><Text mx={4}>Usuń zaznaczone średnie <ChatIcon ml={2} /></Text></Button> */}
                <Button disabled={averagesToDelete.length >= 1 ? false : true} colorScheme='red' bg='red.500' color='white'><Text mx={4}>Usuń zaznaczone średnie <ChatIcon ml={2} /></Text></Button>
            </PopoverTrigger>
            <Portal>
                <PopoverContent bg={popoverBg} color={inverted}>
                    <PopoverArrow bg={popoverBg} />
                    <PopoverHeader color={inverted} fontWeight='700' border={'0'}>Usuń zaznaczone średnie</PopoverHeader>
                    <PopoverCloseButton color={inverted} />
                    <PopoverBody>
                        <Text>
                            Czy na pewno chcesz usunąć zaznaczone średnie?
                        </Text>

                        <Text my={2}>
                            ID usuwanych średnich: {" "}
                            <Code bg={codeBg} color={codeColor}>
                                {averagesToDelete.length !== 0 ? sortedAveragesToDelete.map((a) => {
                                    return (
                                        <>
                                            <chakra.span key={a}>{a}</chakra.span>
                                            <chakra.span _last={{ display: 'none' }}>{", "} </chakra.span>

                                        </>
                                    )
                                }) : "brak"}
                            </Code>
                        </Text>
                    </PopoverBody>
                    <PopoverFooter border={'0'} color={inverted}>
                        <HStack justifyContent={'flex-end'} spacing={5}>
                            <Button onClick={onClose} bg='transparent' color={'inherit'}>Anuluj</Button>
                            <Form method='post'>
                                <Button disabled={averagesToDelete.length <= 0 ? true : false} type='submit' colorScheme={'red'} color={'white'}
                                    bg={redBgInverted} onClick={handleDelete}>Usuń</Button>
                                <VisuallyHiddenInput name={'averages'} value={averagesToDelete} />
                                <VisuallyHiddenInput name={'user'} value={user} />
                            </Form>
                        </HStack>
                    </PopoverFooter>
                </PopoverContent>
            </Portal>
        </ChakraPopover>
    )
}