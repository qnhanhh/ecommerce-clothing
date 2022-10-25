import { useRecoilValue, useSetRecoilState } from "recoil";

import { cartSelector, cartState } from "../../recoil/cart/cart.state";
import { CartIconContainer, ItemCount, Icon } from "./cart-icon.styles";

const CartIcon = () => {
  const setCartOpen = useSetRecoilState(cartState);
  const { cartCount } = useRecoilValue(cartSelector);

  const toggleCartOpen = () =>
    setCartOpen((prevState) => {
      return { ...prevState, isCartOpen: !prevState.isCartOpen };
    });

  return (
    <CartIconContainer onClick={toggleCartOpen}>
      <Icon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
