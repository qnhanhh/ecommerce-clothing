import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartIconContainer, ItemCount, Icon } from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  return (
    <CartIconContainer onClick={() => setIsCartOpen(!isCartOpen)}>
      <Icon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
