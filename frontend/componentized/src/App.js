import React, { useEffect, useState } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import Routes from './routes'

import Session from './resources/session'

import './App.css'

function App() {

    const [isLogged, setIsLogged] = useState(false)
    

    useEffect(() => {
        setIsLogged(Session.isLogged())
    }, [])


    return (
        <>
            <div className="main-content-wrapper d-flex clearfix">

                <Header isLogged={isLogged} />
                <Routes isLogged={isLogged} />

            </div>

            <Footer />
            
        </>
    )
}

export default App
