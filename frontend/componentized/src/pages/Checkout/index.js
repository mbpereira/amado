import React, { useState, useEffect } from 'react'

import Modal from '../../components/Modal'
import AddressWrapper from '../../components/AddressWrapper'
import WrapperContent from '../../components/WrapperContent'

import api from '../../api'
import Session from '../../resources/session'
import getCart from '../../resources/cart'

import './styles.css'
import ButtonPrimary from '../../components/ButtonPrimary'

function AddressesList(props) {
  const addresses = props.addresses
  return (
    <ul>
      {addresses.map(address => (
        <li key={address.id}>
          <button className="custom-outline-primary w-100" onClick={() => props.onSwapChoose(address.id)}>
            <AddressWrapper address={address} />
          </button>
        </li>
      ))}
    </ul>
  )
}
export default function Checkout({ history }) {

  const [modalOpen, setModalOpen] = useState(false)

  const [addresses, setAddresses] = useState([])
  const [address, setAddress] = useState({})

  const [tempAddress, setTempAddress] = useState(-1)

  const cart = getCart()

  useEffect(() => {
    // carrega os enderecos disponíveis desse cliente
    // seleciona o endereco padrao para entrega
    loadAddresses()
  }, [])

  useEffect(() => {
    // para garantir que o registro foi realmente atualizado,
    // depois que os endereços são recarregados, nós definimos 
    // o endereço selecionado com base no id daquele que foi atualizado
    if (!address.id) {
      setAddress(addresses[0] || {})
      return
    }

    setAddress(addresses.find(addr => addr.id === address.id))

  }, [addresses])


  function loadAddresses() {
    return api.get('/addresses', {
      headers: { 'x-access-token': Session.token }
    })
      .then(res => setAddresses(res.data))
  }

  // habilita o endereco atualmente selecionado para edição
  function handleEditRequest() {
    const inputs = document.querySelectorAll('#address-form input')
    const submitUpdate = document.querySelector('#submit-update')

    inputs.forEach(input => input.removeAttribute('disabled'))
    submitUpdate.classList.remove('d-none')
  }

  // atualiza o registro atualmente selecionado
  function handleAddressUpdate(e) {
    e.preventDefault()

    const token = Session.token

    api.patch(`/addresses/${address.id}`, address, {
      headers: { 'x-access-token': token }
    })
      .then(res => setAddress(res.data))
      .then(loadAddresses)
      .catch(err => console.log("Ocorreu um erro", err))

    const inputs = document.querySelectorAll('#address-form input')
    const submitUpdate = document.querySelector('#submit-update')

    inputs.forEach(input => input.setAttribute('disabled', 'disabled'))
    submitUpdate.classList.add('d-none')
  }


  // abre o modal para selecionar
  function handleSwapRequest() {
    setModalOpen(!modalOpen)
  }

  // cancela a troca de endereco
  function handleSwapCancel() {
    setTempAddress(-1)
    setModalOpen(!modalOpen)
  }

  // faz uma seleção temporária de endereço
  function handleSwapChoose(addressId) {
    setTempAddress(addressId)
  }

  // faz a troca definitiva do endereço atual
  function handleSwapCommit() {
    if (tempAddress === -1)
      return

    const chosenAddress = addresses.find(address => Number(address.id) === Number(tempAddress))

    if (!chosenAddress)
      return

    setAddress(chosenAddress)
    setTempAddress(-1)
    setModalOpen(false)

  }

  function handleOrderSave(e) {
    e.preventDefault()

    const delivery_addr = address.id
    const items = cart.all().map(item => ({
      id_stock: item.id_stock,
      quantity: item.quantity
    }))

    api.post('/orders', {
      delivery_addr,
      items
    }, {
      headers: { 'x-access-token': Session.token }
    })
      .then(res => {
        cart.clear()
        history.push('/profile')
      })
      .catch(err => console.log(err))
  }

  return (
    <WrapperContent title="Finalizar compra" className="cart-table-area">
      <div className="row">
        <div className="col-12 col-lg-8">
          <div className="checkout_details_area clearfix">

            <Modal
              title="Selecione um endereço para receber a compra"
              isOpen={modalOpen}
              onClose={handleSwapCancel}
              onSave={handleSwapCommit}>
              <AddressesList
                onSwapChoose={handleSwapChoose}
                addresses={addresses} />
            </Modal>

            <div className="border-light cart-address-section">
              <div className="cart-subtitle">
                <h6>Endereço de entrega</h6>
              </div>

              <div className="actions">
                <button className="badge badge-warning" onClick={handleEditRequest} type="button">Editar</button>
                <button className="mx-1 badge badge-primary" onClick={handleSwapRequest} type="button">Escolher outro</button>
              </div>

              <form id="address-form" onSubmit={handleAddressUpdate}>
                <input type="hidden" defaultValue={address.id} />
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input disabled
                      type="text"
                      className="form-control custom-form-control"
                      id="zip" placeholder="Cep"
                      value={address ? address.zip : ''}
                      onChange={e => setAddress({ ...address, zip: e.target.value })} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input disabled
                      type="text"
                      className="form-control custom-form-control"
                      id="zip" placeholder="Cep"
                      value={address ? address.block : ''}
                      onChange={e => setAddress({ ...address, block: e.target.value })} />
                  </div>
                  <div className="col-8 mb-3">
                    <input disabled
                      type="text"
                      className="form-control custom-form-control"
                      id="street"
                      placeholder="Rua"
                      value={address ? address.street : ''}
                      onChange={e => setAddress({ ...address, street: e.target.value })} />
                  </div>
                  <div className="col-4 mb-3">
                    <input disabled
                      type="text"
                      className="form-control custom-form-control"
                      id="number" placeholder="numero"
                      value={address ? address.number : ''}
                      onChange={e => setAddress({ ...address, number: e.target.value })} />
                  </div>
                  <div className="col-6 mb-3">
                    <input disabled
                      type="text"
                      className="form-control custom-form-control"
                      id="city" placeholder="Cidade"
                      value={address ? address.city : 'CBA'}
                      onChange={e => setAddress({ ...address, city: e.target.value })} />
                  </div>
                  <div className="col-6 mb-3">
                    <input disabled
                      type="text"
                      className="form-control custom-form-control"
                      id="state" placeholder="Estado"
                      value={address ? address.state : 'MT'}
                      onChange={e => setAddress({ ...address, state: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <ButtonPrimary
                      id="submit-update"
                      className="d-none float-right"
                      type="submit">
                      Atualizar
                    </ButtonPrimary>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="cart-summary my-0 border-light">
            <h5>Cart Total</h5>
            <ul className="summary-table">
              <li><span>subtotal:</span> <span>${cart.total()}</span></li>
              <li><span>delivery:</span> <span>Free</span></li>
              <li><span>total:</span> <span>${cart.total() + 0}</span></li>
            </ul>

            <div className="payment-method">
              <div className="custom-control custom-checkbox mr-sm-2">
                <input type="checkbox" className="custom-control-input" id="cod" checked />
                <label className="custom-control-label" htmlFor="cod">Cash on Delivery</label>
              </div>
            </div>

            <div className="cart-btn mt-100">
              <form onSubmit={handleOrderSave}>
                <ButtonPrimary className="w-100">
                  Finalizar pedido
                </ButtonPrimary>
              </form>
            </div>
          </div>
        </div>

      </div>
    </WrapperContent>
  )
}