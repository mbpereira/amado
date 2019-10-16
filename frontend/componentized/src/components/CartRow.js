import React from 'react'

export default function CartItem(props){
    return (
        <tr>
            <td className="cart_product_img">
                <a href={`/products/${props.item.id_product}`}><img src={props.item.thumbnail} alt="Product" /></a>
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
                        data-stock={props.item.id_stock}
                        onChange={props.onUpdate} />
                </div>
            </td>
            <td>
                <button 
                    type="button"
                    className="close" 
                    aria-label="Close"
                    data-stock={props.item.id_stock} 
                    onClick={props.onRemove} >
                    &times;
                </button>
            </td>
        </tr>
    )
}