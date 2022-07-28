import React, { } from 'react'
import Header from './Header'
import { motion } from 'framer-motion';
import Footer from './Footer';
import CookieConstent from './CookieConstent';
import { useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

interface LayoutProps {
    children: React.ReactNode,
    slug: string
}

const Layout: React.FC<LayoutProps> = ({ children, slug }) => {
    const location = useLocation()


    return (
        <>
            <Box pos={'sticky'} top={0} zIndex={1}>
                <CookieConstent />
                <Header slug={slug} />
            </Box>
            <motion.div style={{ minHeight: 'calc(100vh - 115px)', marginBottom: '50px' }}
                initial={!location.pathname.includes(`/srednie/`) && !location.pathname.includes(`/srednia`) ? { y: -20, opacity: 0 } : {}}
                animate={{ y: 0, opacity: 1, transition: { type: 'tween', duration: .3 } }}
                exit={!location.pathname.includes(`/srednie/`) && !location.pathname.includes(`/srednia`) ? { y: 20, opacity: 0, transition: { duration: .15 } } : {}}
            >
                {children}
            </motion.div>
            <Footer />
        </>
    )
}

export default Layout