import { useRef } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const dispatch = useDispatch();
  const { name, price, description, id } = props;

  const addToCartHandler = (event) => {
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmountNumber < 1 || enteredAmountNumber > 5) {
      return;
    }
    event.preventDefault();

    dispatch(
      cartActions.addItemToCart({
        price,
        description,
        id,
        name,
        quantity: enteredAmountNumber,
      })
    );
  };

  return (
    <form className={classes.form} onSubmit={addToCartHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
