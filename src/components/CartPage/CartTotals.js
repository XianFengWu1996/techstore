import React from 'react'
import {ProductConsumer} from '../../context/Context'
import PaypalBtn from './Paypalbtn'

export default function CartTotals({history}) {
  return (
    <div className="container">
      <div className="row">
        <ProductConsumer>
          {value => {
            const { cartSubTotal, cartTax, cartTotal, clearCart} = value;
            return (
              <div className="col text-title text-center my-4">
                <button className="btn btn-outline-danger text-capitalize mb-4"
                onClick={clearCart}>
                 clear cart
                </button>
                <h3>subtotal : ${cartSubTotal}</h3>
                <h3>tax: ${cartTax}</h3>
                <h3>total: ${cartTotal}</h3>

                <PaypalBtn 
                  history={history} 
                  cartTotal={cartTotal} 
                  clearCart={clearCart}
                />
              </div>
            )
          }}
        </ProductConsumer>
      </div>
    </div>
  )
}
