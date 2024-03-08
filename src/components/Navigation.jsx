import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  SvgIcon,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { ReactComponent as IconPhone } from '../img/icon-phonebook.svg';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthAuthenticated, selectAuthUser } from 'redux/auth/selectors';
import { logOutThunk } from 'redux/auth/operations';
import { hoverFocusStyles, linkStylesNav } from 'constants/constants';

const Navigation = () => {
  const authenticated = useSelector(selectAuthAuthenticated);
  const dispatch = useDispatch();
  const location = useLocation();
  const userName = useSelector(selectAuthUser);

  //-------------

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  //------------

  const onLogOut = () => {
    dispatch(logOutThunk());
  };

  return (
    <AppBar position="fixed">
      <Container>
        <nav>
          <Toolbar
            sx={{
              flexWrap: 'wrap',
              padding: '12px 0',
            }}
          >
            <Link
              to="/"
              component={NavLink}
              onClick={e => {
                if (location.pathname === '/contacts') {
                  e.preventDefault(); // Забороняємо перехід
                }
              }}
            >
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <SvgIcon
                  component={IconPhone}
                  inheritViewBox
                  sx={{ width: '50px', height: '50px' }}
                />
                <Typography
                  variant="h1"
                  fontSize="30px"
                  marginLeft={2}
                  fontWeight={700}
                  color="#fff"
                  sx={{
                    textDecoration: 'none',
                    marginRight: { xs: '140px', md: '0' },

                    ...hoverFocusStyles,
                  }}
                >
                  Phonebook
                </Typography>
              </Stack>
            </Link>

            {!authenticated ? (
              <Stack
                direction="row"
                gap={3}
                marginLeft="auto"
                alignItems="center"
              >
                <Link
                  to="/register"
                  className={
                    location.pathname === '/register' ? 'active-link' : ''
                  }
                  component={NavLink}
                  sx={linkStylesNav}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className={
                    location.pathname === '/login' ? 'active-link' : ''
                  }
                  component={NavLink}
                  sx={linkStylesNav}
                >
                  Login
                </Link>
              </Stack>
            ) : (
              <>
                <Stack marginLeft="auto" alignItems="center">
                  <Link
                    to="/contacts"
                    component={NavLink}
                    sx={{
                      fontSize: '24px',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      color: '#fff',

                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '10px',

                      borderRadius: '10px',
                      border: '1px solid #fff',
                      // display: { xs: 'none', md: 'inline-flex' },
                      ...hoverFocusStyles,
                    }}
                  >
                    Contacts
                  </Link>
                </Stack>
                <Box
                  sx={{
                    marginLeft: 'auto',
                    alignItems: 'center',
                    display: 'flex',
                    gap: '24px',
                  }}
                >
                  <Typography
                    sx={{
                      color: 'rgb(255, 171, 64)',
                      fontSize: '24px',
                      fontWeight: '700',
                      display: { xs: 'none', md: 'flex' },
                    }}
                  >
                    {userName.name}
                  </Typography>
                  <Button
                    onClick={onLogOut}
                    color="inherit"
                    variant="outlined"
                    sx={{ display: { xs: 'none', md: 'flex' } }}
                  >
                    Log Out
                  </Button>
                </Box>
              </>
            )}

            {/* //---------------Menu----------------- */}

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'flex-end',
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon fontSize="40px" />
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
                {!authenticated ? (
                  <div>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link
                        to="/register"
                        className={
                          location.pathname === '/register' ? 'active-link' : ''
                        }
                        component={NavLink}
                        sx={{
                          textDecoration: 'none',
                        }}
                      >
                        Register
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Link
                        to="/login"
                        className={
                          location.pathname === '/login' ? 'active-link' : ''
                        }
                        component={NavLink}
                        sx={{
                          textDecoration: 'none',
                        }}
                      >
                        Login
                      </Link>
                    </MenuItem>
                  </div>
                ) : (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Button onClick={onLogOut} variant="text">
                      Log Out
                    </Button>
                  </MenuItem>
                )}
              </Menu>
            </Box>

            {/* //---------------Menu----------------- */}
          </Toolbar>
        </nav>
      </Container>
    </AppBar>
  );
};

export default Navigation;
