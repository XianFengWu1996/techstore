import React, { Component } from 'react'
import {linkData} from './linkdata'
import {socialData} from './socialData'
import {items} from './productData'

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    sidebarOpen: false,
    cartOpen: false,
    links: linkData,
    socialIcons: socialData,
    cart: [],
    cartItems: 0,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    storeProducts: [],
    filteredProducts: [],
    featuredProducts: [],
    singleProduct: {},
    loading: true
  }

  componentDidMount() {
    //items from contentful
    this.setProducts(items);
  }

  setProducts = (products) => {
    let storeProducts = products.map( product => {
      const { id } = product.sys;
      const image = product.fields.image.fields.file.url;
      const newProduct = {id,...product.fields, image};
      return newProduct;
    })

    let featuredProducts = storeProducts.filter(item => item.featured === true);

    this.setState({
      storeProducts,
      filteredProducts: storeProducts,
      featuredProducts,
      cart: this.getStorageCart(),
      singleProduct: this.getStorageProduct(),
      loading: false
    }, () => {
      this.addTotals();      
      
    })
  }

  /* ******************************* */
    // Local Storage
  /* ******************************* */

  //get cart from local storage
  getStorageCart = () => {
    let cart;
    if(localStorage.getItem('cart')){
      cart = JSON.parse(localStorage.getItem('cart'))
    } else {
      cart = [];
    }
    return cart;
  } 

  //get product from local storage
  getStorageProduct = () => {
    return localStorage.getItem('singleProduct') ? JSON.parse(localStorage.getItem('singleProduct')): {} ;  
  }

   //set single product
   setSingleProduct = id => {
    let product = this.state.storeProducts.find(item => item.id === id);
    localStorage.setItem('singleProduct', JSON.stringify(product));
    this.setState({
      singleProduct: {...product},
      loading: false
    })
    
  }

  //sync storage
  syncStorage = () => {
    localStorage.setItem(`cart`, JSON.stringify(this.state.cart))
  }

  /* ******************************* */
    // Shopping Cart Functionality
  /* ******************************* */
  
  //get totals
  getTotals = () => {
    let subTotal = 0;
    let cartItems = 0;
    this.state.cart.forEach(item =>{
      subTotal += item.total;
      cartItems += item.count;
    })
      subTotal = parseFloat(subTotal.toFixed(2));
      let tax = subTotal * 0.07;
      tax=parseFloat(tax.toFixed(2));
      let total = subTotal + tax;
      total = parseFloat(total.toFixed(2));
      
      return {
        subTotal,
        cartItems,
        tax,
        total
      }
  }

  //add totals
  addTotals = () => {
    const totals = this.getTotals();
    this.setState({
      cartItems: totals.cartItems,
      cartSubTotal: totals.subTotal,
      cartTax: totals.tax,
      cartTotal: totals.total
    })    
  }

  // add to cart
  addToCart = (id) => {
    let tempCart = [...this.state.cart];
    let tempProducts = [...this.state.storeProducts];
    let tempItem = tempCart.find(item => item.id === id);

    if(!tempItem){
      tempItem = tempProducts.find(item => item.id === id);
      let total = tempItem.price;
      let cartItem = {...tempItem, count: 1, total}
      tempCart = [...tempCart, cartItem]
    } else {
      tempItem.count++;
      tempItem.total = tempItem.price * tempItem.count;
      tempItem.total = parseFloat(tempItem.total.toFixed(2))
    }
    this.setState(
      () => {
        return { cart: tempCart};
      },
      () => {
        this.addTotals();
        this.syncStorage();
        this.openCart();
      }
    )
  }

  handleSidebar = () => {
    this.setState({sidebarOpen: !this.state.sidebarOpen})
  }

  handleCart = () => {
    this.setState({
      cartOpen: !this.state.cartOpen
    })
  }

  closeCart = () => {
    this.setState({cartOpen: false})
  }

  openCart = () => {
    this.setState({cartOpen: true})
  }

  /* ******************************* */
    // Cart Page Functionality
  /* ******************************* */
  increment = (id) => {
    let tempCart = [...this.state.cart];
    const cartItem = tempCart.find(item => item.id === id);
    cartItem.count++;
    cartItem.total = cartItem.count * cartItem.price;
    cartItem.total = parseFloat(cartItem.total.toFixed(2));

    this.setState(() => {
      return {
        cart: [...tempCart]
      }
    }, () => {
      this.addTotals();
      this.syncStorage();
    })
  }

  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const cartItem = tempCart.find(item => item.id === id);
    cartItem.count = cartItem.count -1 ;

    if(cartItem.count === 0){
      this.removeItem(id)
    } else{
      cartItem.total = cartItem.count * cartItem.price;
      cartItem.total = parseFloat(cartItem.total.toFixed(2));
      this.setState(() => {
        return {
          cart: [...tempCart]
        }
      }, () => {
        this.addTotals();
        this.syncStorage();
      })
    }

    
    
  }

  removeItem = (id) => {
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);

    this.setState({
      cart: [...tempCart]
    }, () => {
      this.addTotals();
      this.syncStorage();
    })
    
  }

  clearCart = () => {
    this.setState({
      cart: []
    }, () => {
      this.addTotals();
      this.syncStorage();
    })
    
  }


  render(){
    return(
    <ProductContext.Provider value={{
      ...this.state,
      handleSidebar: this.handleSidebar,
      handleCart: this.handleCart,
      openCart: this.handleCart,
      closeCart: this.closeCart,
      addToCart: this.addToCart,
      setSingleProduct: this.setSingleProduct,
      increment: this.increment,
      decrement: this.decrement,
      removeItem: this.removeItem,
      clearCart: this.clearCart
    }}>
      {this.props.children}
    </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer } 