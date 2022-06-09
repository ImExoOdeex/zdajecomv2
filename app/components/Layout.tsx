import React from 'react'
import Header from './Header'
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0, transition: { duration: .15 } }}>
                {children}
            </motion.div>
        </>
    )
}

export default Layout