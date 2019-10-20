import React, { useState, useEffect } from 'react'

import WrapperContent from '../../components/WrapperContent'
import OrderWrapper from '../../components/OrderWrapper'

import api from '../../api'
import Session from '../../resources/session'
import Modal from '../../components/Modal'

import './styles.css'

export default function Orders(props) {

  const [orders, setOrders] = useState([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [orderToRate, setOrderToRate] = useState({})
  const [comment, setComment] = useState('')


  useEffect(() => {
    api.get('/orders', {
      headers: { 'x-access-token': Session.token }
    })
    .then(({data}) => setOrders(data))
  }, [])

  function handleRateRequest(e) {
    const order_id = Number(e.target.getAttribute('data-order'))
    setOrderToRate(orders.find(order => order.id === order_id))
    setModalIsOpen(true)
  }
  function handleRateCommit(e) {
    setOrderToRate({})
    setModalIsOpen(false)
  }

  return (
    <WrapperContent className="orders order-wrapper" title="Meus pedidos">
      <Modal onClose={() => setModalIsOpen(false)} onSave={handleRateCommit} isOpen={modalIsOpen} title="Conte-nos o que achou do seu pedido">
        <h6>Pedido: {orderToRate.id}</h6>
        <form>
          <textarea
            className="form-control custom-form-control h-auto"
            id="avaliação"
            placeholder="Escreva aqui sua avaliação"
            value={comment}
            onChange={e => setComment(e.target.value)}>
          </textarea>
        </form>

      </Modal>
      <div className="row">
        <div className="col-12">
          {orders.map(order => (
            <OrderWrapper onRateRequest={handleRateRequest} key={order.id} order={order} />
          ))}
        </div>
      </div>
    </WrapperContent>
  )
}