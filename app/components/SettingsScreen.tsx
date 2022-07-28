import { SettingsIcon } from '@chakra-ui/icons';
import { Button, chakra, Collapse, Divider, Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useColorModeValue, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react'
import { isValidMotionProp, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Reset from './reset';
import WeightsItem from './WazonaPage/WeightsItem';

type Props = {
    reset: any, TYPES: any, type: any, setType: any, plusValue: number, minusValue: number,
    maxGrade: number, minGrade: number, maxPercentGrade: number, minPercentGrade: number,
    setMinusValue: any, setPlusValue: any, setMaxGrade: any, setMinGrade: any, setMaxPercentGrade: any,
    setMinPercentGrade: any,
    handleMinusChange: any, handlePlusChange: any, handleMaxGradeChange: any, handleMinGradeChange: any, handleMaxPercentGradeChange: any,
    handleMinPercentGradeChange: any, average: any, isWeightsVisible: boolean, onSubmit: (weights: any) => void,
    weights: any
}

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

function SettingsScreen({ reset, average, TYPES, type, setType, plusValue, minusValue, maxGrade, minGrade,
    maxPercentGrade, minPercentGrade,
    handleMinusChange, handlePlusChange, handleMaxGradeChange, handleMinGradeChange, handleMaxPercentGradeChange,
    handleMinPercentGradeChange, isWeightsVisible, onSubmit, weights
}: Props) {

    const bgHoverTypes = useColorModeValue("rgba(0,0,0,0.2)", "rgba(255,255,255,0.2)")

    const { isOpen, onToggle } = useDisclosure()

    const formatMaxPercentGrade = (maxPercentGrade: number) => maxPercentGrade + `%`
    const formatMinPercentGrade = (minPercentGrade: number) => minPercentGrade + `%`

    function handleTypeChangeGrades() {
        setType(TYPES.GRADES);
        localStorage.setItem('type', "GRADES");
    }

    function handleTypeChangePercent() {
        setType(TYPES.PERCENT);
        localStorage.setItem('type', "PERCENT");
    }
    const location = useLocation()

    useEffect(() => {
        if ((weights === null || weights === undefined) && location.pathname == "/wazona") {
            onToggle()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Flex flexDir={'row'} my={2} justifyContent={'space-between'}>
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
                    <Reset average={average} reset={reset} />
                    <Button px='0'
                        onClick={onToggle} mr={2} h='25px' transform="auto" _hover={{ bg: 'transparent' }}
                        rotate={isOpen ? '90deg' : '0deg'}
                        _focus={{ bg: '' }} _active={{ bg: '' }} bg='transparent' >
                        <SettingsIcon w='100%' h='25px' />
                    </Button>
                </Flex>
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <ChakraBox layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: .1 } }}>
                    {/* <Divider mb={5} mt={3} /> */}

                    {((weights != null && location.pathname == '/wazona') || (location.pathname == "/zwykla")) &&
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
                    }

                    {isWeightsVisible !== null &&
                        <WeightsItem isWeightsVisible={isWeightsVisible} onSubmit={onSubmit} />
                    }

                    {/* <Divider mt={5} /> */}
                </ChakraBox>
            </Collapse>
        </>
    )
}

export default SettingsScreen