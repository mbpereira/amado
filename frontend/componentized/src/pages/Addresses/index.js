import React, { useEffect, useState } from 'react'

import WrapperContent from '../../components/WrapperContent'
import AddressWrapper from '../../components/AddressWrapper'
import ButtonPrimary from '../../components/ButtonPrimary'
import api from '../../api'
import Session from '../../resources/session'

import './styles.css'

export default function Addresses(props) {

  const [addresses, setAddresses] = useState([])

  const [id, setId] = useState('')
  const [zip, setZip] = useState('')
  const [block, setBlock] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [receiver, setReceiver] = useState('')

  const [message, setMessage] = useState('Cadastrar')

  useEffect(() => {
    loadAddresses()
  }, [])

  useEffect(() => {
    if(!id) {
      setMessage('cadastrar')
      return
    }

    const address = addresses.find(address => Number(address.id) === Number(id))

    if(!address) return

    setZip(address.zip || '')
    setBlock(address.block || '')
    setStreet(address.street || '')
    setNumber(address.number || '')
    setCity(address.city || '')
    setState(address.state || '')
    setReceiver(address.receiver || '')
    setMessage('atualizar')

  }, [id])

  function loadAddresses() {
    api.get('/addresses', {
      headers: { 'x-access-token': Session.token }
    })
    .then(({ data }) => setAddresses(data))
  }

  function clear() {
    setId('')
    setZip('')
    setBlock('')
    setStreet('')
    setNumber('')
    setCity('')
    setState('')
    setMessage('cadastrar')
  }

  function handleEditRequest(e) {
    const id = Number(e.target.getAttribute('data-address'))
    console.log(id)
    setId(id)
  }

  function handleDelete(e) {
    const id = Number(e.target.getAttribute('data-address'))
    api.delete(`/addresses/${id}`, {
      headers: { 'x-access-token': Session.token }
    })
    .then(loadAddresses)
    .catch(err => console.log(err))
  }

  function handleSubmit(e) {
    e.preventDefault()

    let url = '/addresses'
    let method = 'post'

    if(!!id) {
      url += `/${id}`
      method = 'patch'
    }

    api({ method, url, data: {
        zip, block, street, number, city, state, receiver
      }, headers: {
        'x-access-token': Session.token
      }
    })
    .then(clear)
    .then(loadAddresses)
    .catch(err => console.log(err))
  }

  return (
    <WrapperContent className="addresses" title="Meus endereços">
      <div className="row">
        <div className="col-12 col-lg-6 my-4 my-lg-0">
          <h5>{message}</h5>
          <form id="address-form my-2" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control custom-form-control"
                  id="zip" 
                  placeholder="Cep" 
                  value={zip}
                  onChange={e => setZip(e.target.value)} />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control custom-form-control"
                  id="block" 
                  placeholder="bairro" 
                  value={block} 
                  onChange={e => setBlock(e.target.value)} />
              </div>
              <div className="col-8 mb-3">
                <input
                  type="text"
                  className="form-control custom-form-control"
                  id="street"
                  placeholder="Rua" 
                  value={street} 
                  onChange={e => setStreet(e.target.value)} />
              </div>
              <div className="col-4 mb-3">
                <input
                  type="text"
                  className="form-control custom-form-control"
                  id="number" 
                  placeholder="numero" 
                  value={number} 
                  onChange={e => setNumber(e.target.value)} />
              </div>
              <div className="col-6 mb-3">
                <input
                  type="text"
                  className="form-control custom-form-control"
                  id="city" 
                  placeholder="Cidade" 
                  value={city} 
                  onChange={e => setCity(e.target.value)} />
              </div>
              <div className="col-6 mb-3">
                <input
                  type="text"
                  className="form-control custom-form-control"
                  id="state"
                  placeholder="Estado" 
                  value={state} 
                  onChange={e => setState(e.target.value)} />
              </div>
              <div className="col-12 mb-3">
                <input
                  type="text"
                  className="form-control custom-form-control"
                  id="receiver"
                  placeholder="Quem receberá?" 
                  value={receiver} 
                  onChange={e => setReceiver(e.target.value)} />
              </div>
              <div className="col-12">
                <ButtonPrimary
                  id="submit-update"
                  className="float-right"
                  type="submit">
                  {message}
                </ButtonPrimary>
              </div>
            </div>
          </form>
        </div>
        <div className="col-12 col-lg-6 my-4 my-lg-0">
          <h5>Meus endereços</h5>
          {addresses.map(address => (
            <div className="d-flex border-light my-2 justify-content-between" key={address.id}>
              <AddressWrapper address={address} />
              <div className="actions">
                <button 
                  className="action" 
                  aria-label="Edit"
                  data-address={address.id} 
                  type="button" 
                  onClick={handleEditRequest}>
                  &#9998;
                </button>
                <button 
                  className="action" 
                  aria-label="Destroy"
                  data-address={address.id} 
                  type="button" 
                  onClick={handleDelete}>
                  &times;
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
      
    </WrapperContent>
  )
}