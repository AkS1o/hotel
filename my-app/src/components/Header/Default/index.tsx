import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material";

const Default = () => {
    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Company name
                    </Typography>
                    <nav>
                        <Link variant="button" color="text.primary" href="/" underline="none" sx={{ my: 1, mx: 1.5 }}>
                            Home
                        </Link>
                    </nav>
                    <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    )
};

export default Default;