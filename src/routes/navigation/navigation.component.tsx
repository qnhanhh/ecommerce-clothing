import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { userSelector, userState } from "../../recoil/user/user.state";
import { cartSelector } from "../../recoil/cart/cart.state";
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles";
import { signOut } from "../../recoil/user/user.actions";

const Navigation = () => {
  const setState = useSetRecoilState(userState);
  const { currentUser } = useRecoilValue(userSelector);

  const { isCartOpen } = useRecoilValue(cartSelector);

  const signOutUser = async () => {
    try {
      await signOut();
      setState((prevState) => {
        return { ...prevState, currentUser: null };
      });
    } catch (error) {
      setState((prevState) => {
        return { ...prevState, error: error as Error };
      });
    }
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <Logo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
