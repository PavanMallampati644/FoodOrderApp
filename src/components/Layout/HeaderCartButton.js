import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const HeaderCartButton = (props) => {
  const totalNumberOfItems = useSelector((state) => state.cart.totalQuantity);

  const [btnIsHighLighted, setBtnIsHighLighted] = useState(true);

  useEffect(() => {
    // if (totalNumberOfItems === 0) {
    //   return;
    // }
    setBtnIsHighLighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [totalNumberOfItems]);

  const cartButton = `${classes.button} ${
    btnIsHighLighted ? classes.bump : ""
  }`;

  return (
    <button className={cartButton} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalNumberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
