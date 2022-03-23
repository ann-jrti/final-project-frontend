import { createContext } from "react";
import { createTheme } from '@mui/material';

export const DarkThemeContext = createContext({})

export const defaultTheme = createTheme({

    palette: {
        primary: {
            main: '#2b2d42',
        },
        secondary: {
            main: '#d90429',
        },
        error: {
            main: '#8d99ae',
        },
        warning: {
            main: '#ef233c', //e07a5f
        },
        info: {
            main: '#edf2f4',
        },
        success: {
            main: '#2e2e2e',
        }
    },
    typography: {
        fontFamily: 'Quicksand',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    }
})

export const darkTheme = createTheme({

    palette: {
        primary: {
            main: '#df1638'
        },
        secondary: {
            main: '#df1638'
        },
        error: {
            main: '#edf2f4'
        },
        warning: {
            main: '#edf2f4' // 779184
        },
        info: {
            main: '#8d99ae'
        },
        success: {
            main: '#2e2e2e'
        },
        text: {
            primary: 'rgb(233, 233, 233)',
            secondary: '#edf2f4',
            disabled: 'rgba(233, 233, 233, 0.7)'
        }
    },
    typography: {
        body1: {
            color: 'rgb(233, 233, 233)'
        },
        h1: {
            color: 'rgb(233, 233, 233)'
        },
        h2: {
            color: 'rgb(233, 233, 233)'
        },
        h3: {
            color: 'rgb(233, 233, 233)'
        },
        h4: {
            color: 'rgb(233, 233, 233)'
        },
        p: {
            color: 'rgb(233, 233, 233)'
        },
        fontFamily: 'Quicksand',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,

    },

})
