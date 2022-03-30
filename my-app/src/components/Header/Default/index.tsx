import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { IUser } from '../../../view/Auth/type';

const Default = () => {
	const [token, setToken] = useState<string>(localStorage.token);
	const [username, setUsername] = useState<string>("");
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const isMenuOpen = Boolean(anchorEl);

	useEffect(() => {
		if (token) {
			AuthUser(token);
		}
	}, [])

	const AuthUser = async (token: string) => {
		const user = await jwt.decode(token as string) as IUser;
		setUsername(user.username);
	}

	const logout = () => {
		localStorage.removeItem('token');
		handleMenuClose();
	}

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const menuId = 'account-menu';
	const renderMenu = (
		<Menu
			sx={{ mt: '24px' }}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose} >
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem
				sx={{
					textTransform: 'capitalize'
				}}
				component={Button}
				href="/"
				onClick={logout}>
				Logout
			</MenuItem>
		</Menu>
	);

	return (
		<>
			<AppBar
				position="static"
				color="default"
				elevation={0}
				sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }} >
				<Toolbar
					sx={{ flexWrap: 'wrap' }} >
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						sx={{ flexGrow: 1 }} >
						<Link
							href="/"
							underline="none" >
							Company name
						</Link>
					</Typography>
					<nav>
						<Link
							color="inherit"
							underline="none"
							href="/users"
							sx={{ my: 1, mx: 1.5 }} >
							Users
						</Link>
						<Link
							color="inherit"
							underline="none"
							href="/photo"
							sx={{ my: 1, mx: 1.5 }} >
							Photo
						</Link>
						<Link
							color="inherit"
							underline="none"
							href="/hotel"
							sx={{ my: 1, mx: 1.5 }} >
							Hotel
						</Link>
					</nav>
					{token ? (

						<Box>
							{username}
							<IconButton
								size="large"
								edge="end"
								aria-label="account of current user"
								aria-controls={menuId}
								aria-haspopup="true"
								onClick={handleProfileMenuOpen}
								color="inherit"
								sx={{ p: 0 }}
							>
								<AccountCircle />
							</IconButton>
						</Box>
					) : (
						<>
							<Button
								href="/login"
								variant="outlined"
								sx={{ my: 1, mx: 1.5 }} >
								Login
							</Button>
							<Button
								href="/sign-up"
								variant="contained"
								sx={{ my: 1, mx: 1.5 }} >
								Sign Up
							</Button>
						</>
					)}
				</Toolbar>
			</AppBar>
			{renderMenu}
		</>
	)
};

export default Default;