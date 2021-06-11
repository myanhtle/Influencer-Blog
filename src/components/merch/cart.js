import CheckoutForm from "../CheckoutForm";
import CartCard from "./cartCard";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./merch.css";

export default function Cart() {
  const { username } = useContext(UserContext);
  const [sum, setSum] = useState();
  const [cart, setCart] = useState([]);
  const promise = loadStripe(
    "pk_test_51J0S9sK9Oa09hK7vKAkeRyWpAZsK3yPH2kSWGPDnJbHXPQkMU9XFG8el61jESoEA8RPtGUcrmay9Ls8WwJCX5Tot00ahHw3SpM"
  );

  console.log(username);

  const fetchSum = () => {
    fetch(`http://localhost:8080/cart/sum/${username}`)
      .then((res) => res.json())
      .then((data) => setSum(data));
  };

  useEffect(() => {
    fetchSum();
    fetch(`http://localhost:8080/cart/read/${username}`)
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, [username]);

  console.log(sum);

  console.log(cart);

  return (
    <>
      <h1 className="order-summary">Order Summary</h1>
      <div className="cartPage-container">
        <div className="cartCard-container">
          {cart.map((item) => (
            <div>
              <CartCard item={item} />
            </div>
          ))}
        </div>
        <div className="stripe-div">
          <h2 className="total-div">Total: ${sum.sum}</h2>
          <br />
          <br />
          <Elements stripe={promise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </>
  );
}
