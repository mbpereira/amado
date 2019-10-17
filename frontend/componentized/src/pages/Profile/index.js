import React, { useState, useEffect } from 'react'

import WrapperContent from '../../components/WrapperContent'
import OrderWrapper from '../../components/OrderWrapper'

import Session from '../../resources/session'
import api from '../../api'

import './styles.css'

export default function Profile() {

  const [user, setUser] = useState({})
  const [orders, setOrders] = useState([])

  useEffect(() => {
    api.get('/orders?limit=1', {
      headers: { 'x-access-token': Session.token }
    })
    .then(({data}) => setOrders(data))
  }, [])

  useEffect(() => {
    const user = Session.info
    setUser(user)
  }, [])

  return (
    <WrapperContent className="profile" title="Perfil">
      <div className="row order-wrapper">
        <div className="col-12 col-md-6">
          <h6>Ultimo pedido</h6>
          <div>
            {orders.map(order => (
              <OrderWrapper key={order.id} order={order} />
            ))}
           </div>
        </div>
        
        <div className="col pt-4 pt-md-0">
          <h6>Informações</h6>
          <ul className="links">
              <li className="nav-item">
                <a href="" className="nav-link">Meus dados</a></li>
              <li className="nav-item">
                <a href="" className="nav-link">Meus endereços</a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link">Meus pedidos</a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link">Minhas avaliações</a>
              </li>
              <li className="nav-item">
                <a href="" className="nav-link">Lista de desejos</a>
              </li>
          </ul>
        </div>
      </div>
    </WrapperContent>
  )
}