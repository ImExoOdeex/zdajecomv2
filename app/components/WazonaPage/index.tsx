/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'
import { Flex, chakra, Box, Wrap, useDisclosure } from '@chakra-ui/react';
import { motion, isValidMotionProp, LayoutGroup } from 'framer-motion';
import { useActionData, useTransition } from '@remix-run/react';
import Phonebottom from '../Phonebottom';
import AveragesUpBox from '../averagesUpBox';
import SettingsScreen from '../SettingsScreen';
import SendAverage from '../SendAverage';
import AverageItem from '../AverageItem';
import GradesCard from './GradesCard';
import { getCookie } from '~/utils/CookiesFunc';


//percent or normal grades
enum TYPES {
    GRADES,
    PERCENT
}

function useSavedWeights() {
    if (typeof document === 'undefined') return [null, null];
    const cookiesName = 'weights';
    const [weights, setWeights] = useState();
    const cookies = document.cookie
    console.log(cookies)

    useEffect(() => {
        if (cookies.includes(cookiesName)) {
            // @ts-ignore
            setWeights(getCookie(cookiesName).split(',').map((weight: number | string) => Number(weight)));
        }
    }, [cookies]);

    function setNewWeights(newWeigths: any) {
        if (newWeigths) {
            document.cookie = `${cookiesName}=${newWeigths.join(",")}`
        }
        setWeights(newWeigths);
    }
    console.log(weights)

    return [weights, setNewWeights];
}

function Index() {

    const [type, setType] = useState(TYPES.GRADES);

    useEffect(() => {
        if (type === TYPES.GRADES) {
            setPlusMinusVisible(true);
        } else {
            setPlusMinusVisible(false);
        }
    }, [type])

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

    const [grades, setGrades] = useState([]);
    const [gradeKey, setGradeKey] = useState(0);
    const [weights, setWeights] = useSavedWeights();
    const [average, setAverage] = useState(0);

    const [isWeightsVisible, setIsWeightsVisible] = useState(true);

    useEffect(() => {
        if (!weights) return;
        let newGrades = {};
        weights.forEach((weight: any) => newGrades[weight] = [])
        setGrades(newGrades);
    }, [weights]);

    useEffect(() => {
        setIsWeightsVisible(!weights ? false : true);
    }, [average, weights])

    useEffect(() => {
        let numerator = 0;
        let denominator = 0;

        for (let i: number = 0; i < Object.keys(grades).length; i++) {
            if (weights) {
                const weight = weights[i];
                const weightGrades = grades[weight];
                if (!weightGrades) continue;
                const sum = weightGrades.reduce((acc: any, item: any) => acc + item.grade, 0);
                numerator += sum * weight;
                denominator += weightGrades.length * weight;
            }
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

    function handleWeightsSubmit(weights: any) {
        if (weights != null || weights != undefined) {
            setWeights(weights);
        }
    }

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
        let newGrades = {};
        weights.forEach((weight) => newGrades[weight] = [])
        setGrades(newGrades);
        setAverage(0);
    }

    return (
        <>
            <Flex mx={[2, 2, 'auto']} h='auto' flexDir={'column'} mb={20} maxW='1600px'>
                <LayoutGroup id='weighted'>
                    <SettingsScreen average={average} maxGrade={maxGrade} minGrade={minGrade} maxPercentGrade={maxPercentGrade}
                        minPercentGrade={minPercentGrade} minusValue={minusValue} plusValue={plusValue}
                        setMaxGrade={setMaxGrade} setMinGrade={setMinGrade} setMaxPercentGrade={setMaxPercentGrade}
                        setMinPercentGrade={setMinPercentGrade} setMinusValue={setMinusValue} setPlusValue={setPlusValue}
                        reset={reset} TYPES={TYPES} type={type} setType={setType}
                        handleMaxGradeChange={handleMaxGradeChange} handleMaxPercentGradeChange={handleMaxPercentGradeChange}
                        handleMinGradeChange={handleMinGradeChange} handleMinPercentGradeChange={handleMinPercentGradeChange}
                        handleMinusChange={handleMinusChange} handlePlusChange={handlePlusChange} isWeightsVisible={isWeightsVisible}
                        onSubmit={handleWeightsSubmit} weights={weights}
                    />

                    <Box maxW={'1200px'} w='100%' mx='auto'>
                        <AveragesUpBox isPlusMinusVisible={isPlusMinusVisible} />
                    </Box>

                    <AverageItem onOpen={onOpen} TYPES={TYPES} average={average} type={type} wrapW={'unset'} />

                    <SendAverage TYPES={TYPES} average={average} errors={errors}
                        isOpen={isOpen} onClose={onClose} state={state} type={type} weighted={true} />

                    <Wrap mx={'auto'} minW='100%' maxW='1200px' spacing={[5, 5, 12]}>

                        {Object.keys(grades).map((weight: any) =>
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