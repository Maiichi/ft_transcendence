import { createTheme } from '@mui/material/styles';
import { purple as appHUE } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

const theme = createTheme({
  palette: {
    primary: appHUE || {
      light: '#e1bee7' || appHUE[100],
      main: '#ce93d8',
      dark: '#4c0c9b',
      contrastText: '#fff',
    },
    secondary: appHUE || {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


const useStyles = makeStyles({
    root: {
      background: `linear-gradient(45deg, ${theme.palette.secondary.light} 30%, ${theme.palette.secondary.main} 90%)`,
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
  });
  
export {theme, appHUE as appColor, useStyles}
