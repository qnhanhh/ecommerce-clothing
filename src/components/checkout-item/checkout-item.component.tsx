import { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { cartState, cartSelector } from "../../recoil/cart/cart.state";
import {
  Arrow,
  CheckoutItemContainer,
  Detail,
  DetailFlex,
  ImageContainer,
  RemoveButton,
  Value,
} from "./checkout-item.styles";
import { CartItem } from "../../recoil/cart/cart.state";
import {
  addCartItem,
  clearCartItem,
  removeCartItem,
} from "../../recoil/cart/cart.actions";

type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
  const { cartItems } = useRecoilValue(cartSelector);
  const setCartItems = useSetRecoilState(cartState);

  const clearItemHandler = () =>
    setCartItems((prevState) => {
      return { ...prevState, cartItems: clearCartItem(cartItems, cartItem) };
    });

  const addItemHandler = () =>
    setCartItems((prevState) => {
      return { ...prevState, cartItems: addCartItem(cartItems, cartItem) };
    });
  const removeItemHandler = () =>
    setCartItems((prevState) => {
      return { ...prevState, cartItems: removeCartItem(cartItems, cartItem) };
    });

  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`}></img>
      </ImageContainer>
      <Detail>{name}</Detail>
      <DetailFlex>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </DetailFlex>
      <Detail>{price}</Detail>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
