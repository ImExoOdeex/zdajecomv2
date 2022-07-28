import { RepeatIcon } from '@chakra-ui/icons'
import { Button, Text, useColorModeValue } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

type Props = { reset: () => void, average: any }

function Reset({ reset, average }: Props) {

    const resetColor = useColorModeValue('green.600', 'green.400')
    const pathname = useLocation().pathname



    return (
        <AnimatePresence>
            {average && (
                <Button as={motion.button}
                    key={pathname}
                    initial={{ opacity: 0, x: 20 }}
                    exit={{ opacity: 0, transition: { type: 'spring', bounce: 0.02, duration: .3 } }}
                    animate={{ opacity: 1, x: 0, transition: { type: 'spring', bounce: 0.02, duration: .15 } }}
                    onClick={reset} mr={[1, 1, 5]} colorScheme='green' variant={'ghost'} h='30px'
                    bg={'none'} color={resetColor} _hover={{ bg: 'red.500', color: 'red.100' }}
                    _active={{ bg: 'red.500', color: 'white' }} role='group'>
                    <RepeatIcon _groupHover={{ rotate: '90deg', transition: 'transform .4s' }} transition={'transform .4s'}
                        _groupActive={{ rotate: '-360deg', transition: 'transform .4s' }} transform='auto' />
                    <Text ml={2}>
                        Resetuj
                    </Text>
                </Button>
            )}
        </AnimatePresence>
    )
}

export default Reset