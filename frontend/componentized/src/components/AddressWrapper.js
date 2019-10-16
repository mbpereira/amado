import React from 'react'

export default function AddressWrapper(props) {
    return (
        <div className="address-wrapper">
            <h6>{props.address.street}, {props.address.number}</h6>
            <span>CEP: {props.address.zip} - {props.address.city}, {props.address.uf}</span>
            <span className="receiver">{props.address.receiver}</span>
        </div>
    )
}