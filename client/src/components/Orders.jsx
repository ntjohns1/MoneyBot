import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import Container from "@mui/material/Container";
import OrderForm from "./Orders/OrderForm";

const Orders = () => {
    const { authState, oktaAuth } = useOktaAuth();

    if (!authState) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <OrderForm />
        </Container>
    );
}
export default Orders;