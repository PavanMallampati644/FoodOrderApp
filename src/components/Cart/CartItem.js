import { useDispatch } from "react-redux";
import { cartActions } from "../../store";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const { id, name, price, description } = props;

  const dispatch = useDispatch();

  const removeCartHandler = () => {
    dispatch(cartActions.removeItemfromCart(props.id));
  };
  const addCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        price,
        description,
        id,
        name,
        quantity: 1,
      })
    );
  };
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <h5>{props.description}</h5>
        <div className={classes.summary}>
          <span className={classes.price}>{`₹${props.price}`}</span>
          <span className={classes.amount}>x {props.quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeCartHandler}>-</button>
        <button onClick={addCartHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
