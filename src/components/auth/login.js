import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  TextField,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LoginContext } from '../../context/auth/context';
import { When } from 'react-if';
import ToDo from '../todo/todo';
import './login.scss';


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loggedIn, user, login, logout } = useContext(LoginContext);

  function handleChange(e) {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Check if both username and password are filled
    if (username && password) {
      login(username, password);
    } else {
      // Display an error message or prevent form submission
      console.error('Username and password are required');
    }
  }
  

  function handleSignUpClick() {
    navigate('/signup');
  }
  // function handleGet() {
  //   navigate('/api/tasks/v');
  // }
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="open mobile menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem component={Link} to="/">
                  Home
                </MenuItem>
                <MenuItem component={Link} to="/settings">
                  Settings
                </MenuItem>
              </Menu>
            </Box>

            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              TODO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button component={Link} to="/" sx={{ my: 2, color: 'white', display: 'block' }}>
                Home
              </Button>
              <Button component={Link} to="/settings" sx={{ my: 2, color: 'white', display: 'block' }}>
                Settings
              </Button>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: '4px',
                padding: '4px',
              }}
            >
              <When condition={loggedIn}>
                {/* <span className="welcome-text">Welcome, {user.name}</span> */}
                <button onClick={logout}>Log Out</button>
              </When>

              <When condition={!loggedIn}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    size="small"
                    name="username"
                    onChange={handleChange}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    name="password"
                    onChange={handleChange}
                  />
                  <button  >Login</button>
                  <button onClick={handleSignUpClick}>Sign Up</button>
                </form>
              </When>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <When condition={loggedIn}>
        <ToDo />
      </When>
    </>
  );
}

export default Login;
