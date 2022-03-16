import { createContext } from "react";
import { createTheme } from '@mui/material';

export const DarkThemeContext = createContext({})

export const defaultTheme = createTheme({

    palette: {
        primary: {
            main: '#3d405b',
        },
        secondary: {
            main: '#81b29a',
        },
        error: {
            main: '#a8dadc',
        },
        warning: {
            main: '#e07a5f',
        },
        info: {
            main: '#cfcdbe',
        },
        success: {
            main: '#f2cc8f',
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
            main: '#bd8778'
        },
        secondary: {
            main: '#bd8778'
        },
        error: {
            main: '#3d405b'
        },
        warning: {
            main: '#779184'
        },
        info: {
            main: '#3d405b'
        },
        success: {
            main: '#8a8989'
        },
        text: {
            primary: 'rgb(233, 233, 233)',
            secondary: 'rgba(233, 233, 233, 0.8)',
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
