import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Switch } from 'react-router-dom'

import Home from './pages/HomePage'
import About from './pages/AboutPage'
import Default from './pages/Default'
import Product from './pages/ProductsPage'
import Contact from './pages/ContactPage'
import Cart from './pages/CartPage'
import SingleProduct from './pages/SingleProductPage'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import SideCart from './components/SideCart'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <Navbar />
    <Sidebar />
    <SideCart />
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/about" component={About} exact/>
        <Route path="/contact" component={Contact} exact/>
        <Route path="/product" component={Product} exact/>
        <Route path="/product/:id" component={SingleProduct} />
        <Route path="/cart" component={Cart} />
        <Route  component={Default}/>
      </Switch>

      <Footer />
    </>
    
  );
}

export default App;
