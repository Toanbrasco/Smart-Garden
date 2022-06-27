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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
    // const PageArr = ['Products', 'ProductDetail', 'Blog', 'Service', 'Contact', 'Cart']
    return (
        <ThemeProvider>
            <Header></Header>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/Products" element={<Products />} />
                <Route path="/ProductDetail" element={<ProductDetail />} />
                <Route path="/Blog" element={<Blog />} />
                <Route path="/Service" element={<Service />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Cart" element={<Cart />} />
            </Routes>
            <Footer></Footer>
        </ThemeProvider >

    );
}

export default App;
