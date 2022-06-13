// import logo from './logo.svg';
import './App.css';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Header from './Component/Header/Header.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
    const list = ['1', '2', '3', '4']
    return (
        <ThemeProvider breakpoints={['md']}>
            <Header name='asdasd' list={list}></Header>
            {/* <div>Your app...</div> */}
        </ThemeProvider >
        // <div className="App">
        //     <header className="App-header">
        //         <img src={logo} className="App-logo" alt="logo" />
        //         <p>
        //             Edit <code>src/App.js</code> and save to reload.
        //         </p>
        //         <a
        //             className="App-link"
        //             href="https://reactjs.org"
        //             target="_blank"
        //             rel="noopener noreferrer"
        //         >
        //             Learn React
        //         </a>
        //     </header>
        // </div>
    );
}

export default App;
