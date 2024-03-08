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
        }}
      >
        <Avatar
          src={image}
          alt="phonebook"
          variant="square"
          sx={{
            width: '400px',
            height: '400px',
          }}
        />
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            fontSize="36px"
            marginBottom="20px"
            color={brandColor}
            textTransform={'uppercase'}
          >
            Phone Book Application
          </Typography>
          <Typography fontSize="30px">
            Here you can save, add and find you phone contacts.
          </Typography>
          <Typography fontSize="30px">
            <Link
              to="/register"
              component={NavLink}
              sx={{
                textDecoration: 'none',
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
