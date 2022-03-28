import { FC } from "react";
import { Outlet } from "react-router";

import Header from "../../Header/Default"

const Default: FC = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default Default;
