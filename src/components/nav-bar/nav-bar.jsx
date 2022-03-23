import React, { useState, useContext } from 'react';
import { Switch, FormGroup, FormControlLabel, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledLink } from '../styled-link/styled-link';
import { DarkThemeContext } from '../../context/theme-context/theme-context';
import { useTranslation } from 'react-i18next';
import ChangeLang from '../../pages/home/components/lang-options/ChangeLang';
import { UserContext } from '../../context/user-context/user-context';
import { useNavigate } from 'react-router-dom';
import userAvatar from '../../assets/imgs/fat-poro.webp'

export default function NavBar() {
    const [t, i18n] = useTranslation("global");
    const darkM = t('header.dark-mode');
    let [isLogged, setIsLogged] = useContext(UserContext);
    const navigate = useNavigate();

    const pages = [t('header.search-player'), t('header.compare-players')];
    const settings = [t('header.avatar-profile'), t('header.avatar-account'), t('header.avatar-logout')];


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [darkMode, setDarkMode] = useContext(DarkThemeContext);

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    const handleThemeChange = () => setDarkMode(!darkMode);

    const handle = (e) => {
        e.preventDefault();
        console.log('hi');
        switch (e.target.textContent) {
            case (t('header.search-player')):
                navigate('/')
                break;
            case (t('header.compare-players')):
                navigate('/')
                break;
        }
    }

    const handleClicksInAvatarMenu = (e) => {
        e.preventDefault();
        switch (e.target.textContent) {
            case (t('header.avatar-profile')):
                navigate('/user')
                break;
            case (t('header.avatar-account')):
                navigate('/')
                break;
            case (t('header.avatar-logout')):
                localStorage.clear();
                setIsLogged(false);
                navigate('/')
                break;
        }
    }

    return (
        <AppBar color="primary" position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <StyledLink to={'/'}> <Typography
                        variant="h3"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'FactionOutline' }}
                    >
                        OH LOL
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
                                    <Typography onClick={handle} textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, fontFamily: 'FactionOutline' }}
                    >
                        OH LOL
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Typography onClick={handle}>{page}</Typography>
                            </Button>
                        ))}
                    </Box>




                    <Box sx={{ flexGrow: 0, display: { xs: '', md: 'flex' }, flexDirection: 'row-reverse' }}>
                        {localStorage.getItem('login-token') ? <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, gap: 1 }}>
                                <Avatar alt="Remy Sharp" src={userAvatar} />
                                <Typography color={'warning.main'}>Hi {localStorage.getItem('username')}</Typography>
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
                                    <Typography onClick={handleClicksInAvatarMenu} textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                        {localStorage.getItem('login-token') ? '' :
                            <Box display={'flex'} gap={2} alignItems={'center'} ml={3}>
                                <StyledLink to={'login'}><Typography border={`1px solid white`} p={.5} textAlign="center">{t('header.log-in')}</Typography></StyledLink>
                                <StyledLink to={'signup'}><Typography textAlign="center">{t('header.sign-up')}</Typography></StyledLink>
                            </Box>}
                        <Box display={'flex'} alignItems={'center'}>
                            <FormGroup >
                                <FormControlLabel onChange={handleThemeChange} control={<Switch color="warning" />} label={darkM} />
                            </FormGroup>
                        </Box>
                        <Box>
                            <ChangeLang></ChangeLang>

                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}



