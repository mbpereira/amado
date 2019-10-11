import React, { useState } from 'react'
import Search from './Search'

import logo from '../assets/img/core-img/logo.png'

export default function Header(props) {

    const [searchIsOpen, setSearchIsOpen] = useState(false)
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)

    function handleSearch(e) {
        setSearchIsOpen(!searchIsOpen)
    }

    function handleMobileMenu(e){
        setMobileMenuIsOpen(!mobileMenuIsOpen)
    }

    return (

        <>

            <Search isOpen={searchIsOpen} onClose={() => setSearchIsOpen(false)}/>

            <div className="mobile-nav">
                <div className="amado-navbar-brand">
                    <a href="index.html"><img src={logo} alt="" /></a>
                </div>
                <button onClick={handleMobileMenu} className="amado-navbar-toggler">
                    <span></span><span></span><span></span>
                </button>
            </div>
            
            <header className={`header-area clearfix ${mobileMenuIsOpen ? 'mobile-open' : ''}`}>

                <button onClick={handleMobileMenu} className="nav-close">
                    <i className="fa fa-close" aria-hidden="true"></i>
                </button>

                <div className="logo">
                    <a href="/"><img src={logo} alt="" /></a>
                </div>

                {props.isLogged 
                    ? <a href="#">Minha conta</a>
                    : <span />
                }

                <nav className="amado-nav">
                    <ul>
                        <li className="active"><a href="index.html">Home</a></li>
                        <li><a href="shop.html">Shop</a></li>
                        <li><a href="product-details.html">Product</a></li>
                        <li><a href="cart.html">Cart</a></li>
                        <li><a href="checkout.html">Checkout</a></li>
                    </ul>
                </nav>

                <div className="amado-btn-group mt-30 mb-100">
                    <a href="/" className="btn amado-btn mb-15">%Discount%</a>
                    <a href="/" className="btn amado-btn active">New this week</a>
                </div>

                <div className="cart-fav-search mb-100">
                    <a href="/" className="cart-nav"><img src="img/core-img/cart.png" alt="" /> Cart <span>(0)</span></a>
                    <a href="/" className="fav-nav"><img src="img/core-img/favorites.png" alt="" /> Favourite</a>
                    <button onClick={handleSearch} className="search-nav"><img src="img/core-img/search.png" alt="" /> Search</button>
                </div>

                <div className="social-info d-flex justify-content-between">
                    <a href="/"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
                    <a href="/"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                    <a href="/"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                    <a href="/"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                </div>
            </header>

        </>
    )
}