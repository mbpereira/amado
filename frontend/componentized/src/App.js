import React from 'react'
import Search from './components/Search'
import Header from './components/Header'
import Footer from './components/Footer'
import Routes from './routes'

import './App.css'

function App() {
    return (
        <>
            <Search />

            <div className="main-content-wrapper d-flex clearfix">

                <Header />
                <Routes />

            </div>

            <Footer />
            
        </>
    )
}

export default App
