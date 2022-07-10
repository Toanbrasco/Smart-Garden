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
import Post from './page/Post.jsx'
import Admin from './page/Admin/Admin.jsx'
import Error from './page/Error.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
    // const PageArr = ['Products', 'ProductDetail', 'Blog', 'Service', 'Contact', 'Cart']
    return (
        <ThemeProvider>
            <Header></Header>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/products" element={<Products />} />
                <Route exact path="/products/:productname" element={<ProductDetail />} />
                <Route exact path="/blog" element={<Blog />} />
                <Route exact path="/service" element={<Service />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/payment" element={<Payment />} />
                <Route exact path="/post" element={<Post />} />
                <Route exact path="/admin" element={<Admin />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer></Footer>
        </ThemeProvider >

    );
}

export default App;
