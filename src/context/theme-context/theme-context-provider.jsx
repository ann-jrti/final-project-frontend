import { useState } from "react";
import { DarkThemeContext, darkTheme, defaultTheme } from "./theme-context";
import { ThemeProvider } from '@mui/material';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => (props.isDark ? '#383a4d' : '#rgb(241, 241, 241)')};
  },
`

export default function ThemeApp({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DarkThemeContext.Provider value={[darkMode, setDarkMode]}>
      <GlobalStyle isDark={darkMode} />
      <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
        {children}
      </ThemeProvider>
    </DarkThemeContext.Provider>
  )

}
