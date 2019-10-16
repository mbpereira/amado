import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import CartTable from '../../components/CartTable'
import CartRow from '../../components/CartRow'

import getCart from '../../resources/cart'

export default function Cart() {

  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)


  const cart = getCart()


  useEffect(() => {
    setItems(cart.all())
  }, [])

  useEffect(() => {
    setTotal(cart.total())
  }, [items])


  function handleUpdateQty(e) {

    const id = Number(e.target.getAttribute('data-stock'))
    const quantity = Number(e.target.value || 0)

    const index = items.findIndex(item => Number(item.id_stock) === id)
    if(index === -1) return

    cart.set({...items[index], quantity })
    setItems([...cart.all()])

  }

  function handleRemove(e) {
    console.log(e.target)
    const id = Number(e.target.getAttribute('data-stock'))

    console.log("Tentando remover", id)
    cart.remove(id)
    setItems([...cart.all()])
  }

  return (
    <div className="cart-table-area section-padding-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="cart-title mt-50">
              <h2>Shopping Cart</h2>
            </div>

            <CartTable>
              {items.map(item => (
                <CartRow key={item.id_stock} item={item} onUpdate={handleUpdateQty} onRemove={handleRemove} />
              ))}
            </CartTable>

          </div>
          <div className="col-12 col-lg-4">
            <div className="cart-summary">
              <h5>Cart Total</h5>
              <ul className="summary-table">
                <li><span>subtotal:</span> <span>${total}</span></li>
                <li><span>delivery:</span> <span>Free</span></li>
                <li><span>total:</span> <span>${total}</span></li>
              </ul>
              <div className="cart-btn mt-100">
                <Link to="/checkout" className="btn amado-btn w-100">Checkout</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}