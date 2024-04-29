import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../home";
import { ProductList } from "../productList";
import { ProductDetail } from "../ProductDetail/ProductDetail";
import { Login, Register } from "../login";
import { Cart } from "../cart";
import { ProtectedRoute } from "./ProtectedRoute";
import { OrderInfo } from "../order";
import { Dashboard } from "../dashboard";
import { PageNotFound } from "../common";

export const RoutesList: FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='products' element={<ProductList />} />
        <Route path='products/:id' element={<ProductDetail />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route
          path='cart'
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path='order-summary'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path='dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
};
