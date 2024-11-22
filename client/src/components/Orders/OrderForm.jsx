// import React { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { setAccessToken } from "../../service/axiosConfig";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";

const OrderForm = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const dispatch = useDispatch();
    const formState = useSelector((state) => state.orders.formState);
    const {
        symbol,
        qty,
        notional,
        side,
        type,
        time_in_force,
        limit_price,
        stop_price,
        client_order_id,
        extended_hours,
        order_class,
        take_profit,
        stop_loss,
        trail_price,
        trail_percent
    } = formState;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(setFormField({ field: name, value }));
        console.log(name, value);

    };

    return (
        <Box>
            {/* symbol */}
            <FormControl fullWidth>
                <InputLabel htmlFor="symbol">Symbol</InputLabel>
                <OutlinedInput
                    id="symbol"
                    label="Symbol"
                    name="symbol"
                    value={symbol || ""}
                    onChange={handleInputChange}
                />
            </FormControl>

            {/* qty */}
            <FormControl fullWidth>
                <InputLabel htmlFor="qty">Quantity</InputLabel>
                <OutlinedInput
                    id="qty"
                    label="Quantity"
                    name="qty"
                    type="number"
                    value={qty || null}
                    onChange={handleInputChange}
                />
            </FormControl>
            {/* notional */}
            <FormControl fullWidth>
                <InputLabel htmlFor="notional">Dollar Amount</InputLabel>
                <OutlinedInput
                    id="notional"
                    label="Dollar Amount"
                    name="notional"
                    type="number"
                    value={notional || null}
                    onChange={handleInputChange}
                />
            </FormControl>
            {/* side */}
            <FormControl fullWidth>
                <InputLabel id="side">Buy/Sell</InputLabel>
                <Select
                    labelId="side"
                    id="side"
                    value={side || "buy"}
                    label="Buy/Sell"
                    onChange={handleInputChange}
                >
                    <MenuItem value={"buy"}>Buy</MenuItem>
                    <MenuItem value={"sell"}>Sell</MenuItem>
                </Select>
            </FormControl>
            {/* type */}
            <FormControl fullWidth>
                <InputLabel id="type">Order Type</InputLabel>
                <Select
                    labelId="type"
                    id="type"
                    value={type || "market"}
                    label="Order Type"
                    onChange={handleInputChange}
                >
                    <MenuItem value={"market"}>Market</MenuItem>
                    <MenuItem value={"limit"}>Limit</MenuItem>
                    <MenuItem value={"stop"}>Stop</MenuItem>
                    <MenuItem value={"stop_limit"}>Stop Limit</MenuItem>
                    <MenuItem value={"trailing_stop"}>Trailing Stop</MenuItem>
                </Select>
            </FormControl>
            {/* time_in_force */}
            <FormControl fullWidth>
                <InputLabel id="time_in_force">Time In Force</InputLabel>
                <Select
                    labelId="time_in_force"
                    id="time_in_force"
                    value={time_in_force || "day"}
                    label="Time In Force"
                    onChange={handleInputChange}
                >
                    <MenuItem value={"day"}>Day</MenuItem>
                    <MenuItem value={"gtc"}>GTC</MenuItem>
                    <MenuItem value={"opg"}>OPG</MenuItem>
                    <MenuItem value={"ioc"}>IOC</MenuItem>
                </Select>
            </FormControl>
            {/* limit_price */}
            <FormControl fullWidth>
                <InputLabel htmlFor="limit_price">Limit Price</InputLabel>
                <OutlinedInput
                    id="limit_price"
                    label="Limit Price"
                    name="limit_price"
                    type="number"
                    value={limit_price || null}
                    onChange={handleInputChange}
                />
            </FormControl>
            {/* stop_price */}
            <FormControl fullWidth>
                <InputLabel htmlFor="stop_price">Stop Price</InputLabel>
                <OutlinedInput
                    id="stop_price"
                    label="Stop Price"
                    name="stop_price"
                    type="number"
                    value={stop_price || null}
                    onChange={handleInputChange}
                />
            </FormControl>
            {/* client_order_id */}
            {/* extended_hours */}
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Extended Hours"
                    value={extended_hours}
                    onChange={handleInputChange}
                />
            </FormGroup>
            {/* order_class */}
            <FormControl fullWidth>
                <InputLabel id="order_class">Order Class</InputLabel>
                <Select
                    labelId="order_class"
                    id="order_class"
                    value={order_class || ""}
                    label="Order Class"
                    onChange={handleInputChange}
                >
                    <MenuItem value={"simple"}>Simple</MenuItem>
                    <MenuItem value={"oco"}>OCO</MenuItem>
                    <MenuItem value={"oto"}>OTO</MenuItem>
                    <MenuItem value={"bracket"}>Bracket</MenuItem>
                </Select>
            </FormControl>
            {/* take_profit */}
            {/* stop_loss */}
            {/* trail_price */}
            {/* trail_percent */}
        </Box>
    )
};

export default OrderForm;