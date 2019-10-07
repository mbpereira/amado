import React from 'react'
import { Link } from 'react-router-dom'
import { context } from '../api'

export default function SingleProductsCatagory(props){
    const { catagory } = props
    return(
        <div className="single-products-catagory clearfix">
            <Link to={`/products?category=${catagory.id}`}>
                <img src={context + catagory.thumbnail} alt="" />
                <div className="hover-content">
                    <div className="line"></div>
                    {/* <p>From $318</p> */}
                    <h4>{catagory.name}</h4>
                </div>
            </Link>
        </div>
    )
}