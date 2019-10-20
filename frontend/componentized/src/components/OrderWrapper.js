import React from 'react'
import moment from 'moment'

export default function OrderWrapper({ order, onRateRequest }) {

  function getTotal() {
    let total = 0
    for (let item of order.items) {
      total += Number(item.price) * Number(item.quantity)
    }
    return total
  }

  function handleDetail(e) {
    const sibling = e.target.nextSibling

    if (sibling.classList.contains('d-none'))
      sibling.classList.remove('d-none')
    else
      sibling.classList.add('d-none')
  }
  return (
    <div className="card w-100 my-2">
      <div className="card-body">
        <div className="card-title">
          <span className="d-block">Pedido: {order.id}</span>
          <span className="badge badge-success font-weight-light">finalizado</span>
          <span className="float-right">R$ {getTotal()}</span>
        </div>
        <div className="card-subtitle mb-2 text-muted">
          <span>{moment(order.created_at).format('DD/MM/YYYY HH:mm:ss')}</span>
        </div>
        <button type="button" data-order={order.id} className="card-action" onClick={onRateRequest}>Avaliar</button>
        <button type="button" className="card-action" onClick={handleDetail}>Detalhes</button>
        <div className="detail d-none pt-4 row border-top">
          {order.items.map(item => (
            <div key={item.id} className="d-flex w-100">
              <div className="col-8 info">
                <strong className="d-block">{`${item.product_name} ${item.color_name} - ${item.option}`}</strong>
                <span>R$ {item.price} x {item.quantity}</span>
              </div>
              <div className="col-4 info">
                <span className="float-right">R$ {(Number(item.price) * Number(item.quantity))}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}