import { Box, Heading, HStack, Spinner, Text, } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'

type Props = {
    average: number,
    percentAverage: number,
    type: any,
    typ: string,
}

function AverageOfAveragesCard({ average, percentAverage, type, typ }: Props) {

    const opacity = 1;

    const colors = [
        `rgba(113, 128, 150, ${opacity})`,
        `rgba(229, 62, 62, ${opacity})`,
        `rgba(221, 107, 32, ${opacity})`,
        `rgba(214, 158, 46, ${opacity})`,
        `rgba(49, 151, 149, ${opacity})`,
        `rgba(56, 161, 105, ${opacity})`,
        `rgba(213, 63, 140, ${opacity})`,
        `rgba(128, 90, 213, ${opacity})`,
        `rgba(50, 38, 89, ${opacity})`,
    ]

    const bgContent = (grade: number) => {
        const gradePercent = (grade / 6 * 100);
        const color = (Math.floor(gradePercent / 20) + 1)
        return colors[color]
    }

    const bgContentPercent = (grade: number) => {
        const color = (Math.floor(grade / 20) + 1)
        return colors[color]
    }

    const blur = '10px'
    const spread = '0px'

    return (
        <Box as={motion.div} mx={'auto'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: .2 } }}
            exit={{ opacity: 0 }}
            _last={{
                ml: !type.includes('procentowa') || (type.includes("zwykla") && type.includes('procentowa')) ?
                    { base: 'auto', md: 10 } : {},
                mt: !type.includes('procentowa') || (type.includes("zwykla") && type.includes('procentowa')) ?
                    { base: 5, md: 0 } : {}
            }}
            transition={'border 1s, box-shadow 1s'}
            border="2px solid" borderColor={typ == 'grades' ? bgContent(average) : bgContentPercent(percentAverage)}
            rounded='3xl' p={4}
            shadow={
                `inset 0px 0px ${blur} ${spread} ${typ == 'grades' ? bgContent(average) : bgContentPercent(percentAverage)},
                0px 0px ${blur} ${spread} ${typ == 'grades' ? bgContent(average) : bgContentPercent(percentAverage)}`
            }
        >
            <Heading fontSize={'lg'}>{typ == 'grades' ? "Ocenowa" : "Procentowa"}</Heading>
            <Text>średnia tego przedmiotu to:</Text>
            <Box mt={1}>
                <Heading fontSize={'6xl'} alignItems='center' justifyContent={'center'}>
                    {typ == "grades" ?
                        average ? average.toFixed(2) :
                            <HStack my='auto' h='72px' justifyContent={'center'} alignItems='center'>
                                <Spinner speed='.8s' />
                            </HStack>
                        :
                        percentAverage ? percentAverage == 100 ? percentAverage.toFixed(0) + "%" : percentAverage.toFixed(2) + "%" :
                            <HStack my='auto' h='72px' justifyContent={'center'} alignItems='center'>
                                <Spinner speed={'.8s'} />
                            </HStack>
                    }
                </Heading>
            </Box>

        </Box >
    )
}

export default AverageOfAveragesCard