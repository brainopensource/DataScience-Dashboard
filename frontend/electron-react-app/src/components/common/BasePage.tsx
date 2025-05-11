import React from 'react';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface BasePageProps {
  title: string;
}

const BasePage: React.FC<BasePageProps> = ({ title }) => {
  const theme = useTheme();

  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3)
    }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          color: theme.palette.primary.main,
          marginBottom: theme.spacing(3)
        }}
      >
        {title}
      </Typography>
    </div>
  );
};

export default BasePage; 