/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { Flex, Heading, Link as ChakraLink, chakra, useColorModeValue, FormLabel, Input, Button, useToast, Box, Tooltip, Text, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Wrap, WrapItem, Divider, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VisuallyHiddenInput, Select, Badge, useColorMode, color } from '@chakra-ui/react';
import { motion, isValidMotionProp, LayoutGroup, AnimatePresence } from 'framer-motion';
import { Form, Link, useActionData, useTransition } from '@remix-run/react';
import { v4 as uuidv4 } from "uuid";
import Phonebottom from '../Phonebottom';
import { CheckIcon, ChevronDownIcon, SettingsIcon } from '@chakra-ui/icons';
import subjects from './../../utils/subjects.json'
import { useCookies } from 'react-cookie';
import AveragesUpBox from '../averagesUpBox';
import Reset from '../reset';

type Props = {}

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});


// only card for grades // not nesesarly for weights problem
function GradesCard(props: any) {
    const wrapW = ['100%', 'calc(50% - 20px)', 'calc(50% - 48px)', 'calc(50% - 48px)', 'calc(33.333% - 48px)'];
    const key = props.cardKey || 0;
    const bg = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');
    const toast = useToast();

    function isInteger(str: any) {
        if (typeof str !== 'string') {
            return false;
        }
        const num = Number(str);
        if (Number.isFinite(num)) {
            return true;
        }
        return false;
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        const field = event.target.children[0].children[0];
        const value = field.value;
        field.focus();
        field.value = "";

        if (!value || !isInteger(value) || Number(value) < 0) {
            toast({
                position: 'top',
                variant: 'solid',
                title: 'Błąd',
                description: "Podaj poprawną ocenę",
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
            return;
        }

        if (props.type == props.TYPES.GRADES && (Number(value) < props.minGrade || Number(value) > props.maxGrade)) {
            toast({
                position: 'top',
                variant: 'solid',
                title: 'Błąd',
                description: `Podaj ocenę od ${props.minGrade} do ${props.maxGrade}`,
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
            return;
        } else if (props.type == props.TYPES.PERCENT && (Number(value) < props.minPercentGrade || Number(value) > props.maxPercentGrade)) {
            toast({
                position: 'top',
                variant: 'solid',
                title: 'Błąd',
                description: `Podaj ocenę od ${props.minPercentGrade} do ${props.maxPercentGrade}`,
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
            return;
        }

        props.onSubmit(Number(value));
    }
    const colors = [
        'gray.500',
        'red.500',
        'orange.500',
        'yellow.500',
        'teal.500',
        'green.500',
        'pink.500',
        'purple.500',
        'purple.900',
    ]
    const grades = [
        1, 2, 3, 4, 5, 6
    ]

    const [gradePlaceholder, setGradePlaceholder] = useState(0);

    useEffect(() => {
        setGradePlaceholder(grades[Math.floor(Math.random() * grades.length)]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.grades])

    return (
        <WrapItem
            display={'block'} w={wrapW} as={motion.li} layout boxShadow={'md'} p={5} borderTop={'1px  solid'} borderBottom={'1px  solid'}
            justifyContent={'space-between'} alignItems='end' borderColor={'rgba(116, 116, 116, 0.432)'}>

            <Heading mb={2} as={motion.h3} layout textShadow={'sm'}>{props.heading}</Heading>
            <Flex as={motion.div} minH='37.5px'><Text fontSize={'25px'} as={motion.p}>
                {props.grades.map((item: any) => {
                    return (
                        <>
                            <Tooltip key={item.key} hasArrow label={"usuń: " + item.grade}>
                                <Box borderTop='2px solid' borderColor={colors.at(item.grade)} as={motion.span} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.1 } }}
                                    onClick={() => props.onDelete(item.key)} cursor='pointer'>
                                    {item.grade}
                                </Box>
                            </Tooltip>
                            <chakra.span as={motion.span} _last={{ display: 'none' }}>{", "} </chakra.span>
                        </>
                    )
                }
                )}
            </Text></Flex>
            <Text as={motion.p} layout mt={0}>Podaj swoje oceny:</Text>
            <form onSubmit={handleSubmit} noValidate>
                <Flex as={motion.div} layout>
                    <Input
                        id={"grades" + key}
                        as={motion.input} layout
                        variant={'flushed'}
                        w={['100%', '75%', '60%']}
                        type={'text'}
                        autoComplete='off'
                        placeholder={gradePlaceholder.toString()}
                        onChange={(e: any) => {
                            // + and - grades cuz people dont like to type eg 1.5 or 2.75 etc
                            if (e.target.value.includes('+')) {
                                e.target.value = e.target.value.replace('+', '');
                                e.target.value = (Number(e.target.value) + Number(props.plusValue)).toFixed(2);
                            } else if (e.target.value.includes('-')) {
                                e.target.value = e.target.value.replace('-', '');
                                e.target.value = (Number(e.target.value) - Number(props.minusValue)).toFixed(2);
                            }
                            if (e.target.value.includes(',')) {
                                (e.target.value.replace(',', '.'));
                            }
                        }}
                    />

                    {/* @ts-ignore */}
                    <Button as={motion.button} layout
                        //@ts-ignore
                        _hover='none' ml={'2'} type="submit" bg={'transparent'} fontWeight='normal'>Dodaj</Button>
                </Flex>
            </form>

        </WrapItem >
    );
}

function WeightsItem(props: any) {
    function handleWeightsSubmit(event: any) {
        event.preventDefault();
        const input = event.target.children[0].children[0];
        const value = input.value;
        input.value = '';
        input.focus();
        let weights = value.split(',');
        weights = weights.map((weight: any) => weight.trim());
        weights = weights.filter((weight: any) => weight && !isNaN(weight));
        weights = weights.map((weight: any) => Number(weight));
        if (weights.length === 0) {
            toast({
                position: 'top',
                variant: 'solid',
                title: 'Błąd',
                description: "Podaj poprawne wagi",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
            return;
        }
        props.onSubmit(weights);
    }
    const toast = useToast()

    return (
        <Box as={motion.div} layout>
            {!props.isWeightsVisible ? (
                <Flex flexDir={'column'} mx='auto'>
                    <Box as={motion.div} layout mx={'auto'}>
                        <Box mt={5} mb={5}>
                            <Text>Zanim obliczysz swoją średnią ważoną musisz najrpiew dodać swoje wagi, które są używane w twojej szkole.</Text>
                            <form onSubmit={handleWeightsSubmit} noValidate>
                                <Flex mt={2} flexDir={['column', 'row']} as={motion.div} layout>
                                    <Input variant={'flushed'} minW='250px' as={motion.input} layout w={['100%', '75%', '30%']} type="text" name="weights" placeholder="1, 2, 3, 4, 5..." autoComplete="off" />
                                    <Button color={'white'} _hover={{ bg: 'brand.100' }} _active={{}} ml={[0, 5]} mt={[2, 0]} mx={['15%', '']}
                                        as={motion.button} layout type="submit" fontWeight='semibold' rounded={'md'} bg='brand.900'
                                    >Zatwierdź <CheckIcon ml={2} /> </Button>
                                </Flex>
                            </form>
                        </Box>
                    </Box>
                </Flex>
            ) : (
                <Flex flexDir={'column'} mx='auto'>
                    <Box as={motion.div} layout mx={'auto'}>
                        <Box mt={5} mb={5}>
                            <Text>Zmiana wag:</Text>
                            <form onSubmit={handleWeightsSubmit} noValidate>
                                <Flex flexDir={'row'} as={motion.div} layout>
                                    <Input variant={'flushed'} minW='250px' as={motion.input} layout w={['100%', '75%', '30%']} type="text" name="weights" placeholder="1, 2, 3, 4, 5..." autoComplete="off" />
                                    <Button as={motion.button} layout type="submit" ml={5} fontWeight='normal' rounded={'md'} bg='transparent' _hover={{ bg: 'rgba(246, 135, 179,0.75)' }}>Zatwierdź</Button>
                                </Flex>
                            </form>
                        </Box>
                    </Box>
                </Flex>
            )
            }
        </Box >
    )
}

function useSavedWeights() {
    const cookiesName = 'weights';
    const [weights, setWeights] = useState();
    const [cookies, setCookie] = useCookies([cookiesName]);

    useEffect(() => {
        if (cookiesName in cookies) {
            setWeights(cookies[cookiesName].split(',').map((weight: any) => Number(weight)));
        }
    }, [cookies]);

    function setNewWeights(newWeigths: any) {
        if (newWeigths) {
            setCookie(cookiesName, newWeigths.join(','));
        }
        setWeights(newWeigths);
    }

    return [weights, setNewWeights];
}

function Index() {

    //percent or normal grades
    enum TYPES {
        GRADES,
        PERCENT
    }
    const [type, setType] = useState(TYPES.GRADES);

    function handleTypeChangeGrades() {
        setType(TYPES.GRADES);
        localStorage.setItem('type', "GRADES");
    }

    function handleTypeChangePercent() {
        setType(TYPES.PERCENT);
        localStorage.setItem('type', "PERCENT");
    }

    useEffect(() => {
        if (type === TYPES.GRADES) {
            setPlusMinusVisible(true);
        } else {
            setPlusMinusVisible(false);
        }
    }, [type, TYPES])

    useEffect(() => {
        const typeStorage = localStorage.getItem('type');
        if (typeStorage == "GRADES") {
            setType(TYPES.GRADES);
        } else if (typeStorage == "PERCENT") {
            setType(TYPES.PERCENT);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [isPlusMinusVisible, setPlusMinusVisible] = useState(true);
    const [plusValue, setPlusValue] = useState(0.50);
    const [minusValue, setMinusValue] = useState(0.25);
    const [maxGrade, setMaxGrade] = useState(6);
    const [minGrade, setMinGrade] = useState(1);
    const [maxPercentGrade, setMaxPercentGrade] = useState(100);
    const [minPercentGrade, setMinPercentGrade] = useState(0);

    const handleMinusChange = (minusValue: any) => setMinusValue(minusValue)
    const handlePlusChange = (plusValue: any) => setPlusValue(plusValue)
    const handleMaxGradeChange = (maxGrade: any) => setMaxGrade(maxGrade)
    const handleMinGradeChange = (minGrade: any) => setMinGrade(minGrade)
    const handleMaxPercentGradeChange = (maxPercentGrade: any) => setMaxPercentGrade(maxPercentGrade)
    const handleMinPercentGradeChange = (minPercentGrade: any) => setMinPercentGrade(minPercentGrade)

    const formatMaxPercentGrade = (maxPercentGrade: number) => maxPercentGrade + `%`
    const formatMinPercentGrade = (minPercentGrade: number) => minPercentGrade + `%`

    const [grades, setGrades] = useState([]);
    const [gradeKey, setGradeKey] = useState(0);
    const [weights, setWeights] = useSavedWeights();
    const [average, setAverage] = useState();

    const [isSettingsScreenVisible, setSettingsScreenVisible] = useState(false);
    const [isWeightsVisible, setIsWeightsVisible] = useState(true);


    useEffect(() => {
        weights === undefined || weights === null ? setSettingsScreenVisible(true) : setSettingsScreenVisible(false);
    }, [weights])


    useEffect(() => {
        if (!weights) return;
        let newGrades = {};
        weights.forEach((weight: any) => newGrades[weight] = [])
        setGrades(newGrades);
    }, [weights]);

    useEffect(() => {
        setVisible(average ? true : false);
        setIsWeightsVisible(!weights ? false : true);
    }, [average, weights])

    useEffect(() => {
        let numerator = 0;
        let denominator = 0;

        for (let i = 0; i < Object.keys(grades).length; i++) {
            const weight = weights[i];
            const weightGrades = grades[weight];
            if (!weightGrades) continue;
            const sum = weightGrades.reduce((acc: any, item: any) => acc + item.grade, 0);
            numerator += sum * weight;
            denominator += weightGrades.length * weight;
        }
        setAverage(Number(numerator) / Number(denominator));
    }, [grades, weights]);

    function handleGradeAdd(weight: any, grade: any) {
        let newGrades = {};
        Object.assign(newGrades, grades);
        newGrades[weight] = newGrades[weight].concat([{ key: gradeKey, grade }]);
        setGradeKey(gradeKey + 1);
        setGrades(newGrades);
    }

    function handleGradeDelete(weight: any, key: any) {
        let newGrades = {};
        Object.assign(newGrades, grades);
        newGrades[weight] = newGrades[weight].filter((item) => item.key !== key);
        setGrades(newGrades);
    }

    function handleGradesReset() {
        let newGrades = {};
        weights.forEach((weight) => newGrades[weight] = [])
        setGrades(newGrades);
        setAverage(null);
    }

    function handleWeightsSubmit(weights: any) {
        if (weights != null || weights != undefined) {
            setWeights(weights);
        }
    }

    const [isVisible, setVisible] = useState(false);
    const bgHoverTypes = useColorModeValue("rgba(0,0,0,0.2)", "rgba(255,255,255,0.2)")
    const ChakraHeading = chakra(motion.h3, {
        shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
    });
    const { isOpen, onOpen, onClose } = useDisclosure()

    const errors = useActionData()
    const { state } = useTransition();


    useEffect(() => {
        if (type == TYPES.GRADES) {
            document.title = average ? average.toFixed(2) + " | Zdaje.com" : "Ważona | Zdaje.com";
        } else {
            document.title = average ? average.toFixed(2) + "% | Zdaje.com" : "Ważona | Zdaje.com";
        }
    }, [TYPES.GRADES, average, type])

    function reset() {
        setGrades([]);
        // setAverage(0);
    }

    console.log(grades)

    return (
        <>
            <Flex mx={[2, 2, 'auto']} h='auto' flexDir={'column'} mb={20} maxW='1600px'>

                <Flex flexDir={'row'} mb={2} justifyContent={'space-between'}>
                    <Flex ml={5} flexDir={'row'} w='auto' border={'2px solid'} borderColor='brand.100' rounded={'lg'} fontWeight='extrabold' p={1}>
                        <Button h='25px' onClick={handleTypeChangeGrades} cursor={'pointer'} _hover={type == TYPES.PERCENT ? { bg: bgHoverTypes } : { bg: '' }}
                            px={'2.5'} py={0.7} rounded='md' bg={type == TYPES.GRADES ? 'rgba(143, 79, 211,0.4)' : ''}
                        >
                            oceny
                        </Button>
                        <Button h='25px' onClick={handleTypeChangePercent} _hover={type == TYPES.GRADES ? { bg: bgHoverTypes } : { bg: '' }}
                            ml={1} cursor={'pointer'} px={'2.5'} py={0.7} rounded='md' bg={type == TYPES.PERCENT ? 'rgba(143, 79, 211,0.4)' : ''}>
                            procenty
                        </Button>
                    </Flex>

                    <Flex alignItems={'center'}>
                        <Reset reset={handleGradesReset} grades={grades} />
                        <Button px='0'
                            onClick={() => setSettingsScreenVisible(!isSettingsScreenVisible)} mr={2} h='25px' transform="auto" _hover={{ bg: 'transparent', rotate: '45deg' }} _focus={{ bg: '' }} _active={{ bg: '' }} bg='transparent' >
                            <SettingsIcon w='100%' h='25px' />
                        </Button>
                    </Flex>
                </Flex>

                <LayoutGroup>


                    {isSettingsScreenVisible &&
                        <ChakraBox layout justifyContent={'center'} alignItems={'center'}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1 } }}>
                            <Divider mb={5} mt={3} />
                            {isWeightsVisible && (
                                <Wrap spacingX={{ base: '10px', sm: '40px' }} spacingY={{ base: '30px', lg: 0 }} justify='center'>

                                    <WrapItem>
                                        <ChakraBox w={'100%'} layout flexDir={'column'}>
                                            <Text>Wartość plusa: </Text>
                                            <NumberInput maxW='400px' w='100%' mr='2rem' step={0.01} value={plusValue} onChange={handlePlusChange}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>

                                            <Text mt={2}>Wartość minusa: </Text>
                                            <NumberInput maxW='400px' w='100%' mr='2rem' step={0.01} value={minusValue} onChange={handleMinusChange}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </ChakraBox>
                                    </WrapItem>
                                    {/* max i min grades */}
                                    <WrapItem>
                                        <ChakraBox w={'100%'} layout flexDir={'column'}>
                                            <Text>Maksymalna ocena: </Text>
                                            <NumberInput maxW='400px' w='100%' mr='2rem' step={1} value={maxGrade} onChange={handleMaxGradeChange}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>

                                            <Text mt={2}>Minimalna ocena: </Text>
                                            <NumberInput maxW='400px' w='100%' mr='2rem' step={1} value={minGrade} onChange={handleMinGradeChange}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>

                                        </ChakraBox>
                                    </WrapItem>

                                    {/* max i min percent grades */}
                                    <WrapItem>
                                        <ChakraBox w={'100%'} layout flexDir={'column'}>
                                            <Text>Maksymalna ocena procentowa: </Text>
                                            <NumberInput maxW='400px' w='100%' mr='2rem' step={1} value={formatMaxPercentGrade(maxPercentGrade)} onChange={handleMaxPercentGradeChange}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>

                                            <Text mt={2}>Minimalna ocena procentowa: </Text>
                                            <NumberInput maxW='400px' w='100%' mr='2rem' step={1} value={formatMinPercentGrade(minPercentGrade)} onChange={handleMinPercentGradeChange}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>

                                        </ChakraBox>
                                    </WrapItem>

                                </Wrap>
                            )}

                            <WeightsItem isWeightsVisible={isWeightsVisible} onSubmit={handleWeightsSubmit} />

                            <Divider mt={5} />
                        </ChakraBox>
                    }

                    <AveragesUpBox isPlusMinusVisible={isPlusMinusVisible} />

                    <ChakraBox rounded={'md'} layout flexDir={'column'} p={5} w='100%' mx="auto" alignItems='center' justifyContent={'center'} justifyItems='center' textAlign='center'>
                        <Text as={motion.p} layout>Twoja średnia to:</Text>
                        <AnimatePresence>
                            <ChakraHeading layout fontSize={'4xl'} fontFamily='Montserrat'>{average ?
                                <>{type == TYPES.GRADES ? Number(average).toFixed(2) : Number(average).toFixed(2) + '%'}</> : <>---</>}
                            </ChakraHeading>
                        </AnimatePresence>

                        <Flex mx={'auto'} mt={3} as={motion.div} layout flexDir={'column'} alignItems='center'>
                            <Flex flexDir={{ base: 'column', md: 'row' }}>

                                <Flex flexDir={'column'} whiteSpace='nowrap'>
                                    <Text fontSize={'xs'} textAlign='center'>Obliczyłeś już swoją średnią?</Text>
                                    <Text mr={2}>Wyślij swoją średnią do bazy
                                        {/* <Badge colorScheme={'green'}>nowość!</Badge> */}
                                    </Text>
                                </Flex>
                                <Tooltip bg={useColorModeValue("bg.900", "bg.100")} hasArrow label='Uzupełnij średnią, zanim ją wyślesz' display={!average ? 'block' : 'none'} shouldWrapChildren>
                                    <Button color='whiteAlpha.900' _hover={{ bg: "rgb(121, 62, 185)" }} minW='100%' onClick={onOpen} bg={'brand.900'} mt={{ base: 2, md: 0 }}
                                        disabled={average ? false : true}
                                    >
                                        <Text display={{ base: 'block', md: 'none' }} mr={2}>Wysyłam</Text>
                                        <svg width="24px" viewBox="0 0 32 32"><title /><g data-name="Layer 10" id="Layer_10"><path fill='white' d="M28.7,14.23,4.43,2.1A2,2,0,0,0,1.65,4.41L5,16,1.65,27.59a2,2,0,0,0,1.89,2.53,1.92,1.92,0,0,0,.89-.22h0L28.7,17.77a2,2,0,0,0,0-3.54Z" /></g></svg>
                                    </Button>
                                </Tooltip>
                            </Flex>

                        </Flex>

                        <Modal motionPreset='scale' isOpen={isOpen} size='xl' onClose={onClose} isCentered>
                            <ModalOverlay />
                            <ModalContent color={useColorModeValue("bg.100", "bg.900")} bg={useColorModeValue("bg.900", "bg.100")}>
                                <ModalHeader>Wyślij swoją średnią do naszej bazy</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>

                                    <Form method='post'>

                                        {type == TYPES.GRADES ?
                                            <>
                                                <Text textAlign={'center'}>Twoja wysyłana średnia: </Text>
                                                <Heading mb={2} textAlign={'center'}>{Number(average).toFixed(2)}</Heading>

                                                {errors?.content ?
                                                    <Text mb={2} textAlign={'center'} fontWeight='extrabold' fontSize='3xl'
                                                        color={useColorModeValue("red.400", 'red.500')}>
                                                        {errors.content}
                                                    </Text>
                                                    : null}

                                                <VisuallyHiddenInput value={Number(average).toFixed(2)} type='number' name='average' />


                                                <Text mb={2}>Wybierz przedmiot: </Text>

                                                <Select
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
                                                        color={useColorModeValue("red.400", 'red.500')}>
                                                        {errors.valid}
                                                    </Text>
                                                    : null}

                                                <Divider bg={useColorModeValue("bg.100", "bg.900")} my={4} />

                                                <Text mt={4} >Wysyłając swoją prawdziwą średnią do bazy, udoskonalasz naszą jakość. Pamiętaj, że średnia powinna być z zakresu
                                                    <chakra.span color={useColorModeValue("green.500", "green.600")}> 1 - 6</chakra.span> oraz nie powinna być procentowa.</Text>

                                            </>
                                            :
                                            <Heading textAlign={'center'} fontSize='2xl' color={useColorModeValue("red.400", "red.500")}>Nie można wysyłać średniej procentowej</Heading>
                                        }
                                        <Flex as={'footer'} mb={2} mt={10} flexDir={'row'} justifyContent='space-between'>
                                            <Flex flexDir={'row'} alignItems='center'>
                                                <chakra.input sx={{ accentColor: '#D53F8C' }} disabled={type == TYPES.GRADES ? false : true} bg={'white'} color='white' required type={'checkbox'} mr={2} w='20px' h='20px' />
                                                <Text w={{ base: '100%', lg: '60%' }} fontSize={'sm'}>Akceptuję <ChakraLink color={useColorModeValue("brand.100", "brand.900")} as={Link} to="/regulamin">regulamin </ChakraLink>
                                                    oraz <ChakraLink color={useColorModeValue("brand.100", "brand.900")} as={Link} to="/regulamin/zasady-wysylania-srednich-do-bazy">zasady
                                                        uczuciwego wysyłania średniej </ChakraLink> </Text>
                                            </Flex>
                                            <Button disabled={type == TYPES.GRADES ? false : true} colorScheme='purple' mr={3} type='submit'>
                                                {state == 'submitting' || state == 'loading' ? "Wysyłanie..." : "Wyślij"}
                                            </Button>
                                        </Flex>
                                    </Form>

                                </ModalBody>
                            </ModalContent>
                        </Modal>
                    </ChakraBox>

                    <Wrap spacing={[5, 5, 12]} as={motion.ul} >

                        {Object.keys(grades).map((weight) =>
                            <GradesCard
                                key={weight}
                                cardKey={weight}
                                heading={`Waga ${weight}`}
                                grades={grades[weight]}
                                onSubmit={(grade: any) => handleGradeAdd(weight, grade)}
                                onDelete={(key: any) => handleGradeDelete(weight, key)}
                                plusValue={plusValue}
                                minusValue={minusValue}
                                type={type}
                                minGrade={minGrade}
                                maxGrade={maxGrade}
                                minPercentGrade={minPercentGrade}
                                maxPercentGrade={maxPercentGrade}
                                TYPES={TYPES}
                            />
                        )}

                    </Wrap>
                </LayoutGroup>
            </Flex>
            <Phonebottom average={Number(average)} type={type} />
        </>
    )
}


export default Index