import React, { useEffect, useState } from 'react'
import Footer from './components/Footer'
import Search from './components/Search'
import SessionActions from './components/SessionActions'

import Session from '../resources/session'
import Routes from '../routes'

import logo from '../assets/img/core-img/logo.png'

import './App.css'

function App() {

  const [isLogged, setIsLogged] = useState(false)
  const [sessionInfo, setSessionInfo] = useState(null)

  const [searchIsOpen, setSearchIsOpen] = useState(false)
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false)

  useEffect(() => {
    setIsLogged(Session.isLogged())
  }, [])

  useEffect(() => {
    setSessionInfo(Session.info)
  }, [isLogged])

  function handleLogout() {
    Session.destroy()
    setSessionInfo(null)
    setIsLogged(false)
  }

  function handleLogon(data) {
    Session.store(data)
    setSessionInfo(Session.info)
    setIsLogged(true)
  }

  return (
    <>
      <div className="main-content-wrapper d-flex clearfix">

        <Search isOpen={searchIsOpen} onClose={() => setSearchIsOpen(false)} />

        <div className="mobile-nav">
          <div className="amado-navbar-brand">
            <a href="index.html"><img src={logo} alt="" /></a>
          </div>
          <button onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)} className="amado-navbar-toggler">
            <span></span><span></span><span></span>
          </button>
        </div>

        <header className={`header-area clearfix ${mobileMenuIsOpen ? 'mobile-open' : ''}`}>

          <button onClick={() => setMobileMenuIsOpen(false)} className="nav-close">
            <i className="fa fa-close" aria-hidden="true"></i>
          </button>

          <div className="logo">
            <a href="/"><img src={logo} alt="" /></a>
          </div>

          <SessionActions onLogout={handleLogout} sessionInfo={sessionInfo} />

          <nav className="amado-nav">
            <ul>
              <li className="active"><a href="/">Home</a></li>
              <li><a href="/products">Shop</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/checkout">Checkout</a></li>
            </ul>
          </nav>

          <div className="amado-btn-group mt-30 mb-100">
            <a href="/" className="btn amado-btn mb-15">%Discount%</a>
            <a href="/" className="btn amado-btn active">New this week</a>
          </div>

          <div className="cart-fav-search mb-100">
            <a href="/" className="cart-nav"><img src="img/core-img/cart.png" alt="" /> Cart <span>(0)</span></a>
            <a href="/" className="fav-nav"><img src="img/core-img/favorites.png" alt="" /> Favourite</a>
            <button onClick={() => setSearchIsOpen(!searchIsOpen)} className="search-nav"><img src="img/core-img/search.png" alt="" /> Search</button>
          </div>

          <div className="social-info d-flex justify-content-between">
            <a href="/"><i className="fa fa-pinterest" aria-hidden="true"></i>{}</a>
            <a href="/"><i className="fa fa-instagram" aria-hidden="true"></i>{}</a>
            <a href="/"><i className="fa fa-facebook" aria-hidden="true"></i>{}</a>
            <a href="/"><i className="fa fa-twitter" aria-hidden="true"></i>{}</a>
          </div>
        </header>

        <Routes onLogon={handleLogon} />

      </div>
      <Footer />
    </>
  )
}

export default App
