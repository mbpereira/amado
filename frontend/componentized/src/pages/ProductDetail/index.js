import React, { useState, useEffect } from 'react'

import Carousel from '../../components/Carousel'
import SingleProductMetaData from '../../components/SingleProductMetaData'

import api, { context } from '../../api'

import './styles.css'

export default function ProductDetail({ match }) {

    const productId = match.params.id

    // dados iniciais
    const [product, setProduct] = useState({ colors: [], stocks: [] })

    // propriedades de exibicao. Para cada color, temos x opcoes de estoque
    const [colorId, setColorId] = useState(-1)
    const [stocks, setStocks] = useState([])

    // propriedades de venda. id do estoque, quantidade de itens
    const [stock, setStock] = useState(-1)
    const [qty, setQty] = useState(1)

    useEffect(() => {
        api.get(`/products/${productId}`)
            .then(({data}) => setProduct(data))

    }, [])

    useEffect(() => {

        const color = product.colors[0]

        if(color && color.images && color.images.length)
            setColorId(color.images[0].id_color)

    }, [product])

    useEffect(() => {

        const color = product.colors.find(color => color.id == colorId)

        if(color && color.stock && color.stock.length)
            setStocks(color.stock)

    }, [colorId])

    function getImagesOf(colorId) {

        const color = product.colors.find(color => color.id == colorId)

        if(color && Array.isArray(color.images))
            return color.images.map(image => context + image.link)

        return []
    }

    return (
        <div className="single-product-area section-padding-100 clearfix">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-7">
                        <div className="single_product_thumb">
                            <Carousel 
                                id="product_details_slider" 
                                images={getImagesOf(colorId)} />
                        </div>
                    </div>
                    <div className="col-12 col-lg-5">
                        <div className="single_product_desc">
                            <SingleProductMetaData 
                                product={product}
                                stocks={stocks}
                                onChangeQty={(qty) => setQty(qty)} 
                                onColorChange={(id) => setColorId(id)} 
                                onStockChange={(stock) => setStock(stock)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}