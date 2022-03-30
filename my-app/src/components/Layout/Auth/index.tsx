import { FC } from "react";
import { Outlet } from "react-router";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import Grid from '@mui/material/Grid';

const Auth: FC = () => {
    return (
        <>
            <GoogleReCaptchaProvider reCaptchaKey="*">
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <Outlet />
                </Grid>
            </GoogleReCaptchaProvider>
        </>
    );
}

export default Auth;
