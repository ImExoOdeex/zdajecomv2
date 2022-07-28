import { Button, Link as ChakraLink, Checkbox, Divider, Flex, chakra, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text, useColorModeValue, VisuallyHiddenInput, Progress } from '@chakra-ui/react'
import { Form, Link, useLocation } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { getCookie } from '~/utils/CookiesFunc'
import subjects from '../utils/subjects.json'

type Props = {
    isOpen: boolean, onClose: () => void, type: any, TYPES: any, errors: any, weighted: boolean,
    average: number, state: string
}

function SendAverage({ isOpen, onClose, average, type, TYPES, errors, state, weighted }: Props) {

    const checked = () => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('agree') === 'true') {
                return true;
            } else {
                return false;
            }
        }
    }

    const [isChecked, setIsChecked] = useState(checked())

    const handleChecked = () => {
        setIsChecked(!isChecked)
        if (typeof window !== 'undefined') {
            if (isChecked == true) {
                localStorage.setItem('agree', "true")
            } else {
                localStorage.setItem('agree', "false")
            }
        }
    }

    const errorColor = useColorModeValue("red.400", 'red.500')
    const greenColor = useColorModeValue("green.500", "green.600")
    const brandColor = useColorModeValue("brand.100", "brand.900")

    const pending = state == 'submitting' || state == 'loading'
    const [disButton, setDisButton] = useState(false)

    useEffect(() => {
        if (state == 'idle') {
            setDisButton(true)
            setTimeout(() => {
                setDisButton(false)
            }, 3000)
        }
    }, [state])

    let user = ""

    if (typeof document !== 'undefined') {
        user = getCookie("user")
    }

    const location = useLocation()

    return (
        <>
            <Modal motionPreset='scale' isOpen={isOpen} size='xl' onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent color={useColorModeValue("bg.100", "bg.900")} bg={useColorModeValue("bg.900", "bg.100")}>
                    <ModalHeader>Wyślij swoją średnią do naszej bazy</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Form method='post'>
                            <Text textAlign={'center'}>Twoja wysyłana średnia: </Text>
                            <Heading mb={2} textAlign={'center'}>{
                                type == TYPES.GRADES ?
                                    average.toFixed(2) : average.toFixed(2) + '%'}</Heading>

                            {errors?.content ?
                                <Text mb={2} textAlign={'center'} fontWeight='extrabold' fontSize='3xl'
                                    color={errorColor}>
                                    {errors.content}
                                </Text>
                                : null}

                            <Text mb={2}>Wybierz przedmiot: </Text>

                            <Select disabled={pending}
                                _focusVisible={{ bg: useColorModeValue('whiteAlpha.100', 'blackAlpha.100') }}
                                name='subject' sx={{
                                    '& > option': { bg: useColorModeValue("bg.900", "bg.100") },
                                    "&::-webkit-scrollbar":
                                        { width: '7px' },
                                    '&::-webkit-scrollbar-track': {
                                        backgroundColor: useColorModeValue("bg.900", "bg.100"),
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: useColorModeValue("rgb(64, 64, 66)", "rgb(219, 219, 227)"),
                                        borderRadius: '24px',
                                    },
                                    "&::-webkit-scrollbar-thumb:hover": {
                                        backgroundColor: "brand.900"
                                    }
                                }}
                                _hover={{ bg: useColorModeValue('whiteAlpha.100', 'blackAlpha.100') }} bg={useColorModeValue("bg.900", "bg.100")} color='inherit' variant={'filled'}
                            >
                                {subjects.map((s: any) => {
                                    return (
                                        <option key={s.name} value={s.slug}>{s.name}</option>
                                    )
                                })}
                            </Select>

                            {errors?.valid ?
                                <Text mb={2} textAlign={'center'} fontWeight='extrabold' fontSize='3xl'
                                    color={errorColor}>
                                    {errors.valid}
                                </Text>
                                : null}

                            <Divider bg={useColorModeValue("bg.100", "bg.900")} my={4} />

                            <Text mt={4} >Wysyłając swoją prawdziwą średnią do bazy, udoskonalasz naszą jakość.
                                {type == TYPES.GRADES ? <> {" "}
                                    Pamiętaj, że średnia powinna być z zakresu
                                    <chakra.span color={greenColor}> 1 - 6</chakra.span> oraz nie powinna być procentowa.
                                </>
                                    :
                                    <>
                                        Pamiętaj, że średnia powinna być z zakresu
                                        <chakra.span color={greenColor}> 0% - 100%</chakra.span> oraz nie powinna być ocenowa.
                                    </>
                                }
                            </Text>

                            <Flex as={'footer'} mb={2} mt={10} flexDir={['column', 'row']} justifyContent='space-between'>
                                <Flex flexDir={'row'} alignItems='center'>
                                    <Checkbox required disabled={pending} mr={2} colorScheme='green'
                                        borderColor={useColorModeValue("white", "black")}
                                        defaultChecked={isChecked} size='lg'
                                        onChange={handleChecked}>
                                        <Text w={{ base: '80%', lg: '60%' }} fontSize={'sm'}>Akceptuję <ChakraLink color={useColorModeValue("brand.100", "brand.900")} as={Link} to="/regulamin">regulamin </ChakraLink>
                                            oraz <ChakraLink color={brandColor} as={Link} to="/regulamin/zasady-wysylania-srednich-do-bazy">zasady
                                                uczuciwego wysyłania średniej </ChakraLink>
                                        </Text>
                                    </Checkbox>
                                </Flex>
                                <Button color={'white'} mt={[3, 0]} disabled={pending ? pending : disButton}
                                    colorScheme='purple' bg='brand.900' mr={3} type='submit'
                                    rounded={['2xl', 'lg']}
                                >
                                    {pending ? "Wysyłanie..." : "Wyślij"}
                                </Button>
                            </Flex>
                            <VisuallyHiddenInput value={average.toFixed(2)} type='number' name='average' />
                            <VisuallyHiddenInput value={type == TYPES.GRADES ? 'zwykla' : 'procentowa'} type='text' name='type' />
                            <VisuallyHiddenInput value={user} type='text' name='user' />
                        </Form>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {(pending && isOpen && (location.pathname == "/wazona" || location.pathname == "/zwykla")) &&
                <Progress isIndeterminate pos={'fixed'} top={0} left={0} zIndex={10} w='100%' h='5px'
                    bg={'transparent'} />
            }
        </>
    )
}

export default SendAverage