import { FormEvent, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";

import { userSelector } from "../../recoil/user/user.state";
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { cartSelector, cartState } from "../../recoil/cart/cart.state";

const ifValidCardElement = (
  card: StripeCardElement | null
): card is StripeCardElement => card !== null;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal } = useRecoilValue(cartSelector);
  const resetCart = useResetRecoilState(cartState);
  const { currentUser } = useRecoilValue(userSelector);
  const [isProcessingPayment, setProcessingPayment] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: cartTotal * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const cardDetails = elements.getElement(CardElement);

    if (!ifValidCardElement(cardDetails)) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });

    setProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else if (paymentResult.paymentIntent.status === "succeeded") {
      resetCart();
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
