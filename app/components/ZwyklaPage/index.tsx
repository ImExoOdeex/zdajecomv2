/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import { Flex, chakra, useColorModeValue, FormLabel, Input, Button, useToast, Box, Tooltip, Text, Wrap, WrapItem, useDisclosure, Heading } from '@chakra-ui/react';
import { motion, isValidMotionProp, LayoutGroup, AnimatePresence } from 'framer-motion';
import { Form, useActionData, useTransition } from '@remix-run/react';
import { v4 as uuidv4 } from "uuid";
import Phonebottom from '../Phonebottom';
import AveragesUpBox from '../averagesUpBox';
import SettingsScreen from '../SettingsScreen';
import SendAverage from '../SendAverage';
import AverageItem from '../AverageItem';

type Props = {}

const Index = (props: Props) => {

    const ChakraHeading = chakra(motion.h3, {
        shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
    });

    // setting screen props
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

    const toast = useToast()

    //percent or normal grades
    enum TYPES {
        GRADES,
        PERCENT
    }
    const [type, setType] = useState(TYPES.GRADES);

    useEffect(() => {
        const typeStorage = localStorage.getItem('type');
        if (typeStorage == "GRADES") {
            setType(TYPES.GRADES);
        } else if (typeStorage == "PERCENT") {
            setType(TYPES.PERCENT);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //average code
    const [grades, setGrades] = useState([]);
    const [average, setAverage] = useState(0);
    const [newGrade, setNewGrade] = useState('');
    const [isPlusMinusVisible, setPlusMinusVisible] = useState(true);

    useEffect(() => {
        if (type === TYPES.GRADES) {
            setPlusMinusVisible(true);
        } else {
            setPlusMinusVisible(false);
        }
    }, [type, TYPES])

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

    }, [grades]);

    //colors 
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

    useEffect(() => {
        if (type == TYPES.GRADES) {
            document.title = average ? average.toFixed(2) + " | Zdaje.com" : "Zwykła | Zdaje.com";
        } else {
            document.title = average ? average.toFixed(2) + "% | Zdaje.com" : "Zwykła | Zdaje.com";
        }
    }, [TYPES.GRADES, average, type])

    //card wrap
    const wrapW = ['100%', 'calc(40% - 20px)', 'calc(40% - 48px)'];

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { state } = useTransition();
    const errors = useActionData()

    const gradesColor = (grade: number) => {
        if (type == TYPES.GRADES) {
            const gradePercent = (grade / maxGrade * 100);
            const color = (Math.floor(gradePercent / 20) + 1)
            return colors[color]
        } else if (type == TYPES.PERCENT) {
            const gradePercent = grade / maxPercentGrade * 100;
            console.log(Math.floor(gradePercent / 20) + 1)
            return colors[Math.floor(gradePercent / 20) + 0.95]
        }
    }
    return (
        <Flex mx={[2, 2, 'auto']} flexDir={'column'} maxW='1600px'>

            <LayoutGroup>
                <SettingsScreen average={average} maxGrade={maxGrade} minGrade={minGrade} maxPercentGrade={maxPercentGrade}
                    minPercentGrade={minPercentGrade} minusValue={minusValue} plusValue={plusValue}
                    setMaxGrade={setMaxGrade} setMinGrade={setMinGrade} setMaxPercentGrade={setMaxPercentGrade}
                    setMinPercentGrade={setMinPercentGrade} setMinusValue={setMinusValue} setPlusValue={setPlusValue}
                    reset={reset} TYPES={TYPES} type={type} setType={setType}
                    handleMaxGradeChange={handleMaxGradeChange} handleMaxPercentGradeChange={handleMaxPercentGradeChange}
                    handleMinGradeChange={handleMinGradeChange} handleMinPercentGradeChange={handleMinPercentGradeChange}
                    handleMinusChange={handleMinusChange} handlePlusChange={handlePlusChange}
                    // @ts-ignore
                    isWeightsVisible={null} onSubmit={null}
                />

                <Box maxW={'1200px'} w='100%' mx='auto'>

                    <AveragesUpBox isPlusMinusVisible={isPlusMinusVisible} />

                    <Wrap mt={5} spacing={[5, 10, 15]} justify='center' as={motion.ul} layout>

                        <WrapItem w={wrapW} rounded={'md'} border='0px solid' borderColor={'brand.100'}
                            as={motion.li} layout flexDir={'column'} p={5}
                            alignItems='center' justifyContent={'center'}>
                            <Text as={motion.p} layout mb={2} fontSize='xs'>Aby usunąć ocenę po prostu na nią kliknij.</Text>
                            <Text mb={1} fontSize='2xl' as={motion.p} layout='position'>
                                {grades.map((g: any, i: any) => {
                                    return (
                                        <>
                                            <Tooltip key={g.id} hasArrow label={"usuń: " + g.value}>
                                                <Box borderTop={'2px solid'} borderColor={gradesColor(g.value)} as={motion.span} initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1, transition: { duration: 0.1 } }}
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
                                                if (e.target.value.includes('+')) {
                                                    setNewGrade(e.target.value.replace('+', ''));
                                                    setNewGrade((Number(newGrade) + Number(plusValue)).toFixed(2));
                                                } else if (e.target.value.includes('-')) {
                                                    setNewGrade(e.target.value.replace('-', ''));
                                                    setNewGrade((Number(newGrade) - Number(minusValue)).toFixed(2));
                                                } else {
                                                    setNewGrade(e.target.value);
                                                }
                                                if (e.target.value.includes(',')) {
                                                    setNewGrade(e.target.value.replace(',', '.'));
                                                }
                                            }}
                                        />
                                        <Button as={motion.button} whileTap={{ scale: 0.8, backgroundColor: 'transparent' }}
                                            _hover={{ bg: '' }} ml={'2'} type="submit" bg={'transparent'} fontWeight='normal'>Dodaj</Button>
                                    </Flex>
                                </Flex>
                            </Form>
                        </WrapItem>

                        <AverageItem TYPES={TYPES} average={average} onOpen={onOpen} type={type} wrapW={wrapW} />

                    </Wrap>
                </Box >
            </LayoutGroup>

            <SendAverage TYPES={TYPES} average={average} errors={errors}
                isOpen={isOpen} onClose={onClose} state={state} type={type} weighted={false} />

            <Phonebottom average={average} type={type} />
        </Flex >
    )
}

export default Index