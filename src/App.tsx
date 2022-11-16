import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { userState } from "./recoil/user/user.state";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { isUserAuthenticated } from "./recoil/user/user.actions";
import { UserData } from "./utils/firebase/firebase.utils";

const App = () => {
  const setState = useSetRecoilState(userState);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userAuth = await isUserAuthenticated();
        setState((prevState) => {
          return { ...prevState, currentUser: userAuth as UserData };
        });
      } catch (error) {
        alert(error);
      }
    };
    checkUserSession();
  }, [setState]);

  let promptEvent: BeforeInstallPromptEvent;

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault()
      promptEvent = e as BeforeInstallPromptEvent;
    });
  }, []);

  const handleClick = () => {
    promptEvent.prompt()
    promptEvent.userChoice.then(res=>{
      if(res.outcome==='accepted'){
        console.log('a2hs');
      }else{
        console.log('no a2hs');
      }
    })
  };

  return (
    <>
      <h1 onClick={handleClick}>Add to screen</h1>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
