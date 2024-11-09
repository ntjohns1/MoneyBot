import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../service/axiosConfig";
import Typography from "@mui/material/Typography";
import { fetchAccountInfo } from "./accountSlice";

const Equity = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const dispatch = useDispatch();
    const accountInfo = useSelector((state) => state.account.accountInfo);

    useEffect(() => {
        if (!accountInfo && authState.isAuthenticated) {
            const accessToken = oktaAuth.getAccessToken();
            setAccessToken(accessToken);
            dispatch(fetchAccountInfo());
        }
    }, [accountInfo]);

    return (
        <Typography>
            ${accountInfo?.equity}
        </Typography>
    );
};

export default Equity;