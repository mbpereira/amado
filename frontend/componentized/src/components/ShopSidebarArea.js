import React from 'react'
import { Link } from 'react-router-dom'

export default function ShopSidebarArea(){
    return (
        <div className="shop_sidebar_area">

            <div className="widget catagory mb-50">
                <h6 className="widget-title mb-30">Catagories</h6>

                <div className="catagories-menu">
                    <ul>
                        <li><Link to="/products?category=1">Tenis</Link></li>
                    </ul>
                </div>
            </div>

        </div>
    )
}