import React from 'react'
import Title from '../Title'
import CartColumn from './CartColumns'
import CartList from './CartList'
import CartTotals from './CartTotals'

export default function Cart() {
  return (
    <section className="py-5">
    <div className="container">
      <Title title="Shopping Cart" center/>

    </div>
    
    <CartColumn />
    <CartList />
    <CartTotals />
    </section>
  )
}
