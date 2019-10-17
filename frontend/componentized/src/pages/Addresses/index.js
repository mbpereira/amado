import React, { useEffect, useState } from 'react'

import WrapperContent from '../../components/WrapperContent'
import AddressWrapper from '../../components/AddressWrapper'

import api from '../../api'
import Session from '../../resources/session'

import './styles.css'

export default function Addresses(props) {

  const [addresses, setAddresses] = useState([])


  useEffect(() => {
    api.get('/addresses', {
      headers: { 'x-access-token': Session.token }
    })
    .then(({ data }) => setAddresses(data))
  }, [])

  function handleDelete(id) {
    // requisicao delete para /addresses/:id
  }

  return (
    <WrapperContent className="addresses" title="Meus endereços">
      {addresses.map(address => (
        <div className="d-flex" key={address.id}>
          <AddressWrapper address={address} />
          <button 
            className="close" 
            aria-label="Close"
            data-address={address.id} 
            type="button" 
            onClick={handleDelete}>
              &times;
            </button>
        </div>
      ))}
    </WrapperContent>
  )
}