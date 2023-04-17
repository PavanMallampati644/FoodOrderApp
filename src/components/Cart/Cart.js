import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useState } from "react";
import { cartActions } from "../../store/index";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const cartDocuments = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const dispatch = useDispatch();

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartDocuments.map((item) => (
        <CartItem
          id={item.id}
          key={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
          description={item.description}
        />
      ))}
    </ul>
  );

  const checkoutFromHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch(
      "https://food-zone-15b12-default-rtdb.firebaseio.com//orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartDocuments,
        }),
      }
    );
    setIsSubmitting(false);
    setSubmitted(true);
    dispatch(cartActions.clearCart());
  };
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !submitted && (
        <>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{`₹${totalPrice.toFixed(2)}`}</span>
          </div>
          {cartDocuments.length > 0 && isCheckout && (
            <Checkout onClose={props.onClose} onConfirm={submitOrderHandler} />
          )}
          {!isCheckout && (
            <div className={classes.actions}>
              <button
                className={classes["button--alt"]}
                onClick={props.onClose}
              >
                Close
              </button>
              {cartDocuments.length > 0 && (
                <button
                  className={classes.button}
                  onClick={checkoutFromHandler}
                >
                  Order
                </button>
              )}
            </div>
          )}
        </>
      )}

      {isSubmitting && <p>Sending order data...</p>}
      {!isSubmitting && submitted && (
        <>
          <p>Successfully sent the order!</p>
          <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>
              Close
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;
