import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./payment";

const KEY =
  "pk_test_51Kx5bsLVWbKyB57hDagpB3bT7emAKenFN4JxA60CHzigqOsrm9wSVLbM84fyrqissGmzkDHDSYrQCKUtwAZL25V4007xCRs2VX";

const stripePromise = loadStripe(KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default Stripe;
