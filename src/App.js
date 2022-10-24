import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { userState } from './recoil/user/user.state'
import Navigation from './routes/navigation/navigation.component'
import Home from "./routes/home/home.component"
import Authentication from './routes/authentication/authentication.component'
import Shop from './routes/shop/shop.component'
import Checkout from './routes/checkout/checkout.component'
import { isUserAuthenticated } from './recoil/user/user.actions'

const App = () => {
  const setState = useSetRecoilState(userState)

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userAuth = await isUserAuthenticated()
        console.log('current user: ', userAuth)
        setState(prevState => {
          return { ...prevState, currentUser: userAuth }
        })
      } catch (error) {
        alert(error)
      }
    }
    checkUserSession()
  }, [setState]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App;
