/* eslint-disable @typescript-eslint/consistent-type-imports */
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'
import { Dict } from '@chakra-ui/utils'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const styles = {
    global: (props: StyleFunctionProps | Dict<any>) => ({
        body: {
            minH: '100vh',
            bg: mode('bg.100', 'bg.900')(props)
        }
    })
}

const colors = {
    brand: {
        100: '#8F4FD3',
        900: '#8F4FD3',
    },
    sec: {
        500: '#FF00FF',
    },
    bg: {
        100: '#F7F7F7',
        900: '#101011',
    }
}
const theme = extendTheme({
    colors, config, styles,

    fonts: {
        body: `"Poppins", sans-serif`,
        heading: `"Montserrat", sans-serif`,
    }

})

export default theme