import React, { useEffect, useState } from 'react'
import SingleProductWrapper from '../../components/SingleProductWrapper'
import ShopPagination from '../../components/ShopPagination'
import ShopFilter from '../../components/ShopFilter'
import ShopSidebarArea from '../../components/ShopSidebarArea'
import api from '../../api'

export default function Shop({ location }){

    const params = new URLSearchParams(location.search)

    const [products, setProducts] = useState([])

    useEffect(() => {
        loadProducts()
    }, [])

    async function loadProducts() {

        const url = params.category ? `/products?category=${params.category}` : '/products'

        const { data } = await api.get(url)
        setProducts(data)

    }

    return(
        <>

            <ShopSidebarArea />

            <div className="amado_product_area section-padding-100">
                <div className="container-fluid">

                    <div className="row">
                        <ShopFilter />
                    </div>

                    <div className="row">
                        {products.map(product => (
                            <SingleProductWrapper key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="row">
                        <ShopPagination />
                    </div>

                </div>
            </div>

        </>
    )
}