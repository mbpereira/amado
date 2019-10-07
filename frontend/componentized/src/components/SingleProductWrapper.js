import React from 'react'
import def from '../assets/img/default.jpg'
import { context } from '../api'

function getPreviews (product) {

    if(!product.sku.length || !product.sku[0].images.length)
        return product.category ? product.category.thumbnail : def

    const previews = []

    for(let image of product.sku[0].images) {
        if(previews.length >= 2)
            break
        
        previews.push(image)
    }

    return previews

}

export default function SingleProductWrapper(props){

    const { product } = props


    function renderPreview () {

        const previews = getPreviews(product)

        if(!Array.isArray(previews))
            return <img src={previews} alt="" />

        if(previews.length > 1) {
            const img = previews[0]
            const hover = previews[1]

            return (
                <>
                    <img src={context + img.link} alt="" />
                    <img className="hover-img" src={context + hover.link} alt="" />
                </>
            )
        }

        const img = previews[0]
        return (<img src={context + img.link} alt="" />)
        
    }

    return (
        <div className="col-12 col-sm-6 col-md-12 col-xl-6">
            <div className="single-product-wrapper">
                <div className="product-img">
                    {renderPreview()}
                </div>

                <div className="product-description d-flex align-items-center justify-content-between">
                    <div className="product-meta-data">
                        <div className="line"></div>
                        <p className="product-price">$ {product.price}</p>
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