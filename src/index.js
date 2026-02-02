import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes'; //
import { Provider } from 'react-redux';
import { store } from './store/store'; //
import { ClerkProvider } from '@clerk/clerk-react';

// ⚠️ REPLACE THIS WITH YOUR ACTUAL KEY FROM CLERK DASHBOARD
const PUBLISHABLE_KEY = "pk_test_ZW5qb3llZC1hbGJhY29yZS02Mi5jbGVyay5hY2NvdW50cy5kZXYk"; 

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ClerkProvider>
  </React.StrictMode>
);