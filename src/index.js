import React from 'react';
import { RecoilRoot } from 'recoil'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import App from './App';
import { stripePromise } from './utils/stripe/stripe.utils'

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
