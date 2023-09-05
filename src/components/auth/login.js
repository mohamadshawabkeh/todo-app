import React from 'react';
import { Link } from 'react-router-dom';
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
import "./login.scss"

class Login extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.login(this.state.username, this.state.password);
  };

  render() {
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
                // onClick={/* Add an onClick handler to open the mobile menu */}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                // anchorEl={/* Add anchorEl for the mobile menu */}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                // open={/* Add a condition to handle mobile menu open/close */}
                // onClose={/* Add an onClose handler for the mobile menu */}
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
              <When condition={this.context.loggedIn}>
              <span class="welcome-text">Welcome, {this.context.user.name}</span>
                <button onClick={this.context.logout}>Log Out</button>
              </When>

              <When condition={!this.context.loggedIn}>
                
                <form onSubmit={this.handleSubmit}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    size="small"
                    name="username"
                    onChange={this.handleChange}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    name="password"
                    onChange={this.handleChange}
                  />
                  <button>Login</button>
                </form>
              </When>
              
            </Box>
          </Toolbar>
        </Container>
       
      </AppBar>
      <When condition={this.context.loggedIn}>
               <ToDo/>
              </When>
      </>
    );
  }
}

export default Login;
