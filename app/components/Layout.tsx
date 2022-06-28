import React from 'react'
import Header from './Header'
import { motion } from 'framer-motion';
import Footer from './Footer';
import CookieConstent from './CookieConstent';
import { Box } from '@chakra-ui/react';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <motion.div style={{ minHeight: 'calc(100vh - 115px)', marginBottom: '50px' }}
            // initial={{ y: -20, opacity: 0 }}
            // animate={{ y: 0, opacity: 1, transition: { type: 'tween', duration: .3 } }}
            // exit={{ y: 20, opacity: 0, transition: { duration: .15 } }}
            >
                {/* <Box minH={'calc(100vh- 115px)'}> */}
                {children}
                {/* </Box> */}
            </motion.div>
            <Footer />
            <CookieConstent />
        </>
    )
}

export default Layout