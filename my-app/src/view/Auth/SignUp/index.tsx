import { FC, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import http from "../../../http_comon";

const SignUp: FC = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [error, setError] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!executeRecaptcha) {
            setError("Verification error Captcha");
            return;
        }
        const recaptchaToken = await executeRecaptcha();

        await http.post("api/auth/register", {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            reCaptchaToken: recaptchaToken
        });

        console.log({
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            reCaptchaToken: recaptchaToken
        });
    };

    return (
        <>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random/?hotel-building)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        {!!error &&
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {error}
                            </Alert>
                        }
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    autoFocus
                                    margin="normal"
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    autoFocus
                                    margin="normal"
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    autoComplete="family-name"
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            required
                            fullWidth
                            autoFocus
                            margin="normal"
                            id="email"
                            name="email"
                            label="Email Address"
                            autoComplete="email"
                        />
                        <TextField
                            required
                            fullWidth
                            autoFocus
                            margin="normal"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="new-password"
                        />
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary" />
                                }
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </>
    )
}

export default SignUp;
