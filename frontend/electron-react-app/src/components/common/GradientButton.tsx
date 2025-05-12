import React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

// A button that shows a blue-to-purple gradient on hover
const GradientButton = styled((props: ButtonProps) => <Button {...props} />)(({ theme }) => ({
  transition: theme.transitions.create(['background-image', 'box-shadow'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    backgroundImage: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
    color: theme.palette.common.white,
    boxShadow: theme.shadows[4],
  },
}));

export default GradientButton; 