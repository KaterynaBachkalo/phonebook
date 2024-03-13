import { Avatar, Box, Container, Link, Typography } from '@mui/material';
import React from 'react';
import image from '../img/phonebook.png';
import { NavLink } from 'react-router-dom';
import { brandColor } from 'constants/constants';

const HomePage = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '100px 0',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Avatar
          src={image}
          alt="phonebook"
          variant="square"
          sx={{
            width: { xs: '250px', md: '400px' },
            height: { xs: '250px', md: '400px' },
          }}
        />
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            marginBottom="20px"
            color={brandColor}
            textTransform={'uppercase'}
            sx={{
              fontSize: { xs: '30px', md: '36px' },
            }}
          >
            Phone Book Application
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '24px', md: '30px' },
            }}
          >
            Here you can save, add and find you phone contacts.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '24px', md: '30px' },
            }}
          >
            <Link
              to="/register"
              component={NavLink}
              sx={{
                textDecoration: 'none',
                fontSize: { xs: '24px', md: '30px' },
              }}
            >
              Register
            </Link>{' '}
            or{' '}
            <Link
              to="/login"
              component={NavLink}
              sx={{
                textDecoration: 'none',
                fontSize: { xs: '24px', md: '30px' },
              }}
            >
              login
            </Link>{' '}
            to manage your contacts.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
