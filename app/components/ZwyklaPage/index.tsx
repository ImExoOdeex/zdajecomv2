/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { Flex, Heading, chakra, useColorModeValue, FormLabel, Input, Button, useToast, Box, Tooltip, Text, HStack, useNumberInput, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Wrap, WrapItem } from '@chakra-ui/react';
import { motion, isValidMotionProp, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import { Form } from '@remix-run/react';
import { v4 as uuidv4 } from "uuid";
import Phonebottom from '../Phonebottom';
import { typeCookie } from './../Cookies';

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
    const [plusValue, setPlusValue] = useState(0.50);
    const [minusValue, setMinusValue] = useState(0.25);

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

        if (type == TYPES.GRADES && (Number(newGrade) < 1 || Number(newGrade) > 6)) {
            toast({
                position: 'top',
                variant: 'solid',
                title: 'Błąd',
                description: "Podaj ocenę od 1 do 6",
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
            return;
        } else if (type == TYPES.PERCENT && (Number(newGrade) < 0 || Number(newGrade) > 100)) {
            toast({
                position: 'top',
                variant: 'solid',
                title: 'Błąd',
                description: "Podaj ocenę od 0 do 100",
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
    const borderColor = useColorModeValue('rgba(255,255,255, 0.1)', 'rgba(0,0,0, 0.1)');
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

    //card wrap
    const wrapW = ['100%', 'calc(40% - 20px)', 'calc(40% - 48px)'];

    function WrapCustomItem({ children, ...props }: any) {
        return (
            <WrapItem w={wrapW} rounded={'md'} border='0px solid' borderColor={'brand.100'}
                as={motion.li} layout flexDir={'column'} p={5}
                alignItems='center' justifyContent={'center'} {...props}>
                {children}
            </WrapItem>
        )
    }

    return (
        <Flex
            mx={[2, 2, 'auto']} flexDir={'column'} maxW='1600px'>
            <Flex flexDir={'row'} mb={2}>
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
            </Flex>

            <Box maxW={'1200px'} w='100%' mx='auto'>
                <AnimateSharedLayout>
                    <Flex as={motion.div} layout flexDir={'column'} border='0px solid' rounded={'sm'} p={[2, 2, 4]}>
                        <AnimatePresence exitBeforeEnter={false}>

                            {isPlusMinusVisible &&
                                <ChakraBox flexDir={'row'} layout
                                    exit={{ opacity: 0, transition: { duration: .15 } }} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { type: 'tween' } }}>
                                    <Heading layout as={motion.h1} fontSize={'3xl'} fontWeight='extrabold'>Jak dodać ocenę z ' + ' lub ' - ' ?</Heading>
                                    <Flex mt={4} alignItems='center' flexDir={{ base: 'column', lg: 'row' }} justifyContent='space-between'>
                                        <ChakraBox w={{ base: '100%', lg: '40%' }} layout flexDir={'column'}>
                                            <Text>Wartość plusa: </Text>
                                            <NumberInput maxW='400px' w='100%' mr='2rem' step={0.01} value={plusValue} onChange={handlePlusChange}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>

                                            <Text>Wartość minusa: </Text>
                                            <NumberInput maxW='400px' w='100%' mr='2rem' step={0.01} value={minusValue} onChange={handleMinusChange}>
                                                <NumberInputField />
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper />
                                                    <NumberDecrementStepper />
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </ChakraBox>

                                        <Box mt={{ base: 5, lg: 0 }} textAlign={'left'} w={{ base: '', lg: '60%' }} justifyContent='center' alignItems={'center'}>
                                            <Text
                                                color={useColorModeValue("blackAlpha.800", "whiteAlpha.800")} alignItems={'center'} fontWeight={'500'}>Aby dodać ocenę cząstkową (czyli taką,
                                                która zawiera - lub +), wystarczy wpisać swoją ocenę w pole, a kalkulator sam przeliczy + lub - na
                                                podane obok wartości tych cząteczek. Pamiętaj, by dopasować wartość + i - do takiej liczby, jaka używa twoja szkoła - przeważnie jest to
                                                -0.25 dla minusa i 0.50 dla plusa. </Text>
                                        </Box>

                                    </Flex>
                                </ChakraBox>
                            }
                        </AnimatePresence>

                        <AnimatePresence>
                            {!isPlusMinusVisible &&
                                <ChakraBox flexDir={'row'} layout
                                    exit={{ opacity: 0, transition: { duration: .15 } }} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { type: 'tween' } }}>
                                    <Heading layout as={motion.h1} fontSize={'3xl'} fontWeight='extrabold'>kto wymyślił oceny procentowe w szkole?</Heading>
                                </ChakraBox>
                            }
                        </AnimatePresence>


                    </Flex>


                    <Wrap mt={5} spacing={[5, 5, 12]} justify='center' as={motion.ul} layout>


                        <WrapItem w={wrapW} rounded={'md'} border='0px solid' borderColor={'brand.100'}
                            as={motion.li} layout flexDir={'column'} p={5}
                            alignItems='center' justifyContent={'center'}>
                            {average ? <>{type == TYPES.GRADES ? average.toFixed(2) : average.toFixed(2) + '%'}</> : <>---</>}
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
                                            _focus={{ borderRadius: 'md', border: '2px solid', borderColor: 'pink.300' }}
                                            border={0} borderBottom='1px' rounded={'none'} borderColor={borderColor}
                                            w={['100%', '75%', '60%']}
                                            type={'text'}
                                            autoComplete='off'
                                            placeholder='6'
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