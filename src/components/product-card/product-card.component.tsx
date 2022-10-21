import { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { CategoryItem } from "../../recoil/categories/categories.state";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";
import { cartState, cartSelector } from "../../recoil/cart/cart.state";
import { addCartItem } from "../../recoil/cart/cart.actions";

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { cartItems } = useRecoilValue(cartSelector);
  const { name, price, imageUrl } = product;
  const setCartItems = useSetRecoilState(cartState);

  const addProductToCart = () => {
    setCartItems((prevState) => {
      return { ...prevState, cartItems: addCartItem(cartItems, product) };
    });
  };

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`}></img>
      <Footer>
        <Name>{name}</Name>
        <Price>${price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
