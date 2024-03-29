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
import Error from './page/Error.jsx'
import News from './page/Post.jsx'
import Infomation from './page/Infomation';

import Admin from './page/Admin/Admin.jsx'
import Dashboard from './page/Admin/Dashboard.jsx';
import UploadProduct from './page/Admin/UploadProduct.jsx';
import Order from './page/Admin/Order.jsx';
import Config from './page/Admin/Config.jsx';
import User from './page/Admin/User.jsx';
import Post from './page/Admin/Post.jsx';
import AdProduct from './page/Admin/AdProduct';
import Login from './page/Admin/Login.jsx'
import EditProduct from './page/Admin/EditProduct';
import PostEdit from './page/Admin/PostEdit';
import QrCode from './page/Admin/QrCode';
import UploadPost from './page/Admin/UploadPost'
import Images from './page/Admin/Images';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import ProdcutContextProvider from './Contexts/ProductContext'
import CartContextProvider from './Contexts/CartContext'
import UserartContextProvider from './Contexts/UserContext'
import OrderContextProvider from './Contexts/OrderContext';
import PostContextProvider from './Contexts/PostContext';
import ImageContextProvider from './Contexts/ImageContext';
import ConfigContextProvider from './Contexts/ConfigContext';

function App() {
    // const PageArr = ['Products', 'ProductDetail', 'Blog', 'Service', 'Contact', 'Cart']
    return (
        <ThemeProvider>
            <ProdcutContextProvider>
                <CartContextProvider>
                    <UserartContextProvider>
                        <OrderContextProvider>
                            <PostContextProvider>
                                <ImageContextProvider>
                                    <ConfigContextProvider>
                                        <Header></Header>
                                        <Routes>
                                            <Route exact path="/" element={<Home />} >
                                            </Route>
                                            <Route path="products" element={<Products />} />
                                            <Route path="product/:productname" element={<ProductDetail />} />
                                            <Route path="blog" element={<Blog />} />
                                            <Route path="blog/:postName" element={<News />} />
                                            <Route path="service" element={<Service />} />
                                            <Route path="service/:postName" element={<News />} />
                                            <Route path="contact" element={<Contact />} />
                                            <Route path="cart" element={<Cart />} />
                                            <Route path="payment" element={<Payment />} />
                                            <Route path="post" element={<Post />} />
                                            <Route path="login" element={<Login />} />
                                            <Route path="infomation" element={<Infomation />} />
                                            <Route path="/admin" element={<Admin />} >
                                                <Route index element={<Dashboard />} />
                                                <Route path="products" element={<AdProduct />} />
                                                <Route path="product-upload" element={<UploadProduct />} />
                                                <Route path="user" element={<User />} />
                                                <Route path="order" element={<Order />} />
                                                <Route path="config" element={<Config />} />
                                                <Route path="post" element={<Post />} />
                                                <Route path="post/blog/:idBlog" element={<PostEdit />} />
                                                <Route path="post/blog/upload" element={<UploadPost />} />
                                                <Route path="post/service/:idService" element={<PostEdit />} />
                                                <Route path="post/service/upload" element={<UploadPost />} />
                                                <Route path="edit-product/:id" element={<EditProduct />} />
                                                <Route path="qrcode" element={<QrCode />} />
                                                <Route path="image" element={<Images />} />
                                            </Route>
                                            <Route path="*" element={<Error />} />
                                        </Routes>
                                        <Footer></Footer>
                                    </ConfigContextProvider>
                                </ImageContextProvider>
                            </PostContextProvider>
                        </OrderContextProvider>
                    </UserartContextProvider>
                </CartContextProvider>
            </ProdcutContextProvider>
        </ThemeProvider >
    );
}

export default App;
