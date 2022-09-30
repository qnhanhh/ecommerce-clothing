import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./cart-icon.styles.jsx";
import { CartContainer, ItemCount, Icon } from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  return (
    <CartContainer onClick={() => setIsCartOpen(!isCartOpen)}>
      <Icon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartContainer>
  );
};

export default CartIcon;
