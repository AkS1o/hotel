import { FC } from "react";
import { Outlet } from "react-router";

import Grid from '@mui/material/Grid';

const Auth: FC = () => {
    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Outlet />
            </Grid>
        </>
    );
}

export default Auth;
