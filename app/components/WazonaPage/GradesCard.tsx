import { Box, Button, Flex, Heading, Input, Text, Tooltip, useToast, WrapItem, chakra } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
    TYPES: any,
    grades: Array<object>,
    cardKey: string | number,
    onSubmit: (grade: number) => void,
    onDelete: (cardKey: string | number) => void,
    type: any,
    minGrade: number,
    maxGrade: number,
    minPercentGrade: number,
    maxPercentGrade: number,
    plusValue: number,
    minusValue: number,
    heading: string,
}


export default function GradesCard({ TYPES, grades, cardKey, onSubmit, onDelete, type,
    maxGrade, maxPercentGrade, minGrade, minPercentGrade, heading, minusValue, plusValue }: Props) {
    const wrapW = ['100%', 'calc(50% - 20px)', 'calc(50% - 48px)', 'calc(50% - 48px)', 'calc(33.333% - 48px)'];
    const key = cardKey || 0;
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

        if (type == TYPES.GRADES && (Number(value) < minGrade || Number(value) > maxGrade)) {
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
        } else if (type == TYPES.PERCENT && (Number(value) < minPercentGrade || Number(value) > maxPercentGrade)) {
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

        onSubmit(Number(value));
    }
    const colors = [
        '#718096',
        '#E53E3E',
        '#DD6B20',
        '#D69E2E',
        '#319795',
        '#38A169',
        '#D53F8C',
        '#805AD5',
        '#322659',
    ]

    const [gradePlaceholder, setGradePlaceholder] = useState(0);

    useEffect(() => {
        if (type == TYPES.GRADES) {
            setGradePlaceholder(Math.floor(Math.random() * 6 + 1));
        } else {
            setGradePlaceholder(Math.floor(Math.random() * 100));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [grades, type])

    const [cardAverage, setCardAverage] = useState(0);

    useEffect(() => {

        if (grades.length > 0) {
            grades.forEach((item: any) => {
                const sum = grades.reduce((acc: any, item: any) => acc + item.grade, 0);
                setCardAverage(sum / grades.length);
            })
        } else {
            setCardAverage(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [grades, grades.length])


    const bgContent = (grade: number) => {
        const gradePercent = (grade / 6 * 100);
        const color = (Math.floor(gradePercent / 20) + 1)
        return colors[color]
    }

    const bgContentPercent = (grade: number) => {
        const color = (Math.floor(grade / 20) + 1)
        return colors[color]
    }

    return (
        <WrapItem
            display={'block'} w={wrapW} as={motion.li} layout={'position'}
            border={'2px solid'}
            borderColor={cardAverage !== 0 ? type == TYPES.GRADES ?
                bgContent(cardAverage) : bgContentPercent(cardAverage)
                :
                'unset'
            }
            rounded={'lg'} p={5}
            shadow={
                cardAverage !== 0 ?
                    type == TYPES.GRADES ?
                        `0px 0px 5px 5px ${bgContent(cardAverage)}`
                        :
                        `0px 0px 5px 5px ${bgContentPercent(cardAverage)}`
                    :
                    'none'
            }

            justifyContent={'space-between'} alignItems='end'>
            <Heading mb={2} as={motion.h3} layout textShadow={'sm'}>
                {heading}
                <chakra.span noOfLines={1}>  {cardAverage.toFixed(2)}</chakra.span>
            </Heading>

            <Flex as={motion.div} minH='37.5px'>
                <Text fontSize={'25px'} as={motion.p} layout={'position'}>
                    {grades.map((item: any) => {
                        return (
                            <>
                                <Tooltip key={item.key} hasArrow label={"usuń: " + item.grade}>
                                    <Box borderTop='2px solid'
                                        borderColor={
                                            type == TYPES.GRADES ?
                                                colors.at(item.grade)
                                                :
                                                colors.at(item.grade / 100 * 6)
                                        } as={motion.span} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.1 } }}
                                        onClick={() => onDelete(item.key)} cursor='pointer'
                                        _after={type == TYPES.PERCENT ? { content: `'%'` } : { content: `''` }}>
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
                        placeholder={type == TYPES.GRADES ? gradePlaceholder.toString() : gradePlaceholder.toString() + '%'}
                        onChange={(e: any) => {
                            // + and - grades cuz people dont like to type eg 1.5 or 2.75 etc
                            if (e.target.value.includes('+')) {
                                e.target.value = e.target.value.replace('+', '');
                                e.target.value = (Number(e.target.value) + Number(plusValue)).toFixed(2);
                            } else if (e.target.value.includes('-')) {
                                e.target.value = e.target.value.replace('-', '');
                                e.target.value = (Number(e.target.value) - Number(minusValue)).toFixed(2);
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