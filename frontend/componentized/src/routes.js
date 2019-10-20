import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Main from './pages/Main'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'

import Session from './resources/session'
import Profile from './pages/Profile'
import Addresses from './pages/Addresses'
import Me from './pages/Me'
import Orders from './pages/Orders'

function PrivateRoute ({ component: Component, ...rest }) {
    return Session.isLogged()
        ? <Route {...rest} component={Component} />
        : <Redirect to="/login" />
}

export default function Routes({ onLogon }){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/products" exact component={Shop} />
                <Route path="/products/:id" exact component={ProductDetail} />
                <Route path="/cart" component={Cart} />
                <Route path="/login" render={routeProps => <Login {...routeProps} onLogon={onLogon} />} />

                <PrivateRoute path="/checkout" component={Checkout} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/addresses" component={Addresses} />
                <PrivateRoute path="/me" component={Me} />
                <PrivateRoute path="/orders" component={Orders} />
            </Switch>
        </BrowserRouter>
    )
}