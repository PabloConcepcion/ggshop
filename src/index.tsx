import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Home } from './pages/Home';
import './translate/i18n/i18n.config';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <NextUIProvider>
    <BrowserRouter>
      <Routes>
        {routes.map((item: any, index: number) => {
          return <Route key={index} path={item.path} element={item.element} />;
        })}
      </Routes>
    </BrowserRouter>
    {/* <React.StrictMode>
      <Home />
    </React.StrictMode> */}
  </NextUIProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
