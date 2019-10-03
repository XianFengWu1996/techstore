import React, { Component } from 'react'
import Cart from '../components/CartPage/Cart'
import storeBcg from '../images/storeBcg.jpeg'
import Hero from '../components/Hero'

export default class CartPage extends Component {
  render() {
    return (
      <div>
        <Hero img={storeBcg} />
        <Cart />
      </div>
    )
  }
}
