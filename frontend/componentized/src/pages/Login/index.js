import React, { useState } from 'react'

import SectionTitle from '../../components/SectionTitle'
import ButtonPrimary from '../../components/ButtonPrimary'
import WrapperContent from '../../components/WrapperContent'

import api from '../../api'
import './styles.css'

export default function Login({ history, onLogon }) {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  function handleLogon(e) {
    e.preventDefault()

    api.post('/login', {
      email,
      pass
    })
      .then(({ data }) => {
        // atualiza o estado do componente principal para "logado",
        // para re-rendereizar a seção do cabeçalho que indica a autenticação;
        onLogon(data)
        history.push('/')
      })
  }

  return (
    <WrapperContent className="mx-auto login-area">

      <div className="container-fluid">
        <form onSubmit={handleLogon}>
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
    </WrapperContent>
  )
}