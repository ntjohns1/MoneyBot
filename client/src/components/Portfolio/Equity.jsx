import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../service/axiosConfig";
import Typography from "@mui/material/Typography";
import { fetchAccountInfo } from "./accountSlice";
import { useEffect } from "react";

const Equity = () => {

    return (
        <Typography>
            $10000
        </Typography>
    )
};