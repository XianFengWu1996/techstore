import React, { Component } from 'react'
import {linkData} from './linkdata'
import {socialData} from './socialData'
import {items} from './productData'

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    sidebarOpen: false,
    cartOpen: false,
    cartItems: 0,
    links: linkData,
    socialIcons: socialData,
    cart: [],
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
    })

    
  }

  //get cart from local storage
  getStorageCart = () => {
    return []
  }

  //get product from local storage
  getStorageProduct = () => {
    return {}
  }

  //get totals
  getTotals = () => {
    
  }

  //add totals
  addTotals = () => {}

  //sync storage
  syncStorage = () => {}

  // add to cart
  addToCart = (id) => {
    console.log(`add to cart ${id}`)
  }

  //set single product
  setSingleproduct = (id) => {
    console.log(`set single product ${id}`)
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

  render(){
    return(
    <ProductContext.Provider value={{
      ...this.state,
      handleSidebar: this.handleSidebar,
      handleCart: this.handleCart,
      openCart: this.handleCart,
      closeCart: this.closeCart,
      addToCart: this.addToCart,
      setSingleproduct: this.setSingleproduct
    }}>
      {this.props.children}
    </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer } 