import React, { useState, useContext } from 'react';
import { Switch, FormGroup, FormControlLabel, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledLink } from '../styled-link/styled-link';
import { DarkThemeContext } from '../../context/theme-context/theme-context';
import { useTranslation } from 'react-i18next';
import ChangeLang from '../../pages/home/components/lang-options/ChangeLang';
import { TokenContext } from '../../context/token-context/token-context';
import { UserContext } from '../../context/user-context/user-context';

export default function NavBar() {
    const [t, i18n] = useTranslation("global");
    const darkM = t('header.dark-mode');
    const [userToken, setToken] = useContext(TokenContext);
    const loginToken = localStorage.getItem('login-token');
    let [isLogged, setIsLogged] = useContext(UserContext);
    // console.log(isLogged);
    // const [isLogged, setIsLogged] = useState(false);


    const pages = [t('header.search-player'), t('header.compare-players')];
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [darkMode, setDarkMode] = useContext(DarkThemeContext);

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);


    const handleThemeChange = () => {
        setDarkMode(!darkMode)
    }

    return (
        <AppBar color="primary" position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <StyledLink to={'/'}> <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        FINAL-PROJECT
                    </Typography>
                    </StyledLink>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {isLogged ? <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip> : ''}

                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                        {isLogged ? '' : <><StyledLink to={'login'}><Typography textAlign="center">{t('header.log-in')}</Typography></StyledLink>
                            <StyledLink to={'signup'}><Typography textAlign="center">{t('header.sign-up')}</Typography></StyledLink></>}

                        <FormGroup >
                            <FormControlLabel onChange={handleThemeChange} control={<Switch color="warning" />} label={darkM} />
                        </FormGroup>
                        <ChangeLang></ChangeLang>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}



