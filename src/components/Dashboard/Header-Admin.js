import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Name from '../../Layout/Name';
import { Link } from 'react-router-dom';


function Header() {
  const linkStyle = {
    textDecoration: 'none', // Prevents the default underline
    color: 'inherit', // Keeps the default text color
  };

  const appBarStyle = {
    backgroundColor: '#363535',
    marginTop: '0px', // Add margin to the top of the AppBar
  };

  const buttonStyle = {
    fontWeight: 'bold', // Makes the button text bold
    transition: 'background-color 0.3s ease', // Smooth background-color transition for hover effect
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly changes the background color on hover
    },
    margin: '8px 16px', // Adjusted spacing around buttons
    // If you need to increase the size of the buttons
    padding: '6px 16px', // Optional: Increases the padding inside the buttons for a larger hit area
  };

  return (
    <AppBar position="static" sx={appBarStyle}>
      <Toolbar sx={{ justifyContent: 'center' }}> {/* Center content horizontally */}
        <Box display="flex" alignItems="center">
          <Link to="/home-emp" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginLeft: '190px' }}>
            <img src="data:image/png;base64,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" />
            <Typography
              variant="h6"
              sx={{
                marginLeft: 5,
                color: '#FFFFFF',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                transition: 'color 0.3s ease',
              }}
            >
               <Name/>
            </Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
  
}

export default Header;
