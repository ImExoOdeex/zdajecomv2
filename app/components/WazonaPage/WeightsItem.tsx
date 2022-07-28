import { CheckIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";

type Props = {
    isWeightsVisible: boolean, onSubmit: (weights: any) => void
}

function WeightsItem({ isWeightsVisible, onSubmit }: Props) {
    function handleWeightsSubmit(event: any) {
        event.preventDefault();
        const input = event.target.children[0].children[0];
        const value = input.value;
        input.value = '';
        input.focus();
        let weights = value.split(',');
        weights = weights.map((weight: any) => weight.trim());
        weights = weights.filter((weight: any) => weight && !isNaN(weight));
        weights = weights.map((weight: any) => Number(weight));
        if (weights.length === 0) {
            toast({
                position: 'top',
                variant: 'solid',
                title: 'Błąd',
                description: "Podaj poprawne wagi",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
            return;
        }
        onSubmit(weights);
    }
    const toast = useToast()

    return (
        <Box as={motion.div} >
            {!isWeightsVisible ? (
                <Flex flexDir={'column'} mx='auto'>
                    <Box as={motion.div} mx={'auto'}>
                        <Box mt={5} mb={5}>
                            <Text>Zanim obliczysz swoją średnią ważoną musisz najrpiew dodać swoje wagi, które są używane w twojej szkole.</Text>
                            <form onSubmit={handleWeightsSubmit} noValidate>
                                <Flex mt={2} flexDir={['column', 'row']} as={motion.div} >
                                    <Input variant={'flushed'} minW='250px' as={motion.input} w={['100%', '75%', '30%']} type="text" name="weights" placeholder="1, 2, 3, 4, 5..." autoComplete="off" />
                                    <Button color={'white'} _hover={{ bg: 'brand.100' }} _active={{}} ml={[0, 5]} mt={[2, 0]} mx={['15%', '']}
                                        as={motion.button} type="submit" fontWeight='semibold' rounded={'md'} bg='brand.900'
                                    >Zatwierdź <CheckIcon ml={2} /> </Button>
                                </Flex>
                            </form>
                        </Box>
                    </Box>
                </Flex>
            ) : (
                <Flex flexDir={'column'} mx='auto'>
                    <Box as={motion.div} mx={'auto'}>
                        <Box mt={5} mb={5}>
                            <Text>Zmiana wag:</Text>
                            <form onSubmit={handleWeightsSubmit} noValidate>
                                <Flex flexDir={'row'} as={motion.div}>
                                    <Input variant={'flushed'} minW='250px' as={motion.input} w={['100%', '75%', '30%']} type="text" name="weights" placeholder="1, 2, 3, 4, 5..." autoComplete="off" />
                                    <Button as={motion.button} type="submit" ml={5} fontWeight='normal' rounded={'md'} bg='transparent' _hover={{ bg: 'rgba(246, 135, 179,0.75)' }}>Zatwierdź</Button>
                                </Flex>
                            </form>
                        </Box>
                    </Box>
                </Flex>
            )
            }
        </Box >
    )
}

export default WeightsItem;