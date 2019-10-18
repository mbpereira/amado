import React, { useEffect, useState } from 'react'
import moment from 'moment'

import WrapperContent from '../../components/WrapperContent'
import ButtonPrimary from '../../components/ButtonPrimary'

import api from '../../api'

import './styles.css'
import Session from '../../resources/session'

export default function Me(props) {

  const [cpf, setCpf] = useState('')
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    loadMe()
  }, [])

  function loadMe() {
    api.get('/me', {
      headers: { 'x-access-token': Session.token }
    })
    .then(({data}) => {
      setCpf(data.cpf)
      setName(data.name)
      setBirthday(moment(data.birthday).format('DD/MM/YYYY'))
      setPhone(data.phone)
      setEmail(data.email)
    })
  }

  function handleUpdateMe(e) {
    e.preventDefault()

    api.patch('/me', {
      name,
      phone,
      email,
      birthday: moment(birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    }, {
      headers: { 'x-access-token': Session.token }
    })
    .then(loadMe)
    .catch(err => console.log(err))
  }

  return (
    <WrapperContent className="me mx-auto" title="Meus dados">
      <div className="row">
        <div className="col-12">
          <form id="address-form my-2" onSubmit={handleUpdateMe}>
            <div className="row">
              <div className="col-12 mb-3">
                <input
                  disabled
                  type="text"
                  className="form-control custom-form-control"
                  id="cpf"
                  placeholder="cpf"
                  defaultValue={cpf} />
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
              <div className="col-12">
                <ButtonPrimary
                  id="submit-update"
                  className="float-right"
                  type="submit">
                  Atualizar
                </ButtonPrimary>
              </div>
            </div>
          </form>
        </div>
      </div>
    </WrapperContent>
  )
}