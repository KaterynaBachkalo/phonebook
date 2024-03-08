import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { brandColor, formStyles } from 'constants/constants';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logInThunk } from 'redux/auth/operations';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(logInThunk(data));
    reset();
  };

  return (
    <Box
      sx={{
        padding: '120px 15px',
      }}
    >
      <Box component="form" sx={formStyles} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          required
          id="standard-email-input"
          label="Email"
          type="email"
          autoComplete="current-email"
          variant="standard"
          {...register('email')}
        />
        {errors.email?.type === 'required' && <p>This field is required</p>}

        <TextField
          required
          id="standard-password-input"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          autoComplete="current-password"
          variant="standard"
          {...register('password', {
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <Button
          type="submit"
          sx={{
            color: `${brandColor}`,
            fontSize: '20px',
            fontWeight: '700',
          }}
        >
          Sign In
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          If you don't have account, register{' '}
          <Link
            to="/register"
            component={NavLink}
            sx={{
              textDecoration: 'none',
            }}
          >
            here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
