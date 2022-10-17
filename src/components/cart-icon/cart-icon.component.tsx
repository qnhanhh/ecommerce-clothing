import { useSelector, useDispatch } from "react-redux";

import { setCartOpen } from "../../store/cart/cart.action";
import {
  selectCartCount,
  selectCartOpen,
} from "../../store/cart/cart.selector";
import { CartIconContainer, ItemCount, Icon } from "./cart-icon.styles";

const CartIcon = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleCartOpen = () => dispatch(setCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleCartOpen}>
      <Icon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
