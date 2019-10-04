import React from 'react'
import Cart from '../components/CartPage/Cart'
import storeBcg from '../images/storeBcg.jpeg'
import Hero from '../components/Hero'


export default function CartPage(props) {
  return (
    <div>
    <Hero img={storeBcg} />
    <Cart history={props.history}/>
  </div>
  )
}

