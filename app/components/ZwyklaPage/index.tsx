/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { Flex, Heading, chakra, useColorModeValue, FormLabel, Input, Button, useToast, Box, Tooltip, Text, HStack, useNumberInput, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Wrap, WrapItem, Divider } from '@chakra-ui/react';
import { motion, isValidMotionProp, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import { Form } from '@remix-run/react';
import { v4 as uuidv4 } from "uuid";
import Phonebottom from '../Phonebottom';
import { typeCookie } from './../Cookies';
import { SettingsIcon } from '@chakra-ui/icons';

type Props = {}

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

const Index = (props: Props) => {

    const ChakraHeading = chakra(motion.h3, {
        shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
    });

    const ChakraText = chakra(motion.p, {
        shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
    });

    const toast = useToast()

    //percent or normal grades
    enum TYPES {
        GRADES,
        PERCENT
    }
    const [type, setType] = useState(TYPES.GRADES);

    //average code
    const [grades, setGrades] = useState([]);
    const [average, setAverage] = useState(0);
    const [newGrade, setNewGrade] = useState('');
    const [isVisible, setVisible] = useState(false);
    const [isPlusMinusVisible, setPlusMinusVisible] = useState(false);
    const [isSettingsScreenVisible, setSettingsScreenVisible] = useState(true);
    const [plusValue, setPlusValue] = useState(0.50);
    const [minusValue, setMinusValue] = useState(0.25);
    const [maxGrade, setMaxGrade] = useState(6);
    const [minGrade, setMinGrade] = useState(1);
    const [maxPercentGrade, setMaxPercentGrade] = useState(100);
    const [minPercentGrade, setMinPercentGrade] = useState(0);

    useEffect(() => {
        if (type == TYPES.GRADES) {
            setPlusMinusVisible(true);
        } else {
            setPlusMinusVisible(false);
        }
    }, [type, TYPES]);

    function reset() {
        setGrades([]);
        setAverage(0);
        setNewGrade('');
    }

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

    function addGrade(e: any) {
        e.preventDefault();
        const field = e.target.children[0].children[0];
        field.focus();

        if (type == TYPES.PERCENT && newGrade.endsWith('%') && isInteger(newGrade.slice(0, -1))) {
            //@ts-ignore
            setGrades((grades: any) => [...grades, { id: uuidv4(), value: newGrade.slice(0, -1) }]);
            setNewGrade("");
            return;
        }

        if (!newGrade || !isInteger(newGrade) || Number(newGrade) < 0) {
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

        if (type == TYPES.GRADES && (Number(newGrade) < minGrade || Number(newGrade) > maxGrade)) {
            toast({
                position: 'top',
                variant: 'solid',
                title: 'Błąd',
                description: `Podaj ocenę od ${minGrade} do ${maxGrade}`,
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
            return;
        } else if (type == TYPES.PERCENT && (Number(newGrade) < minPercentGrade || Number(newGrade) > maxPercentGrade)) {
            toast({
                position: 'top',
                variant: 'solid',
                title: 'Błąd',
                description: `Podaj ocenę od ${minPercentGrade} do ${maxPercentGrade}`,
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
            return;
        }

        //@ts-ignore
        setGrades((grades: any) => [...grades, { id: uuidv4(), value: newGrade }]);
        setNewGrade("");
    };

    const deleteGrade = (index: any) => {
        setGrades((grades) => grades.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const sum = grades.map(({ value }) => value).reduce((a, b) => +a + +b, 0)
        setAverage(sum / grades.length);
        setVisible(grades.length >= 1 ? true : false);
    }, [grades]);


    //colors 
    const bgHoverTypes = useColorModeValue("rgba(0,0,0,0.2)", "rgba(255,255,255,0.2)")
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

    React.useEffect(() => {
        if (type == TYPES.GRADES) {
            document.title = average ? average.toFixed(2) + " | Zdaje.com" : "Zwykła | Zdaje.com";
        } else {
            document.title = average ? average.toFixed(2) + "% | Zdaje.com" : "Zwykła | Zdaje.com";
        }
    }, [TYPES.GRADES, average, type])

    const handleMinusChange = (minusValue: any) => setMinusValue(minusValue)
    const handlePlusChange = (plusValue: any) => setPlusValue(plusValue)
    const handleMaxGradeChange = (maxGrade: any) => setMaxGrade(maxGrade)
    const handleMinGradeChange = (minGrade: any) => setMinGrade(minGrade)
    const handleMaxPercentGradeChange = (maxPercentGrade: any) => setMaxPercentGrade(maxPercentGrade)
    const handleMinPercentGradeChange = (minPercentGrade: any) => setMinPercentGrade(minPercentGrade)

    //card wrap
    const wrapW = ['100%', 'calc(40% - 20px)', 'calc(40% - 48px)'];


    const formatMaxPercentGrade = (maxPercentGrade: number) => maxPercentGrade + `%`
    const formatMinPercentGrade = (minPercentGrade: number) => minPercentGrade + `%`

    return (
        <Flex
            mx={[2, 2, 'auto']} flexDir={'column'} maxW='1600px'>
            <Flex flexDir={'row'} mb={2} justifyContent={'space-between'}>
                <Flex ml={5} flexDir={'row'} w='auto' border={'2px solid'} borderColor='brand.100' rounded={'lg'} fontWeight='extrabold' p={1}>
                    <Button h='25px' onClick={() => setType(TYPES.GRADES)} cursor={'pointer'} _hover={type == TYPES.PERCENT ? { bg: bgHoverTypes } : { bg: '' }}
                        px={'2.5'} py={0.7} rounded='md' bg={type == TYPES.GRADES ? 'rgba(143, 79, 211,0.4)' : ''}
                    >
                        oceny
                    </Button>
                    <Button h='25px' onClick={() => setType(TYPES.PERCENT)} _hover={type == TYPES.GRADES ? { bg: bgHoverTypes } : { bg: '' }}
                        ml={1} cursor={'pointer'} px={'2.5'} py={0.7} rounded='md' bg={type == TYPES.PERCENT ? 'rgba(143, 79, 211,0.4)' : ''}>
                        procenty
                    </Button>
                </Flex>

                <Flex alignItems={'center'}>
                    <Button px='0'
                        //@ts-ignore
                        onClick={() => setSettingsScreenVisible(!isSettingsScreenVisible)} mr={2} h='25px' transform="auto" _hover={{ bg: 'transparent', rotate: '45deg' }} _focus={'none'} _active='none' bg='transparent' >
                        <SettingsIcon w='100%' h='25px' />
                    </Button>
                </Flex>
            </Flex>

            {isSettingsScreenVisible &&
                <ChakraBox layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1 } }}>
                    <Divider mb={5} mt={3} />
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
                    <Divider mt={5} />
                </ChakraBox>
            }

            <Box maxW={'1200px'} w='100%' mx='auto'>
                <AnimateSharedLayout>
                    <Flex as={motion.div} layout flexDir={'column'} border='0px solid' rounded={'sm'} p={[2, 2, 4]}>
                        <AnimatePresence exitBeforeEnter={false}>

                            {isPlusMinusVisible ?
                                <ChakraBox flexDir={'row'} layout
                                    exit={{ opacity: 0, transition: { duration: .15 } }} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { type: 'tween' } }}>
                                    <Heading layout as={motion.h1} fontSize={'3xl'} fontWeight='extrabold'>Jak dodać ocenę z ' + ' lub ' - ' ?</Heading>
                                    <Text as={motion.p} layout color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")} alignItems={'center'} fontWeight={'500'}>
                                        Aby dodać ocenę cząstkową (czyli taką,
                                        która zawiera - lub +), wystarczy wpisać swoją ocenę w pole, a kalkulator sam przeliczy + lub - na
                                        podane obok wartości tych cząteczek. Pamiętaj, by dopasować wartość + i - (klikając ikonę ustawień) do takiej liczby, jaka używa twoja szkoła - przeważnie jest to
                                        -0.25 dla minusa i 0.50 dla plusa. </Text>
                                </ChakraBox>
                                :
                                <ChakraBox flexDir={'row'} layout
                                    exit={{ opacity: 0, transition: { duration: .15 } }} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { type: 'tween' } }}>
                                    <Heading layout as={motion.h1} fontSize={'3xl'} fontWeight='extrabold'>Jak dodać oceny procentowe?</Heading>
                                    <Box>
                                        <Text as={motion.p} layout color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")} alignItems={'center'} fontWeight={'500'}>
                                            W pole do wpisywania ocen należy wpisać swoją ocenę. Można wpiać ocenę z % na końcu, albo bez - wszystko należy od własnych preferencji.
                                        </Text>
                                    </Box>
                                </ChakraBox>
                            }
                        </AnimatePresence>


                    </Flex>


                    <Wrap mt={5} spacing={[5, 5, 12]} justify='center' as={motion.ul} layout>


                        <WrapItem w={wrapW} rounded={'md'} border='0px solid' borderColor={'brand.100'}
                            as={motion.li} layout flexDir={'column'} p={5}
                            alignItems='center' justifyContent={'center'}>
                            <Text>
                                {grades.map((g: any, i: any) => {
                                    return (
                                        <>
                                            <Tooltip key={g.id} hasArrow label={"usuń: " + g.value}>
                                                <Box borderTop={'2px solid'} borderColor={colors.at(g.value)} as={motion.span} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.1 } }}
                                                    whileHover={{ opacity: 0.8 }} onClick={() => deleteGrade(i)} cursor='pointer'
                                                    _after={type == TYPES.PERCENT ? { content: `'%'` } : { content: `''` }}
                                                >
                                                    {g.value}
                                                </Box>
                                            </Tooltip>
                                            <chakra.span as={motion.span} _last={{ display: 'none' }}>{", "} </chakra.span>
                                        </>
                                    );
                                })}
                            </Text>

                            <Form noValidate onSubmit={addGrade}>
                                <Flex as={motion.div} layout flexDir={'column'}>
                                    <FormLabel htmlFor='ocena' fontSize={'12px'} mb='0'>Dodaj ocenę: </FormLabel>
                                    <Flex flexDir={'row'} justifyContent='space-between'>
                                        <Input
                                            variant={'flushed'}
                                            w={['100%', '75%', '60%']}
                                            type={'text'}
                                            autoComplete='off'
                                            placeholder={type == TYPES.GRADES ? `${minGrade} - ${maxGrade}` : `${minPercentGrade} - ${maxPercentGrade}`}
                                            id='ocena'
                                            value={newGrade}
                                            onChange={(e: any) => {
                                                // + and - grades cuz people dont like to type eg 1.5 or 2.75 etc
                                                if (e.target.value == "1+") {
                                                    setNewGrade((1 + Number(plusValue)).toFixed(2));
                                                }
                                                else if (e.target.value == "2-") {
                                                    setNewGrade((2 - Number(minusValue)).toFixed(2));
                                                }
                                                else if (e.target.value == "2+") {
                                                    setNewGrade((2 + Number(plusValue)).toFixed(2));
                                                }
                                                else if (e.target.value == "3-") {
                                                    setNewGrade((3 - Number(minusValue)).toFixed(2));
                                                }
                                                else if (e.target.value == "3+") {
                                                    setNewGrade((3 + Number(plusValue)).toFixed(2));
                                                }
                                                else if (e.target.value == "4-") {
                                                    setNewGrade((4 - Number(minusValue)).toFixed(2));
                                                }
                                                else if (e.target.value == "4+") {
                                                    setNewGrade((4 + Number(plusValue)).toFixed(2));
                                                }
                                                else if (e.target.value == "5-") {
                                                    setNewGrade((5 - Number(minusValue)).toFixed(2));
                                                }
                                                else if (e.target.value == "5+") {
                                                    setNewGrade((5 + Number(plusValue)).toFixed(2));
                                                }
                                                else if (e.target.value == "6-") {
                                                    setNewGrade((6 - Number(minusValue)).toFixed(2));
                                                }
                                                else {
                                                    setNewGrade(e.target.value);
                                                }
                                            }}
                                        />
                                        <Button as={motion.button} whileTap={{ scale: 0.8, backgroundColor: 'transparent' }}
                                            _hover={{ bg: '' }} ml={'2'} type="submit" bg={'transparent'} fontWeight='normal'>Dodaj</Button>
                                    </Flex>
                                </Flex>
                            </Form>
                        </WrapItem>

                        <WrapItem w={wrapW} rounded={'md'} border='0px solid' borderColor={'brand.100'}
                            as={motion.li} layout flexDir={'column'} p={5}
                            alignItems='center' justifyContent={'center'}>
                            <ChakraHeading fontSize={'4xl'}>{average ? <>{type == TYPES.GRADES ? average.toFixed(2) : average.toFixed(2) + '%'}</> : <>---</>}</ChakraHeading>

                        </WrapItem>



                    </Wrap>

                </AnimateSharedLayout >
            </Box>

            <Phonebottom average={average} type={type} />
        </Flex >
    )
}

export default Index