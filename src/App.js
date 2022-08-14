// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Header from './Component/Header/Header.jsx'
import Footer from './Component/Footer/Footer.jsx'
import Home from './page/Home.jsx'
import Products from './page/Products.jsx'
import ProductDetail from './page/ProductDetail.jsx'
import Blog from './page/Blog.jsx'
import Service from './page/Service.jsx'
import Contact from './page/Contact.jsx'
import Cart from './page/Cart.jsx'
import Payment from './page/Payment.jsx'
import Admin from './page/Admin/Admin.jsx'
import Error from './page/Error.jsx'

import Dashboard from './page/Admin/Dashboard.jsx';
import UploadProduct from './page/Admin/UploadProduct.jsx';
import Order from './page/Admin/Order.jsx';
import Config from './page/Admin/Config.jsx';
import User from './page/Admin/User.jsx';
import Post from './page/Admin/Post.jsx';
import AdProduct from './page/Admin/AdProduct';
import Login from './page/Admin/Login.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import ProdcutContextProvider from './Contexts/ProductContext'
import CartContextProvider from './Contexts/CartContext'
import UserartContextProvider from './Contexts/UserContext'
import EditProduct from './page/Admin/EditProduct';

function App() {
    // const PageArr = ['Products', 'ProductDetail', 'Blog', 'Service', 'Contact', 'Cart']
    return (
        <ThemeProvider>
            <ProdcutContextProvider>
                <CartContextProvider>
                    <UserartContextProvider>
                        <Header></Header>
                        <Routes>
                            <Route exact path="/" element={<Home />} >
                            </Route>
                            <Route path="products" element={<Products />} />
                            {/* <Route path="products/:page" element={<Products />} /> */}
                            {/* <Route path="products/:categoryPage" element={<Products />} /> */}
                            <Route path="product/:productname" element={<ProductDetail />} />
                            <Route path="blog" element={<Blog />} />
                            <Route path="service" element={<Service />} />
                            <Route path="contact" element={<Contact />} />
                            <Route path="cart" element={<Cart />} />
                            <Route path="payment" element={<Payment />} />
                            <Route path="post" element={<Post />} />
                            <Route path="login" element={<Login />} />
                            <Route path="/admin" element={<Admin />} >
                                <Route index element={<Dashboard />} />
                                <Route path="products" element={<AdProduct />} />
                                <Route path="product-upload" element={<UploadProduct />} />
                                <Route path="user" element={<User />} />
                                <Route path="order" element={<Order />} />
                                <Route path="config" element={<Config />} />
                                <Route path="post" element={<Post />} />
                                <Route path="edit-product/:productname" element={<EditProduct />} />
                            </Route>
                            <Route path="*" element={<Error />} />
                        </Routes>
                        <Footer></Footer>
                    </UserartContextProvider>
                </CartContextProvider>
            </ProdcutContextProvider>
        </ThemeProvider >
    );
}

export default App;
