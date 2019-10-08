import React from 'react'
import { context } from '../api'

export default function SingleProductWrapper(props){

    const { product } = props

    const img = product.previews[0]
    const hover = product.previews[1]

    return (
        <div className="col-12 col-sm-6 col-md-12 col-xl-6">
            <div className="single-product-wrapper">
                <div className="product-img">
                    <img src={context + img.link} alt="" />
                    <img className="hover-img" src={context + hover.link} alt="" />
                </div>

                <div className="product-description d-flex align-items-center justify-content-between">
                    <div className="product-meta-data">
                        <div className="line"></div>
                        <p className="product-price">$ {product.priceBase}</p>
                        <a href="product-details.html">
                            <h6>{product.name}</h6>
                        </a>
                    </div>
                    <div className="ratings-cart text-right">
                        <div className="ratings">
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                            <i className="fa fa-star" aria-hidden="true"></i>
                        </div>
                        <div className="cart">
                            <a href="cart.html" data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="img/core-img/cart.png" alt="" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}