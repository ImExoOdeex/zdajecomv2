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
            {children}
        </>
    )
}

export default Layout