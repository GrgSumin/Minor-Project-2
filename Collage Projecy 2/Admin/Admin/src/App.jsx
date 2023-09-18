import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MainLayout from "./admin pannel/Pages/MainLayout";
import Adlogin from "./admin pannel/Pages/Adlogin";
import { Routes, Route } from "react-router-dom";
// import Customers from "./admin pannel/Customers";

import Dashboard from "./admin pannel/Pages/Dashboard";
import Enquiries from "./admin pannel/Pages/Enquiries";
import Orders from "./admin pannel/Pages/Orders";
import Customer from "./admin pannel/Pages/Customer";
import CategoryList from "./admin pannel/CategoryList";
import BrandList from "./admin pannel/Pages/BrandList";
import ProductList from "./admin pannel/Pages/ProductList";
import AddCategory from "./admin pannel/Pages/AddCategory";
import AddBrands from "./admin pannel/Pages/AddBrands";
import AddProducts from "./admin pannel/Pages/AddProducts";

function App() {
  return (
    <>
      {/* <HomePage /> */}
      <Routes>
        <Route path="/Admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customer" element={<Customer />} />
          <Route path="categorylist" element={<CategoryList />} />
          <Route path="brandlist" element={<BrandList />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="addproducts" element={<AddProducts />} />
          <Route path="category" element={<AddCategory />} />
          <Route path="Brands" element={<AddBrands />} />
        </Route>
        <Route path="/adminlogin" element={<Adlogin />} />
      </Routes>
    </>
  );
}

export default App;
