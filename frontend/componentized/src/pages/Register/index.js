import React,  { useState } from 'react'

import WrapperContent from '../../components/WrapperContent'
import ButtonPrimary from '../../components/ButtonPrimary'

import api from '../../api'
import Session from '../../resources/session'

import './styles.css'
import moment from 'moment'

export default function Register({ onLogon, history }) {

  const [cpf, setCpf] = useState('')
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  function handleRegister(e) {
    e.preventDefault()

    api.post('/register', {
      cpf,
      name,
      phone,
      email,
      pass,
      birthday: moment(birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    }, {
      headers: { 'x-access-token': Session.token }
    })
    .then(({data}) => {
      onLogon(data)
      history.push('/me')
    })
  }
  return (
    <WrapperContent className="register mx-auto" title="Faça seu cadastro">
      <form id="my-2" onSubmit={handleRegister}>
        <div className="row">
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control custom-form-control"
              id="cpf"
              placeholder="cpf"
              value={cpf} 
              onChange={e => setCpf(e.target.value)} />
          </div>
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control custom-form-control"
              id="name"
              placeholder="Nome"
              value={name}
              onChange={e => setName(e.target.value)} />
          </div>
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control custom-form-control"
              id="birthday"
              placeholder="Data Nascimento"
              value={birthday}
              onChange={e => setBirthday(e.target.value)} />
          </div>
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control custom-form-control"
              id="phone"
              placeholder="Telefone ou celular"
              value={phone}
              onChange={e => setPhone(e.target.value)} />
          </div>
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control custom-form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="col-12 mb-3">
            <input
              type="password"
              className="form-control custom-form-control"
              id="password"
              placeholder="Senha"
              value={pass}
              onChange={e => setPass(e.target.value)} />
          </div>
          <div className="col-12">
            <ButtonPrimary
              id="submit-update"
              className="float-right"
              type="submit">
              Cadastrar
            </ButtonPrimary>
          </div>
        </div>
      </form>

    </WrapperContent>
  )
}