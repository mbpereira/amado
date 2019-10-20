import React from 'react'

export default function SingleProductMetaData(props) {
  return (
    <>
      <div className="product-meta-data">
        <div className="line"></div>
        <p className="product-price">R$ {props.product.price_base}</p>
        <a href="product-details.html">
          <h6>{props.product.name}</h6>
        </a>
        <p className="avaibility"><i className="fa fa-circle"></i> In Stock</p>
      </div>

      <div className="short_overview my-5">
        <p>{props.product.description}</p>
      </div>


      <div className="colors">
        {props.product.colors.map((color, index) => (
          <button className="border-light" style={{ backgroundColor: color.hex }} key={index} onClick={() => props.onColorChange(color.id)}></button>
        ))}
      </div>
      <div className="options">
        <select onChange={(e) => props.onStockChange(e.target.value)}>
          <option>Tamanho</option>
          {props.stocks.map(stock => (
            <option key={stock.id} value={stock.id}>{stock.option}</option>
          ))}
        </select>
      </div>
      <form onSubmit={props.onAdd} className="cart clearfix" method="post">
        <div className="quantity d-flex mb-50">
          <label htmlFor="qty">Qty</label>
          <input
            id="qty"
            type="number"
            className="qty-text"
            name="quantity"
            onChange={e => props.onChangeQty(e.target.value)} />
        </div>
        <button
          type="submit"
          name="addtocart"
          value="5"
          className="btn amado-btn">Add to cart</button>
      </form>

    </>

  )
}