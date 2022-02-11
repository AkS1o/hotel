import { FC } from "react";
import { Outlet } from "react-router";

import { CssBaseline, GlobalStyles } from "@mui/material";

import Header from "../../Header/Default"

const Default: FC = () => {
    return (
        <>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Header />
            <Outlet />
        </>
    );
}

export default Default;
