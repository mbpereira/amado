import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from './pages/Main'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/products" exact component={Shop} />
                <Route path="/products/:id" exact component={ProductDetail} />
                <Route path="/cart" component={Cart} />
                <Route path="/checkout" component={Checkout} />
            </Switch>
        </BrowserRouter>
    )
}