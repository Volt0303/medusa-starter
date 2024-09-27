import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { enrichLineItems, retrieveCart } from '@lib/data/cart'
import { getCustomer } from '@lib/data/customer'
import Wrapper from '@modules/checkout/components/payment-wrapper'
import CheckoutForm from '@modules/checkout/templates/checkout-form'
import CheckoutSummary from '@modules/checkout/templates/checkout-summary'

export const metadata: Metadata = {
  title: 'Checkout',
}

const fetchCart = async () => {
  const cart = await retrieveCart()
  if (!cart) {
    return notFound()
  }

  if (cart?.items?.length) {
    const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
    cart.items = enrichedItems
  }

  return cart
}

export default async function Checkout() {
  const cart = await fetchCart()
  const customer = await getCustomer()

  return (
    <div className="content-container grid grid-cols-1 gap-x-40 py-12 small:grid-cols-[1fr_416px]">
      <Wrapper cart={cart}>
        <CheckoutForm cart={cart} customer={customer} />
      </Wrapper>
      <CheckoutSummary cart={cart} />
    </div>
  )
}
