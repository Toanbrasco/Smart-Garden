// import logo from './logo.svg';
import './App.css';
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
    return (
        <ThemeProvider>
            <Header></Header>
            {/* <Home></Home> */}
            {/* <Products></Products> */}
            {/* <ProductDetail></ProductDetail> */}
            {/* <Cart></Cart> */}
            {/* <Blog></Blog> */}
            {/* <Service></Service> */}
            <Contact></Contact>
            <Footer></Footer>

        </ThemeProvider >

    );
}

export default App;
