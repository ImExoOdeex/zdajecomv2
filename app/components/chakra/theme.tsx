/* eslint-disable @typescript-eslint/consistent-type-imports */
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'
import { Dict } from '@chakra-ui/utils'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: true,
}

const styles = {
    global: (props: StyleFunctionProps | Dict<any>) => ({
        body: {
            minH: '100vh',
            bg: mode('bg.100', 'bg.900')(props)
        },
        th: {
            color: mode("#393942cc!important", "#dedef1be!important")(props),
        }
    })
}

const colors = {
    brand: {
        100: '#a263e6',
        900: '#8F4FD3',
    },
    sec: {
        500: '#FF00FF',
    },
    bg: {
        100: '#ffffff',
        900: '#18181a',
    }
}
const theme = extendTheme({
    colors, config, styles,
    fonts: {
        body: `"Poppins", sans-serif`,
        heading: `"Montserrat", sans-serif`,
    },
})

export default theme