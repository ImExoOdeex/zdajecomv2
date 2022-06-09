import { Flex, Heading, Box, chakra } from '@chakra-ui/react';
import Layout from './../components/Layout';
import { motion, isValidMotionProp } from 'framer-motion';

export default function Index() {
  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
  });
  return (
    <Layout>
      <ChakraBox
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        mx={'auto'} flexDir={'column'} maxW='1600px'>
        <Flex flexDir={'row'} w={'100%'} justify={'space-between'}>
          <Box>
            <Heading textTransform={'uppercase'}>Oblicz swoją średnią</Heading>
          </Box>
          <Box>
            <Heading>druga strona</Heading>
          </Box>
        </Flex>
      </ChakraBox>
    </Layout>
  );
}
