import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import VerticalTabs from './components/VerticalTabs'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1a746b',
    },
    secondary: {
      main: '#ffa726',
    },
  },
  status: {
    danger: 'orange',
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <div className="App">
      <NavBar />
      <VerticalTabs />
    </div>
    </MuiThemeProvider>
  );
}

export default App;
