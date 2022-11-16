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

  let promptEvent: BeforeInstallPromptEvent | null;

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      alert("prompt");
      e.preventDefault();
      promptEvent = e as BeforeInstallPromptEvent;
    });
  }, []);

  const handleClick = () => {
    if (promptEvent) {
      promptEvent.prompt();
      promptEvent.userChoice.then((res) => {
        if (res.outcome === "accepted") {
          console.log("a2hs");
          promptEvent = null;
        } else {
          console.log("no a2hs");
        }
      });
    } else {
      alert("manually add to screen");
    }
  };

  return (
    <>
      <h1 id="test" onClick={handleClick}>
        Add to screen
      </h1>
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
