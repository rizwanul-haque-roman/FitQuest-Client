import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const CheckoutForm = ({ paymentInfo, setSuccess }) => {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  //TODO: have to use axiosSecure
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await axiosPublic.post("/create-payment-intent", {
        price: paymentInfo.price,
      });
      setClientSecret(res.data.clientSecret);
    };

    if (paymentInfo.price) {
      fetchClientSecret();
    }
  }, [paymentInfo.price, axiosPublic]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
    } else {
      console.log(paymentMethod);
    }

    // confirm payment
    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: paymentInfo?.memberEmail || "anonymous",
            name: paymentInfo?.memberName || "anonymous",
          },
        },
      });

    if (paymentError) {
      console.log(paymentError);
      Swal.fire({
        title: "Error!",
        text: `Your payment is unsuccessfull! ${paymentError.message}`,
        icon: "error",
      });
    } else {
      console.log(paymentIntent);
      axiosPublic
        .post("/payments", { ...paymentInfo, trxnId: paymentIntent.id })
        .then((res) => console.log(res.data));

      setSuccess(true);
      Swal.fire({
        title: "Success!",
        text: "Your payment is successfull!",
        icon: "success",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "24px",
              color: "#A6ADBB",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn w-full bg-clr-main text-xl mt-6"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Confirm Payment
      </button>
    </form>
  );
};

CheckoutForm.propTypes = {
  paymentInfo: PropTypes.object,
  setSuccess: PropTypes.func,
};

export default CheckoutForm;
