import { RepeatIcon } from '@chakra-ui/icons'
import { Button, Text, useColorModeValue } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = { grades: Array<number>, reset: () => void }

function Reset({ grades, reset }: Props) {

    useEffect(() => {
        if (grades.length !== 0) {
            setIsResetVisible(true)
        } else {
            setIsResetVisible(false)
        }
    }, [grades])

    const [isResetVisible, setIsResetVisible] = useState(false)
    const resetColor = useColorModeValue('green.600', 'green.400')

    return (
        <AnimatePresence>
            {isResetVisible && (
                <motion.div key={'key'} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { type: 'spring', bounce: 0.02, duration: .3 } }} exit={{ opacity: 0 }}>
                    <Button onClick={reset} mr={[1, 1, 5]} colorScheme='green' variant={'ghost'} h='30px'
                        bg={'none'} color={resetColor} _hover={{ bg: 'red.500', color: 'red.100' }}
                        _active={{ bg: 'red.500', color: 'white' }} role='group'
                    >
                        <RepeatIcon _groupActive={{ rotate: '-360deg', transition: '.4s' }} transform='auto' />
                        {/* <RepeatClockIcon _groupActive={{ rotate: '-360deg', transition: '.4s' }} transform='auto' /> */}
                        <Text ml={2}>
                            Resetuj
                        </Text>
                    </Button>
                </motion.div>
            )
            }
        </AnimatePresence>
    )
}

export default Reset