import { CheckCircleIcon } from '@chakra-ui/icons'
import { Box, Center, useColorModeValue } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
    successVisible: boolean,
    success: boolean,
    setSuccessVisible: any
}

function Success({ success, successVisible, setSuccessVisible }: Props) {
    return (
        <AnimatePresence>
            {(successVisible && success) &&
                <motion.div
                    exit={{ height: 0, transition: { ease: 'easeInOut' } }}
                    style={{ overflow: 'hidden', display: 'block' }}
                >
                    <Center display={'flex'} h='auto'
                        fontWeight={'extrabold'} fontSize={{ base: 'xl', md: '3xl' }} px={2}
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        alignItems='center' py={3} color={useColorModeValue("green.500", "green.400")} bg={'rgba(56, 161, 105,.2)'}
                    >
                        <CheckCircleIcon ml={[2, 2, 0]} mr={5} />
                        <Box onAnimationEnd={(e: any) => {
                            e.target.style.width = 0
                            setSuccessVisible(false)
                        }}
                            animation='ease unload 5s' width={'100%'} h='10px' opacity={.5} bg={'green.500'}
                            pos='absolute' zIndex={'-1'} alignSelf='start' mt={'-12px'} />
                        Twoja średnia została pomyślnie dodana do bazy!
                    </Center>
                </motion.div>
            }
        </AnimatePresence>
    )
}

export default Success