import CheckoutForm from "../CheckoutForm";
import CartCard from "./cartCard";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./merch.css";

export default function Cart() {
  const { username } = useContext(UserContext);
  const [sum, setSum] = useState();
  const [cart, setCart] = useState([]);

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
      <h1 className="h1">Order Summary</h1>
      {cart.map((item) => (
        <div>
          <CartCard item={item} />
        </div>
      ))}
    </>
  );
}
