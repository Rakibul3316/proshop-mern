import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserProfilePage from './pages/UserProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UsersListPage from './pages/UsersListPage';
import ProductsListPage from './pages/ProductsListPage';
import UserUpdateByAdminPage from './pages/UserUpdateByAdminPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProduct from './pages/EditProduct';

// Components 
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/admin/product/:id/edit' element={<EditProduct />} />
            <Route path='/admin/user/:id/edit' element={<UserUpdateByAdminPage />} />
            <Route path='/admin/userslist' element={<UsersListPage />} />
            <Route path='/admin/productslist' element={<ProductsListPage />} />
            <Route path='/admin/product/create' element={<CreateProductPage />} />
            <Route path='/order/:id' element={<OrderPage />} />
            <Route path='/placeorder' element={<PlaceOrderPage />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/shipping' element={<ShippingPage />} />
            <Route path='/profile' element={<UserProfilePage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/products/:id' element={<ProductDetailsPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/' element={<HomePage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
