import React from "react";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout/Layout";
import { Products } from "./pages/Products";

export const routes: any[] = [
  {
    path: '/',
    element: <Layout content={<Home />} />,
    text: 'Home',
  },

  {
    path: '/products',
    element: <Layout content={<Products />} />,
    text: 'Libros',
  },
];
