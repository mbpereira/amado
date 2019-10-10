import React, { useState, useEffect } from 'react'

import CartTable from '../../components/CartTable'
import CartRow from '../../components/CartRow'

import getCart from '../../resources/cart'

export default function Cart() {

    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const cart = getCart()
        setItems(cart.all())
    }, [])

    useEffect(() => {

        let price = 0
        items.map(item => {
            price += Number(item.quantity) * Number(item.price)
        })
        setTotal(price)

    }, [items])

    function handleUpdateQty (id, qty) {

        const index = items.findIndex(item => item.id_stock == id)

        if(index !== -1) {
            const copy = items.slice()

            copy[index] = {
                ...copy[index],
                quantity: qty
            }

            setItems(copy)
        }
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
                                <CartRow key={item.id_stock} item={item} onUpdate={handleUpdateQty} />
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
                                <a href="cart.html" className="btn amado-btn w-100">Checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}