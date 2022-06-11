/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import { Flex, Heading, chakra, useColorModeValue, FormLabel, Input, Button, useToast, Box, Tooltip, Text, HStack, useNumberInput } from '@chakra-ui/react';
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

    const minusBgButton = useColorModeValue('red.300', 'red.400')
    const plusBgButton = useColorModeValue('green.300', 'green.500')

    React.useEffect(() => {
        document.title = average ? average.toFixed(2) + " | Zdaje.com" : "Zwykła | Zdaje.com";
    }, [average])

    return (
        <Flex
            mx={[2, 2, 'auto']} flexDir={'column'} maxW='1600px'>
            <Flex flexDir={'row'} mb={2}>
                <Flex ml={5} flexDir={'row'} w='auto' border={'2px solid'} borderColor='brand.100' rounded={'lg'} fontWeight='extrabold' p={1}>
                    <Flex onClick={() => setType(TYPES.GRADES)} cursor={'pointer'} _hover={type == TYPES.PERCENT ? { bg: bgHoverTypes } : { bg: '' }}
                        px={'2.5'} py={0.7} rounded='md' bg={type == TYPES.GRADES ? 'rgba(143, 79, 211,0.4)' : ''}
                    >
                        oceny
                    </Flex>
                    <Flex onClick={() => setType(TYPES.PERCENT)} _hover={type == TYPES.GRADES ? { bg: bgHoverTypes } : { bg: '' }}
                        ml={1} cursor={'pointer'} px={'2.5'} py={0.7} rounded='md' bg={type == TYPES.PERCENT ? 'rgba(143, 79, 211,0.4)' : ''}>
                        procenty
                    </Flex>
                </Flex>
            </Flex>

            <AnimateSharedLayout>
                <Flex as={motion.div} layout flexDir={'column'} border='0px solid' rounded={'sm'} boxShadow='md' p={[2, 2, 4]}>
                    <Heading layout as={motion.h1} fontSize={'3xl'} fontWeight='extrabold'>Jak dodać ocenę z ' + ' lub ' - ' ?</Heading>
                    <AnimatePresence exitBeforeEnter={false}>
                        {isPlusMinusVisible &&
                            <ChakraBox flexDir={'row'} layout
                                exit={{ opacity: 0, transition: { duration: .15 } }} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { type: 'tween' } }}>
                                <Flex flexDir={'column'}>
                                    <Text>Wartość plusa: </Text>
                                    <HStack maxW='320px'>
                                        <Button bg={plusBgButton} onClick={() => setPlusValue(plusValue + 0.01)}>+</Button>
                                        <Input value={plusValue.toFixed(2)} />
                                        <Button bg={minusBgButton} onClick={() => setPlusValue(plusValue - 0.01)}>-</Button>
                                    </HStack>

                                    <Text>Wartość minusa: </Text>
                                    <HStack maxW='320px'>
                                        <Button bg={plusBgButton} onClick={() => setMinusValue(minusValue + 0.01)}>+</Button>
                                        <Input type={'number'} value={minusValue} onChange={(e: any) => { setMinusValue(e.target.value) }} />
                                        <Button bg={minusBgButton} onClick={() => setMinusValue(minusValue - 0.01)}>-</Button>
                                    </HStack>
                                </Flex>
                            </ChakraBox>
                        }
                    </AnimatePresence>

                </Flex>




                <Flex as={motion.div} layout flexDir={'column'}>
                    {average ? <>{type == TYPES.GRADES ? average.toFixed(2) : average.toFixed(0) + '%'}</> : <>---</>}
                    <Text>
                        {grades.map((g: any, i: any) => {
                            return (
                                <>
                                    <Tooltip key={g.id} hasArrow label={"usuń: " + g.value}>
                                        <Box borderTop={'2px solid'} borderColor={colors.at(g.value)} as={motion.span} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.1 } }}
                                            whileHover={{ opacity: 0.8 }} onClick={() => deleteGrade(i)} cursor='pointer'>
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
                            <Flex flexDir={'row'}>
                                <Input
                                    _focus={{ borderRadius: 'md', border: '2px solid', borderColor: 'pink.300' }}
                                    border={0} borderBottom='1px' rounded={'none'} borderColor={borderColor}
                                    autoComplete='off'
                                    autoFocus={false}
                                    placeholder='6'
                                    type={'text'}
                                    w={['100%', '75%', '40%']}
                                    id='ocena'
                                    value={newGrade}
                                    onChange={(e: any) => {
                                        // + and - grades cuz people dont like to type eg 1.5 or 2.75 etc
                                        if (e.target.value == "1+") {
                                            setNewGrade((1 + plusValue).toFixed(2));
                                        }
                                        else if (e.target.value == "2-") {
                                            setNewGrade((2 - minusValue).toFixed(2));
                                        }
                                        else if (e.target.value == "2+") {
                                            setNewGrade((2 + plusValue).toFixed(2));
                                        }
                                        else if (e.target.value == "3-") {
                                            setNewGrade((3 - minusValue).toFixed(2));
                                        }
                                        else if (e.target.value == "3+") {
                                            setNewGrade((3 + plusValue).toFixed(2));
                                        }
                                        else if (e.target.value == "4-") {
                                            setNewGrade((4 - minusValue).toFixed(2));
                                        }
                                        else if (e.target.value == "4+") {
                                            setNewGrade((4 + plusValue).toFixed(2));
                                        }
                                        else if (e.target.value == "5-") {
                                            setNewGrade((5 - minusValue).toFixed(2));
                                        }
                                        else if (e.target.value == "5+") {
                                            setNewGrade((5 + plusValue).toFixed(2));
                                        }
                                        else if (e.target.value == "6-") {
                                            setNewGrade((6 - minusValue).toFixed(2));
                                        }
                                        else {
                                            setNewGrade(e.target.value);
                                        }
                                    }}
                                />
                                <Button as={motion.button} whileTap={{ scale: 0.8, backgroundColor: 'transparent' }}
                                    _hover={{ bg: '' }} ml={'2'} type="submit" bg={'transparent'} fontWeight='normal'>Dodaj</Button>
                                <Button onClick={reset} as={motion.button} whileTap={{ scale: 0.8, backgroundColor: 'transparent' }}>reset</Button>
                            </Flex>
                        </Flex>
                    </Form>
                </Flex>
            </AnimateSharedLayout >

            <Phonebottom average={average} type={type} />
        </Flex >
    )
}

export default Index