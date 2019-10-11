import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import ButtonPrimary from '../../components/ButtonPrimary'

import api from '../../api'
import Session from '../../resources/session'
import './styles.css'

export default function Login({ history }){

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')


    function onSubmit(e) {
        e.preventDefault()

        api.post('/login', {
            email,
            pass
        })
        .then(({data}) => {
            Session.store(data.token)
            history.push('/')
        })
    }

    return (
        <div className="login-area section-padding-100 mx-auto">
            <div className="container-fluid">
                <form onSubmit={onSubmit}>
                    <div className="row">

                        <SectionTitle className="px-3">
                                Entre para continuar
                        </SectionTitle>

                        <div className="col-12 mb-3">
                            <input 
                                type="text" 
                                className="border-light custom-form-control w-100"
                                id="email"
                                placeholder="Email"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} />

                        </div>
                        <div className="col-12 mb-3">
                            <input 
                                type="password" 
                                className="border-light custom-form-control w-100"
                                id="pass" 
                                placeholder="Senha" 
                                value={pass}
                                onChange={(e) => setPass(e.target.value)} />

                        </div>
                        <div className="col-12">
                            <ButtonPrimary className="float-right" type="submit">
                                Entrar
                            </ButtonPrimary>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}