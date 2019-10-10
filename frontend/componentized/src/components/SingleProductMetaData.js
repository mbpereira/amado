import React from 'react'

export default function SingleProductMetaData(props) {
    return (
        <>
            <div className="product-meta-data">
                <div className="line"></div>
                <p className="product-price">$180</p>
                <a href="product-details.html">
                    <h6>White Modern Chair</h6>
                </a>
                {/* <div className="ratings-review mb-15 d-flex align-items-center justify-content-between">
                    <div className="ratings">
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                    </div>
                    <div className="review">
                        <a href="#">Write A Review</a>
                    </div>
                </div> */}
                <p className="avaibility"><i className="fa fa-circle"></i> In Stock</p>
            </div>

            <div className="short_overview my-5">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?</p>
            </div>


            <div className="colors">
                {props.product.colors.map((color, index) => (
                    <button key={index} onClick={() => props.onColorChange(color.id)}></button>
                ))}
            </div>
            <div className="options">
                <select onChange={(e) => props.onStockChange(e.target.value)}>
                    <option>Tamanho</option>
                    {props.stocks.map((stock) => (
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
                        onChange={(e) => props.onChangeQty(e.target.value)} />
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