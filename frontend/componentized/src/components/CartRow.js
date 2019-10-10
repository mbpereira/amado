import React from 'react'

export default function CartItem(props){
    return (
        <tr>
            <td className="cart_product_img">
                <a href="#"><img src={props.item.thumbnail} alt="Product" /></a>
            </td>
            <td className="cart_product_desc">
                <h5>{props.item.name}</h5>
            </td>
            <td className="price">
                <span>${props.item.price * props.item.quantity}</span>
            </td>
            <td className="qty">
                <div className="quantity d-flex">
                    <label htmlFor="qty">Qty</label>
                    <input 
                        id="qty" 
                        type="number" 
                        className="qty-text" 
                        name="quantity"
                        value={props.item.quantity}
                        onChange={(e) => props.onUpdate(props.item.id_stock, e.target.value)} />
                </div>
            </td>
        </tr>
    )
}