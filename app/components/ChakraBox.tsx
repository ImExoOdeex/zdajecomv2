import { chakra } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: isValidMotionProp
});

export default ChakraBox;