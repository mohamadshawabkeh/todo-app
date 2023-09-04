import React, { useState } from 'react';
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

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Settings', path: '/settings' },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open mobile menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                >
                  {page.name}
                </MenuItem>
              ))}
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
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', borderRadius: '4px', padding: '4px' }}>
            <TextField
              label="Username"
              variant="outlined"
              size="small"
              sx={{ mr: 1 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              sx={{ mr: 1 }}
            />
            <Button variant="contained" color="primary">
              Login
            </Button> */}
          {/* </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
