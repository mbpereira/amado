import React, { useState, useEffect } from 'react'

import Carousel from '../../components/Carousel'
import SingleProductMetaData from '../../components/SingleProductMetaData'

import api, { context } from '../../api'
import getCart from '../../resources/cart'

import './styles.css'

export default function ProductDetail({ match }) {

    const productId = match.params.id

    // dados iniciais
    const [product, setProduct] = useState({ colors: [], stocks: [] })

    // propriedades de exibicao. Para cada color, temos x opcoes de estoque.
    // esses stocks são relacionados à color selecionada atualmente
    const [stocks, setStocks] = useState([])

    const [color, setColor] = useState(null)
    const [stock, setStock] = useState(null)
    const [qty, setQty] = useState(1)

    useEffect(() => {

        api.get(`/products/${productId}`)
            .then(({data}) => setProduct(data))

    }, [])

    useEffect(() => {

        const color = product.colors[0]

        // quando o produto for carregado, definir uma variante de cor padrão para exibição
        if(color)
            setColor(color)

    }, [product])

    useEffect(() => {
        // quando a cor "padrão" for definida, carregamos as opções de "tamanhos" para essas cores
        // cada opção de tamanho representa um estoque especifico para essa variante
        if(color)
            setStocks(color.stock || [])

        console.log("Stocks updateds", stocks)

    }, [color])

    function getCurrentImages() {

        console.log(color)
        if(color && Array.isArray(color.images))
            return color.images.map(image => context + image.link)

        return []
    }

    function handleColorChange(colorId) {

        const color = product.colors.find(color => color.id == colorId)
        if(color) setColor(color)
            
    }

    function handleStockChange(stockId) {

        const stock = stocks.find(stock => stock.id == stockId)
        setStock(stock)

    }

    // ao clicar em adicionar no carrinho, já teremos selecionado uma cor e também um "opcao" de estoque.
    // precisamos armazenar no carrinho, um thumbnail para representar o produto.
    function handleAddToCart(e) {
        e.preventDefault()

        if(!stock)
            return

        const id_stock =  stock.id
        const price = product.price || stock.price
        const name  = `${product.name} ${color.name}`
        const quantity   = qty
        const [thumbnail] = getCurrentImages()

        const cart = getCart()

        cart.set({
            id_stock,
            name,
            quantity,
            thumbnail,
            price
        })

        console.log(cart.all())

    }

    return (
        <div className="single-product-area section-padding-100 clearfix">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-7">
                        <div className="single_product_thumb">
                            <Carousel 
                                id="product_details_slider" 
                                images={getCurrentImages()} />
                        </div>
                    </div>
                    <div className="col-12 col-lg-5">
                        <div className="single_product_desc">
                            <SingleProductMetaData 
                                product={product}
                                stocks={stocks}
                                onChangeQty={(qty) => setQty(qty)} 
                                onColorChange={handleColorChange} 
                                onStockChange={handleStockChange} 
                                onAdd={handleAddToCart} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}