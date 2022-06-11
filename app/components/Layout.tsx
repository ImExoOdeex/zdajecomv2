import React from 'react'
import Header from './Header'
import { motion } from 'framer-motion';
import Footer from './Footer';
import CookieConstent from './CookieConstent';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <motion.div style={{ minHeight: 'calc(100vh - 115px)' }}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { type: 'tween', duration: .15 } }}
                exit={{ y: 30, opacity: 0, transition: { duration: .15 } }}>
                {children}
            </motion.div>
            <Footer />
            {/* <CookieConstent /> */}
        </>
    )
}

export default Layout