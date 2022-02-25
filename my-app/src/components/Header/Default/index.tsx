import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Default = () => {
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
					<Button
						href="#"
						variant="outlined"
						sx={{ my: 1, mx: 1.5 }} >
						Login
					</Button>
				</Toolbar>
			</AppBar>
		</>
	)
};

export default Default;