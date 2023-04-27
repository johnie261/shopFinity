import React from 'react'
import styled from 'styled-components'
import { PageHero, StripeCheckout } from '../components'
// extra imports
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'

const CheckoutPage = () => {
  const {cart} = useCartContext()
  return <main>
    <PageHero title="Checkout"/>
    <Wrapper className="page">
      {cart.length < 1 ? <div className="empty">
        <h5>Your cart is empty</h5>
        <Link to="/products" className="btn">fill it</Link>
      </div> : <StripeCheckout />} 
    </Wrapper>
  </main>
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .empty {
    text-align: center;
  }
`
export default CheckoutPage
